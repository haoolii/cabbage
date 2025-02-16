import Link from "next/link";
import { Button } from "../ui/button";
import env from "@/core/env";
import { useTranslations } from "next-intl";

type Props = {
  uniqueId: string;
  onReset: () => void;
};
export const UrlSuccess: React.FC<Props> = ({ uniqueId, onReset }) => {
  const uniqueIdUrl = `${env.CLIENT_API_BASE}/${uniqueId}`;
  const t = useTranslations("UrlPage");
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="py-4">
        <h2 className="font-bold text-3xl">{t("successPrompt")}</h2>
      </div>

      <div>
        <Link target="_blank" href={uniqueIdUrl}>
          {uniqueIdUrl}
        </Link>
      </div>
      <Button onClick={() => onReset()} className="w-44 rounded-2xl">
        {t("continueShortening")}
      </Button>
    </div>
  );
};
