"use client";

import { useTranslations } from "next-intl";
import { useForm, useStore } from "@tanstack/react-form";
import { postRecordImage } from "@/request/requests";
import { v4 as uuid } from "uuid";

import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { ImageShow } from "./imageShow";
import { useExpireTimes } from "@/hooks/useExpireTimes";
import { Captcha } from "../captcha";

const allowedFileTypes = [".jpg", ".jpeg", ".png", ".gif"];

type FileWrapper = {
  file: File;
  id: string;
};

type Props = {
  onSuccess?: (files: File[], uniqueId: string) => void;
};

export const ImageForm: React.FC<Props> = ({ onSuccess = () => {} }) => {
  const t = useTranslations("ImagePage");

  const form = useForm<{
    files: FileWrapper[];
    passwordRequired: boolean;
    password: string;
    prompt: string;
    expireIn: string;
    captchToken: string;
  }>({
    defaultValues: {
      files: [],
      passwordRequired: false,
      password: "",
      prompt: "",
      expireIn: `${60 * 60 * 24}`,
      captchToken: "",
    },
    onSubmit: async ({ value }) => {
      const postRecordJson = await postRecordImage({
        prompt: value.prompt,
        passwordRequired: value.passwordRequired,
        password: value.passwordRequired ? value.password : "",
        expireIn: +value.expireIn,
        files: value.files.map((f) => f.file),
        captchaToken: value.captchToken
      });

      onSuccess(
        value.files.map((f) => f.file),
        postRecordJson.data.uniqueId
      );
    },
    validators: {
      onSubmit: (v) => {
        return {
          fields: {
            password:
              v.value.passwordRequired && !v.value.password.length
                ? "form.password.errors.required"
                : undefined,
            files: !v.value.files.length
              ? "form.files.errors.required"
              : undefined,
            captchToken: !v.value.captchToken
              ? "form.captchaToken.errors.required"
              : undefined,
          },
        };
      },
    },
  });

  const passwordRequired = useStore(
    form.store,
    (state) => state.values.passwordRequired
  );

  const files = useStore(form.store, (state) => state.values.files);

  const onRemove = (id: string) => {
    form.setFieldValue(
      "files",
      files.filter((f) => f.id !== id)
    );
  };

  const expireTimes = useExpireTimes();

  return (
    <div className="w-full">
      <form
        className="flex flex-col items-center"
        onSubmit={async (e) => {
          e.preventDefault();
          e.stopPropagation();
          await form.validateAllFields("submit");
          form.handleSubmit();
        }}
      >
        <div
          className={`grid ${
            files.length > 1 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
          } gap-4 pb-8`}
        >
          {files.map((file) => (
            <div key={file.id}>
              <ImageShow
                file={file.file}
                onRemove={() => {
                  onRemove(file.id);
                }}
              />
            </div>
          ))}
        </div>
        <div className="w-full max-w-xl flex flex-col gap-6 items-center">
          <div className="flex flex-col gap-4 w-full">
            <form.Field
              name="files"
              children={(field) => (
                <label key={"files"} className="mb-4 h-28 bg-foreground/20 w-full rounded-xl flex flex-col justify-center items-center border-2 border-dashed border-foreground/50 cursor-pointer hover:opacity-80 transition">
                  <span className="font-medium text-base text-primary-foreground/60">
                    {t("form.files.placeholder")}
                  </span>
                  <input
                    onChange={(e) => {
                      if (e.target.files) {
                        const files = [...e.target.files];
                        field.handleChange([
                          ...field.state.value,
                          ...files.map((f) => ({
                            file: f,
                            id: uuid(),
                          })),
                        ]);
                        e.target.value = "";
                      }
                    }}
                    type="file"
                    hidden
                    accept={allowedFileTypes.join(",")}
                    multiple
                  />
                  {field.state.meta.errors.length
                    ? field.state.meta.errors.map((error) => (
                        <em
                          key={error?.toString()}
                          role="alert"
                          className="font-semibold text-sm text-red-500"
                        >
                          * {t(error)}
                        </em>
                      ))
                    : null}
                </label>
              )}
            />
            <form.Field
              name="passwordRequired"
              children={(field) => (
                <div key={"passwordRequired"} className="flex justify-start w-full">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <Checkbox
                      checked={field.state.value}
                      onCheckedChange={(e) => {
                        if (typeof e === "boolean") {
                          field.handleChange(e);
                        }
                      }}
                    />
                    <span className="-mb-0.5 font-medium text-sm">
                      {t("form.passwordRequired.label")}
                    </span>
                  </label>
                </div>
              )}
            />
            {passwordRequired && (
              <form.Field
                name="password"
                children={(field) => (
                  <label key={"password"} className="flex flex-col w-full gap-2">
                    <div className="flex gap-2 items-center">
                      <span className="font-medium text-sm text-primary-foreground/60">
                        {t("form.password.label")}
                      </span>
                      {field.state.meta.errors.length
                        ? field.state.meta.errors.map((error) => (
                            <em
                              key={error?.toString()}
                              role="alert"
                              className="font-semibold text-sm text-red-500"
                            >
                              * {t(error)}
                            </em>
                          ))
                        : null}
                    </div>
                    <Input
                      placeholder={t("form.password.placeholder")}
                      className="bg-primary-foreground text-black rounded-2xl"
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </label>
                )}
              />
            )}
            <form.Field
              name="expireIn"
              children={(field) => (
                <label key={"expireIn"} className="flex flex-col w-full gap-2">
                  <span className="font-medium text-sm text-primary-foreground/60">
                    {t("form.expireIn.label")}
                  </span>
                  <Select
                    name={field.name}
                    value={
                      field.state.value ? `${field.state.value}` : undefined
                    }
                    onValueChange={(v) => {
                      field.handleChange(v);
                    }}
                  >
                    <SelectTrigger className="bg-primary-foreground rounded-2xl text-black">
                      <SelectValue
                        className="text-black/40"
                        placeholder={t("form.expireIn.placeholder")}
                      />
                    </SelectTrigger>
                    <SelectContent className="bg-primary-foreground text-black rounded-2xl">
                      {expireTimes.map((expire) => (
                        <SelectItem
                          key={expire.value}
                          className="rounded-xl"
                          value={`${expire.value}`}
                        >
                          {expire.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </label>
              )}
            />
            <form.Field
              name="prompt"
              children={(field) => (
                <label key={"prompt"} className="flex flex-col w-full gap-2">
                  <span className="font-medium text-sm text-primary-foreground/60">
                    {t("form.prompt.label")}
                  </span>
                  <Input
                    className="bg-primary-foreground text-black rounded-2xl"
                    placeholder={t("form.prompt.placeholder")}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </label>
              )}
            />
            <form.Field
              name="captchToken"
              children={(field) => (
                <div key={"captchToken"} className="flex flex-col items-center gap-2">
                  <Captcha onVerify={(token) => field.handleChange(token)} />
                  {field.state.meta.errors.length
                    ? field.state.meta.errors.map((error) => (
                        <em
                          key={error?.toString()}
                          role="alert"
                          className="font-semibold text-sm text-red-500"
                        >
                          * {t(error)}
                        </em>
                      ))
                    : null}
                </div>
              )}
            />
          </div>
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <Button
                key={"submit"}
                type="submit"
                disabled={isSubmitting}
                className="w-44 rounded-2xl"
              >
                {isSubmitting ? t("form.submitting") : t("form.submit")}
              </Button>
            )}
          />
        </div>
      </form>
    </div>
  );
};
