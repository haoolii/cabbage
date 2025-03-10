import { UrlProcess } from "@/components/url/urlProcess";
import { getTranslations } from "next-intl/server";

export default async function Url() {
  const t = await getTranslations("UrlPage");

  return (
    <div className="max-w-5xl mx-auto py-4 sm:py-10 px-4">
      <div className="py-4 sm:py-10 flex flex-col items-center">
        <h2 className="font-semibold text-2xl sm:text-3xl py-4 text-center">
          {t("title")}
        </h2>
      </div>
      <UrlProcess />
    </div>
  );
}
