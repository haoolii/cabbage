"use client";
import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";

// types
import { FileWrapper } from "@/types";

import { zodResolver } from "@hookform/resolvers/zod";

// components
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { UploadButton } from "../uploadButton";
import { Switch } from "../ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";

// hooks
import { useErrorCodeToast } from "@/hooks/useErrorToast";
import { useExpireTimes } from "@/hooks/useExpireTimes";
import { useCaptcha } from "@/hooks/useCaptcha";
import { useToast } from "@/hooks/use-toast";

// requests
import { postRecordMedia, postRecordMediaV2 } from "@/request/requests";

// utils
import { isSuccess } from "@/request/util";
import { MediaControl } from "../mediaControl";
import dayjs from "dayjs";
import {
  MAX_MEDIA_FILE_UPLOAD_BYTES_SIZE,
  MAX_MEDIA_FILE_UPLOAD_LENGTH,
} from "@/lib/constants";
import { sumFileBytesSize } from "@/lib/utils";
import { Code } from "@/request/code";

type Props = {
  onSuccess?: (files: FileWrapper[], uniqueId: string) => void;
};

const allowedFileTypes = [".mp3", ".mp4"];

export const MediaForm: React.FC<Props> = ({ onSuccess = () => {} }) => {
  const t = useTranslations("MediaPage");
  const expireTimes = useExpireTimes();
  const { errorCodeToast } = useErrorCodeToast();
  const { toast } = useToast();
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [serverPercentage, setServerPercentage] = useState(0);
  const { reset, Captcha } = useCaptcha();

  const formSchema = z
    .object({
      files: z
        .array(z.custom<FileWrapper>())
        .refine((files) => files.length > 0, {
          message: t("form.files.errors.required"),
        })
        .refine((files) => files.length <= MAX_MEDIA_FILE_UPLOAD_LENGTH, {
          message: t("form.files.errors.maxLength", {
            length: MAX_MEDIA_FILE_UPLOAD_LENGTH,
          }),
        })
        .refine(
          (files) =>
            sumFileBytesSize(files.map((file) => file.file)) <=
            MAX_MEDIA_FILE_UPLOAD_BYTES_SIZE,
          {
            message: t("form.files.errors.maxSize", {
              size: MAX_MEDIA_FILE_UPLOAD_BYTES_SIZE / 1024 / 1024,
            }),
          }
        ),
      passwordRequired: z.boolean(),
      password: z.string().optional(),
      prompt: z.string(),
      expireIn: z.string(),
      captchToken: z.string().nonempty(t("form.captchaToken.errors.required")),
    })
    .refine(
      (data) => {
        if (data.passwordRequired && !data.password) {
          return false;
        }
        return true;
      },
      {
        message: t("form.password.errors.required"),
        path: ["password"],
      }
    );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      files: [],
      passwordRequired: false,
      password: "",
      prompt: "",
      expireIn: `${60 * 60 * 24}`,
      captchToken: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setUploadPercentage(0);
      setServerPercentage(0);
      await postRecordMediaV2(
        {
          prompt: values.prompt,
          passwordRequired: values.passwordRequired,
          password: values.passwordRequired ? values.password : "",
          expireIn: +values.expireIn,
          files: values.files.map((f) => f.file),
          captchaToken: values.captchToken,
        },
        (data) => {
          if (!data.isEnd) {
            // keep
            setServerPercentage(data.payload.percentage);
          } else {
            // isEnd
            if (isSuccess(data.payload)) {
              onSuccess(values.files, data.payload.data.uniqueId);
            } else {
              errorCodeToast(data.payload.code);
              reset();
            }
          }
        },
        (percentage) => {
          setUploadPercentage(percentage);
        }
      );
    } catch {
      setUploadPercentage(0);
      setServerPercentage(0);
      errorCodeToast(Code.ERROR);
      reset();
    }
  }

  const files = form.watch("files");

  const passwordRequired = form.getValues("passwordRequired");

  const progressPercentage = useMemo(() => {
    return (uploadPercentage + serverPercentage) / 2;
  }, [uploadPercentage, serverPercentage])

  useEffect(() => {
    if (!passwordRequired) {
      form.setValue("password", "");
    }
  }, [passwordRequired, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12  space-y-8">
            <FormField
              control={form.control}
              name="files"
              render={({ field }) => (
                <>
                  {field.value.length < MAX_MEDIA_FILE_UPLOAD_LENGTH && (
                    <FormItem>
                      <FormControl>
                        <UploadButton
                          accept={allowedFileTypes.join(",")}
                          onChange={(files) => {
                            const currLen = field.value.length;

                            const totalSize = sumFileBytesSize(
                              files.map((file) => file.file)
                            );

                            if (totalSize > MAX_MEDIA_FILE_UPLOAD_BYTES_SIZE) {
                              toast({
                                variant: "destructive",
                                title: "錯誤提示",
                                description: t("form.files.errors.maxSize", {
                                  size:
                                    MAX_MEDIA_FILE_UPLOAD_BYTES_SIZE /
                                    1024 /
                                    1024,
                                }),
                              });
                              return;
                            }
                            if (
                              currLen + files.length >
                              MAX_MEDIA_FILE_UPLOAD_LENGTH
                            ) {
                              toast({
                                variant: "destructive",
                                title: "錯誤提示",
                                description: t("form.files.errors.maxLength", {
                                  length: MAX_MEDIA_FILE_UPLOAD_LENGTH,
                                }),
                              });
                              return;
                            }

                            field.onChange([...field.value, ...files]);
                          }}
                        >
                          {t("form.files.placeholder")}
                        </UploadButton>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                  <div
                    className={`grid ${
                      files.length > 1
                        ? "grid-cols-1 sm:grid-cols-1"
                        : "grid-cols-1"
                    } gap-8`}
                  >
                    {files.map((file) => (
                      <div
                        key={file.id}
                        className="flex justify-center items-center"
                      >
                        <MediaControl
                          file={file}
                          onDelete={async (id) => {
                            form.setValue(
                              "files",
                              files.filter((f) => f.id !== id)
                            );
                            await form.trigger("files");
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </>
              )}
            />
          </div>
          <div className="col-span-12">
            <div className="space-y-4 sticky top-0 z-10">
              <FormField
                control={form.control}
                name="passwordRequired"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>{t("form.passwordRequired.label")}</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {passwordRequired && (
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>{t("form.password.label")}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t("form.password.placeholder")}
                          className="bg-primary-foreground text-black"
                          maxLength={100}
                          name={field.name}
                          value={field.value}
                          onBlur={field.onBlur}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormDescription>
                        <Button
                          size="sm"
                          type="button"
                          onClick={() => {
                            field.onChange(dayjs().format("MMDD"));
                          }}
                        >
                          {t("form.todayDate")}
                        </Button>
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="expireIn"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>{t("form.expireIn.label")}</FormLabel>
                    <FormControl>
                      <Select
                        name={field.name}
                        value={field.value ? `${field.value}` : undefined}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="bg-primary-foreground text-black">
                          <SelectValue
                            className="text-black/40"
                            placeholder={t("form.expireIn.placeholder")}
                          />
                        </SelectTrigger>
                        <SelectContent className="bg-primary-foreground text-black">
                          {expireTimes.map((expire) => (
                            <SelectItem
                              key={expire.value}
                              value={`${expire.value}`}
                            >
                              {expire.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="prompt"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>{t("form.prompt.label")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("form.prompt.placeholder")}
                        className="bg-primary-foreground text-black"
                        name={field.name}
                        value={field.value}
                        maxLength={100}
                        onBlur={field.onBlur}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="captchToken"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Captcha onVerify={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                disabled={form.formState.isSubmitting}
                key={"submit"}
                type="submit"
                className="w-full relative overflow-hidden"
              >
                <div
                  className={`bg-white bg-opacity-50 absolute left-0 top-0 h-full transition-all duration-300`}
                  style={{ width: `${progressPercentage * 100}%` }}
                ></div>
                <span>
                  {form.formState.isSubmitting
                    ? `${t("form.submitting")} ${(
                        progressPercentage * 100
                      ).toFixed(2)}%`
                    : t("form.submit")}
                  {}
                </span>
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};
