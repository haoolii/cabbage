import { getTranslations } from "next-intl/server";
import { Button } from "../ui/button";
import Link from "next/link";

export const ExpiredNotFound = async () => {
  const t = await getTranslations("Global");
  return (
    <div className="w-full flex justify-center py-10">
      <div className="w-full max-w-xl flex flex-col px-4 items-center gap-8">
        <img alt="not-found" className="opacity-30 w-72" src="/not-found.svg" />
        <h2 className="font-semibold text-2xl">{t("expiredOrNotFound")}</h2>
        <Link href={"/"}>
          <Button>{t("backToHome")}</Button>
        </Link>
      </div>
    </div>
  );
};
