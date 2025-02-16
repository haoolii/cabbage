import { MediaProcess } from "@/components/media/mediaProcess";
import { useTranslations } from "next-intl";

export default function Media() {
  const t = useTranslations("MediaPage");

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex flex-col items-center gap-6 py-20 px-4">
        <h2 className="font-semibold text-3xl py-4 text-center">
          {t('title')}
        </h2>
        <h3 className="font-semibold text-2xl">{t('subtitle')}</h3>
        <MediaProcess />
      </div>
    </div>
  );
}
