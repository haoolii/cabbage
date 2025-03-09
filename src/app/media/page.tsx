import { MediaProcess } from "@/components/media/mediaProcess";
import { useTranslations } from "next-intl";

export default function Media() {
  const t = useTranslations("MediaPage");

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
        <div className="py-10 flex flex-col items-center">
            <h2 className="font-semibold text-3xl py-4 text-center">
            {t("title")}
            </h2>
            <h3 className="font-semibold text-2xl">{t("subtitle")}</h3>
        </div>
        <MediaProcess />
    </div>
  );
}
