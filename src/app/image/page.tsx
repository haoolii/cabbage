
import { ImageProcess } from "@/components/image/imageProcess";
import { useTranslations } from "next-intl";

export default function Image() {
  const t = useTranslations("ImagePage");
  return (
    <div className="max-w-5xl mx-auto py-4 sm:py-10 px-4">
        <div className="py-4 sm:py-10 flex flex-col items-center">
            <h2 className="font-semibold text-2xl sm:text-3xl py-4 text-center">
            {t("title")}
            </h2>
            <h3 className="font-semibold text-lg sm:text-2xl">{t("subtitle")}</h3>
        </div>
        <ImageProcess />
    </div>
  );
}
