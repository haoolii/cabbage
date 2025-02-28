import { Button } from "../ui/button";
import env from "@/core/env";
import { useTranslations } from "next-intl";
import { CopyUrl } from "../copyUrl";

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

      <div className="py-4">
        <CopyUrl url={uniqueIdUrl} />
      </div>
      <Button onClick={() => onReset()} className="w-44 rounded-2xl">
        {t("continueUploading")}
      </Button>
    </div>
  );
};
