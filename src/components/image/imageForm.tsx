"use client";
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { UploadButton } from "../uploadButton";
import { ImageControl } from "../ImageControl";
import { Switch } from "../ui/switch";
import { Captcha } from "../captcha";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";

// hooks
import { useExpireTimes } from "@/hooks/useExpireTimes";

// requests
import { postRecordImage } from "@/request/requests";

// utils
import { isSuccess } from "@/request/util";

type Props = {
  onSuccess?: (files: FileWrapper[], uniqueId: string) => void;
};

const allowedFileTypes = [".jpg", ".jpeg", ".png", ".gif"];

export const ImageForm: React.FC<Props> = ({ onSuccess = () => {} }) => {
  const t = useTranslations("ImagePage");
  const expireTimes = useExpireTimes();

  const formSchema = z
    .object({
      files: z
        .array(z.custom<FileWrapper>())
        .refine((files) => files.length > 0, {
          message: t("form.files.errors.required"),
        }),
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
    const postRecordJson = await postRecordImage({
      prompt: values.prompt,
      passwordRequired: values.passwordRequired,
      password: values.passwordRequired ? values.password : "",
      expireIn: +values.expireIn,
      files: values.files.map((f) => f.file),
      captchaToken: values.captchToken,
    });

    console.log("postRecordJson", postRecordJson);
    if (isSuccess(postRecordJson)) {
      onSuccess(values.files, postRecordJson.data.uniqueId);
    }
  }

  const files = form.watch("files");

  const passwordRequired = form.getValues("passwordRequired");

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
                  <FormItem>
                    <FormControl>
                      <UploadButton
                        accept={allowedFileTypes.join(",")}
                        onChange={(files) => {
                          field.onChange([...field.value, ...files]);
                        }}
                      >
                        上傳圖片或照片
                      </UploadButton>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
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
                        <ImageControl
                          file={file}
                          onDelete={(id) => {
                            form.setValue(
                              "files",
                              files.filter((f) => f.id !== id)
                            );
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
                          name={field.name}
                          value={field.value}
                          onBlur={field.onBlur}
                          onChange={field.onChange}
                        />
                      </FormControl>
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
                className="w-full"
              >
                {form.formState.isSubmitting
                  ? t("form.submitting")
                  : t("form.submit")}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};
