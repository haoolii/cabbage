"use client";

import { useForm } from "@tanstack/react-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { postRecordUrl } from "@/request/requests";
import { useTranslations } from "next-intl";
import { isSuccess } from "@/request/util";
import { useErrorCodeToast } from "@/hooks/useErrorToast";
import { Captcha } from "../captcha";

type Props = {
  onSuccess: (uniqueId: string) => void;
};

export const UrlForm: React.FC<Props> = ({ onSuccess }) => {
  const { errorCodeToast } = useErrorCodeToast();
  const form = useForm<{
    content: string;
    captchToken: string;
  }>({
    defaultValues: {
      content: "",
      captchToken: "",
    },
    onSubmit: async ({ value }) => {
      const json = await postRecordUrl({
        content: value.content,
        captchaToken: value.captchToken,
      });
      if (isSuccess(json)) {
        onSuccess(json.data.uniqueId);
      }
      errorCodeToast(json.code);
    },
    validators: {
      onSubmit: (v) => {
        return {
          fields: {
            content: !v.value.content
              ? "form.content.errors.required"
              : undefined,
            captchToken: !v.value.captchToken
              ? "form.captchaToken.errors.required"
              : undefined,
          },
        };
      },
    },
  });

  const t = useTranslations("UrlPage");

  return (
    <div className="w-full">
      <form
        className="w-full flex flex-col items-center gap-6"
        onSubmit={async (e) => {
          e.preventDefault();
          e.stopPropagation();
          await form.validateAllFields("submit");
          form.handleSubmit();
        }}
      >
        <form.Field
          name="content"
          children={(field) => (
            <div key={"content"} className="flex flex-col w-full items-center space-y-2">
              <div className="h-6 flex justify-start">
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
                placeholder={t("form.content.placeholder")}
                value={field.state.value}
                className="bg-primary-foreground text-black rounded-2xl max-w-xl"
                onChange={(e) => {
                  field.handleChange(e.target.value);
                }}
              />
            </div>
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
      </form>
    </div>
  );
};
