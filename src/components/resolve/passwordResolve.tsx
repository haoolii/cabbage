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
type Props = {
  uniqueId: string;
  record: Record;
};
export const PasswordResolve: React.FC<Props> = ({ uniqueId, record }) => {
  const { errorCodeToast } = useErrorCodeToast();
  const { get, set } = useHistoriesPassword();
  const t = useTranslations("PasswordResolvePage");
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
    const json = await postRecordPassword(uniqueId, {
      password: values.password,
      captchaToken: values.captchToken,
    });
    if (isSuccess(json)) {
      set(values.password);
      document.cookie = `Authorization=${json?.data?.token}; path=/;`;
      window.location.reload();
      return;
    }
    errorCodeToast(json.code);
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
        <h3 className="py-4 text-center">提示內容: {record.prompt}</h3>
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
                  <FormDescription className="flex gap-2 overflow-scroll pt-2">
                    {previousEnterPasswords.map((password) => (
                      <Button
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
            disabled={form.formState.isSubmitting}
            key={"submit"}
            type="submit"
            className="w-full"
          >
            {form.formState.isSubmitting
              ? t("form.submitting")
              : t("form.submit")}
          </Button>
        </form>
      </Form>
    </div>
    // <div className="flex justify-center py-20">
    //   <div className="w-full max-w-xl flex flex-col gap-6 items-center px-4">
    //     <h2 className="font-semibold text-3xl py-4">請輸入密碼解鎖</h2>
    //     <div>
    //       <span className="font-medium text-sm text-primary-foreground/60">
    //         提示內容: {record.prompt || "無"}
    //       </span>
    //     </div>
    //     <Input
    //       placeholder="請輸入密碼"
    //       value={password}
    //       className="bg-primary-foreground text-black rounded-2xl max-w-xl"
    //       onChange={(e) => setPassword(e.target.value)}
    //     />
    //     <Captcha onVerify={(token) => setCaptchaToken(token)} />
    //     <Button className="w-44 rounded-2xl" disabled={!(captchaToken && password)} onClick={() => onSubmit()}>
    //       送出
    //     </Button>
    //   </div>
    // </div>
  );
};
