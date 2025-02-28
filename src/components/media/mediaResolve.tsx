import { Record } from "@/request/types";
import { MediaPreivew } from "../mediaPreview";
import { useTranslations } from "next-intl";

type Props = {
  record: Record;
  token: string;
};

export const MediaResolve: React.FC<Props> = ({ record, token }) => {
  const t = useTranslations("resolvePage");

  return (
    <div className="w-full flex justify-center py-10">
      <div className="w-full max-w-xl flex flex-col gap-6 px-4 items-center">
        <span className="font-medium text-sm text-primary-foreground/60">
          {t("promptText")}: {record.prompt || t("none")}
        </span>
        <div>
          {(record?.assets || []).map((asset) => {
            return (
              <MediaPreivew
                key={asset.key}
                assetKey={asset.key}
                token={token}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
