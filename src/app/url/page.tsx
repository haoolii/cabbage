import { UrlProcess } from "@/components/url/urlProcess";
import { useTranslations } from "next-intl";

export default function Url() {
  const t = useTranslations("UrlPage");

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex flex-col items-center py-40">
        <h2 className="font-semibold text-3xl py-4 text-center">
          {t("title")}
        </h2>
        <UrlProcess />
      </div>
    </div>
  );
}
