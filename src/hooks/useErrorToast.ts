"use client";

import { useTranslations } from "next-intl";
import { useToast } from "./use-toast";

export const useErrorCodeToast = () => {
  const { toast } = useToast();
  const tErrCode = useTranslations("ErrorCode");

  return {
    errorCodeToast: (code: string) => {
      try {
        toast({
          variant: "destructive",
          title: "錯誤提示",
          description: tErrCode(code),
        });
      } catch (err) {
        console.log("err", err);
      }
    },
  };
};
