import Turnstile, { useTurnstile } from "react-turnstile";
import { useMemo, useState } from "react";
import env from "@/core/env";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useTranslations } from "next-intl";

export const useCaptcha = () => {
    const turnstile = useTurnstile();
    const [expired, setExpired] = useState(false);
    const [error, setError] = useState(false);
    const t = useTranslations("Captcha");

    return useMemo(() => ({
        Captcha: ({ onVerify }: { onVerify?: (token: string) => void }) => {
            return (
                <>
                    <Turnstile
                        sitekey={env.NODE_ENV === "development" ? "1x00000000000000000000AA" : env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ""}
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
        },
        reset: () => {
            turnstile?.reset();
        }
    }), [turnstile]);
};