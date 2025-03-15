"use client";

import env from "@/core/env";
import { Turnstile } from "next-turnstile";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { useState } from "react";
import { useTranslations } from "next-intl";

type Props = {
  onError?: () => void;
  onExpire?: () => void;
  onLoad?: () => void;
  onVerify?: (token: string) => void;
};
export const Captcha: React.FC<Props> = ({
  onError,
  onExpire,
  onLoad,
  onVerify,
}) => {
  const t = useTranslations("Captcha");
  const [expired, setExpired] = useState(false);
  const [error, setError] = useState(false);
  return (
    <>
      <Turnstile
        siteKey={env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ""}
        retry="auto"
        execution="render"
        refreshExpired="auto"
        sandbox={env.NODE_ENV === "development"}
        onError={() => {
          setError(true);
          if (onError) {
            onError();
          }
        }}
        onExpire={() => {
          setExpired(true);
          if (onExpire) {
            onExpire();
          }
        }}
        onLoad={onLoad}
        onVerify={onVerify}
      />
      <AlertDialog open={expired}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("prompt")}</AlertDialogTitle>
            <AlertDialogDescription>{t("expired")}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setExpired(false);
              }}
            >
              {t("cancel")}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                document.location.reload();
                setExpired(false);
              }}
            >
              {t("refresh")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog open={error}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("prompt")}</AlertDialogTitle>
            <AlertDialogDescription>{t("error")}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setError(false);
              }}
            >
              {t("cancel")}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                document.location.reload();
                setError(false);
              }}
            >
              {t("refresh")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
