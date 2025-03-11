import { getTranslations } from "next-intl/server";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";

export const ExpiredNotFound = async () => {
  const t = await getTranslations();
  return (
    <div className="w-full flex justify-center py-10">
      <div className="w-full max-w-xl flex flex-col px-4 items-center gap-8">
        <Image alt="not-found" className="opacity-30 w-72" src="/not-found.svg" />
        <h2 className="font-semibold text-2xl">{t("Expired or not found")}</h2>
        <Link href={"/"}>
          <Button>Back to home</Button>
        </Link>
      </div>
    </div>
  );
};
