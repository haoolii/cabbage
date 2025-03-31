"use client";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { postRecordUrl } from "@/request/requests";
import { useTranslations } from "next-intl";
import { isSuccess } from "@/request/util";
import { useErrorCodeToast } from "@/hooks/useErrorToast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { Code } from "@/request/code";
import { useCaptcha } from "@/hooks/useCaptcha";

type Props = {
  onSuccess: (uniqueId: string) => void;
};

export const UrlForm: React.FC<Props> = ({ onSuccess }) => {
  const { errorCodeToast } = useErrorCodeToast();
  const t = useTranslations("UrlPage");
  const { toast } = useToast();
  const { reset, Captcha } = useCaptcha()

  const formSchema = z.object({
    content: z.string().nonempty(t("form.content.errors.required")),
    captchToken: z.string().nonempty(t("form.captchaToken.errors.required")),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
      captchToken: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const postRecordJson = await postRecordUrl({
        content: values.content,
        captchaToken: values.captchToken,
      });

      if (isSuccess(postRecordJson)) {
        onSuccess(postRecordJson.data.uniqueId);
      } else {
        errorCodeToast(postRecordJson.code);
        reset();
      }
    } catch (err) {
      errorCodeToast(Code.ERROR);
      reset();
    }
  }
  

  return (
    <Form {...form}>
    
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => {
            return (
              <FormItem className="flex flex-col">
                {/* <FormLabel>{t("form.content.label")}</FormLabel> */}
                <FormControl>
                  <Input
                    placeholder={t("form.content.placeholder")}
                    className="bg-primary-foreground text-black"
                    name={field.name}
                    value={field.value}
                    onBlur={field.onBlur}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        ></FormField>

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
  );
};
