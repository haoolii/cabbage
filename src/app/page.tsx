import { UrlProcess } from "@/components/url/urlProcess";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("UrlPage");

  return (
    <div>
      <div className="flex flex-col items-center py-40">
        <h2 className="font-semibold text-3xl py-4 text-center">
          {t("title")}
        </h2>
        <UrlProcess />
      </div>
    </div>
  );
}
