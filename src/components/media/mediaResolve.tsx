import { Record } from "@/request/types";
import { useTranslations } from "next-intl";
import { MediaAuthPreview } from "../mediaAuthPreview";

type Props = {
  record: Record;
  token: string;
  count: number;
};

export const MediaResolve: React.FC<Props> = ({ record, token, count }) => {
  const t = useTranslations("resolvePage");

  return (
    <div className="w-full flex justify-center py-10">
    <div className="w-full max-w-4xl flex flex-col gap-6 px-4 items-center">
      <span className="font-medium text-sm text-primary-foreground/60">
        {t("promptText")}: {record.prompt || t("none")}
      </span>
      <div>
        count: {count}
      </div>
      <div>
        {(record?.assets || []).map((asset) => {
          return (
            <MediaAuthPreview
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
