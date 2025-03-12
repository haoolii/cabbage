"use client";

import { Input } from "../ui/input";
import { postRecordPassword } from "@/request/requests";
import { useMemo, useState } from "react";
import { Button } from "../ui/button";
import { Record } from "@/request/types";
import { isSuccess } from "@/request/util";
import { useErrorCodeToast } from "@/hooks/useErrorToast";
import { Captcha } from "../captcha";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { useHistoriesPassword } from "@/hooks/useHistoriesPassword";
import dayjs from "dayjs";
type Props = {
  uniqueId: string;
  record: Record;
};
export const PasswordResolve: React.FC<Props> = ({ uniqueId, record }) => {
  const { errorCodeToast } = useErrorCodeToast();
  const { get, set } = useHistoriesPassword();
  const t = useTranslations("PasswordResolvePage");
  const [isRedirecting, setIsRedirecting] = useState(false);
  const formSchema = z.object({
    password: z.string().nonempty(t("form.captchaToken.errors.required")),
    captchToken: z.string().nonempty(t("form.captchaToken.errors.required")),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      captchToken: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const json = await postRecordPassword(uniqueId, {
        password: values.password,
        captchaToken: values.captchToken,
      });
      if (isSuccess(json)) {
        set(values.password);
        document.cookie = `Authorization=${json?.data?.token}; path=/;`;
        window.location.reload();
        setIsRedirecting(true);
        return;
      }
      errorCodeToast(json.code);
    } catch (err) {
      setIsRedirecting(false);
    }
  };

  const previousEnterPasswords = useMemo(() => {
    return get();
  }, []);

  return (
    <div className="max-w-5xl mx-auto py-4 sm:py-10 px-4">
      <h2 className="font-semibold text-2xl sm:text-3xl py-4 text-center">
        {t("title")}
      </h2>
      {record.prompt && (
        <h3 className="py-4 text-center">
          {t("prompt")}: {record.prompt}
        </h3>
      )}
      {record.createdAt && (
        <h3 className="py-4 text-center text-gray-600">
          {t("createdAt")} {dayjs(record.createdAt).format("YYYY-MM-DD HH:mm:ss")}
        </h3>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-col">
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
                  <FormDescription className="flex gap-2 overflow-x-auto pt-2">
                    {previousEnterPasswords.map((password) => (
                      <Button
                        key={password}
                        size="sm"
                        type="button"
                        onClick={() => {
                          form.setValue("password", password);
                        }}
                      >
                        {password}
                      </Button>
                    ))}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              );
            }}
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
            disabled={form.formState.isSubmitting || isRedirecting}
            key={"submit"}
            type="submit"
            className="w-full"
          >
            {form.formState.isSubmitting
              ? t("form.submitting")
              : isRedirecting ? t('redirecting') : t("form.submit")}
          </Button>
        </form>
      </Form>
    </div>
  );
};
