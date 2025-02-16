import { useForm, useStore } from "@tanstack/react-form";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { postAssetUpload, postRecordMedia } from "@/request/requests";
import { v4 as uuid } from "uuid";
import { MediaShow } from "./mediaShow";
import { useTranslations } from "next-intl";
import { useExpireTimes } from "@/hooks/useExpireTimes";

const allowedFileTypes = [".mp3", ".mp4"];

type FileWrapper = {
  file: File;
  id: string;
};

type Props = {
  onSuccess?: (files: File[], uniqueId: string) => void;
};

export const MediaForm: React.FC<Props> = ({ onSuccess = () => {} }) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<{
    files: FileWrapper[];
    passwordRequired: boolean;
    password: string;
    prompt: string;
    expireIn: number;
  }>({
    defaultValues: {
      files: [],
      passwordRequired: false,
      password: "",
      prompt: "",
      expireIn: 60,
    },
    onSubmit: async ({ value }) => {
      try {
        setIsLoading(true);
        console.log("value", value);
        const uploadJson = await postAssetUpload(
          value.files.map((f) => f.file)
        );
        const postRecordJson = await postRecordMedia({
          assetIds: uploadJson.data.assetIds,
          prompt: value.prompt,
          passwordRequired: value.passwordRequired,
          password: value.passwordRequired ? value.password : "",
          expireIn: value.expireIn,
        });
        onSuccess(
          value.files.map((f) => f.file),
          postRecordJson.data.uniqueId
        );
      } catch (err) {
      } finally {
        setIsLoading(false);
      }
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

  const t = useTranslations("MediaPage");

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
              <MediaShow
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
                <label className="mb-4 h-28 bg-foreground/20 w-full rounded-xl flex flex-col justify-center items-center border-2 border-dashed border-foreground/50 cursor-pointer hover:opacity-80 transition">
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
                <div className="flex justify-start w-full">
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
                  <label className="flex flex-col w-full gap-2">
                    <div className="flex gap-2 items-center">
                      <span className="font-medium text-sm text-primary-foreground/60">
                        {t("form.password.label")}
                      </span>
                      {field.state.meta.errors.length
                        ? field.state.meta.errors.map((error) => (
                            <em
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
                <label className="flex flex-col w-full gap-2">
                  <span className="font-medium text-sm text-primary-foreground/60">
                    {t("form.expireIn.label")}
                  </span>
                  <Select
                    name={field.name}
                    value={
                      field.state.value ? `${field.state.value}` : undefined
                    }
                    onValueChange={(v) => {
                      field.handleChange(Number(v));
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
                <label className="flex flex-col w-full gap-2">
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
          </div>
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <Button
                type="submit"
                disabled={!canSubmit}
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
