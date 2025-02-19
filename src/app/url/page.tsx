import { UrlProcess } from "@/components/url/urlProcess";
import { getTranslations } from "next-intl/server";

export default async function Url() {
  const t = await getTranslations("UrlPage");

  return (
    <div className="max-w-3xl mx-auto py-20">
      <div className="flex flex-col items-center pb-40 px-4">
        <h2 className="font-semibold text-3xl py-4 text-center">
          {t("title")}
        </h2>
        <UrlProcess />
      </div>
    </div>
  );
}
