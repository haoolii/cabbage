import { Record } from "@/request/types";
import { ImagePreivew } from "../ImagePreview";
import { getRecordCount } from "@/request/requests";
import { getTranslations } from "next-intl/server";

type Props = {
  record: Record;
  token: string;
  count: number;
};

export const ImageResolve: React.FC<Props> = async ({ record, token, count }) => {
  const t = await getTranslations("resolvePage")


  return (
    <div className="w-full flex justify-center py-10">
      <div className="w-full max-w-xl flex flex-col gap-6 px-4 items-center">
        <span className="font-medium text-sm text-primary-foreground/60">
          {t("promptText")}: {record.prompt || t("none")}
        </span>
        <div>
          count: {count}
        </div>
        <div>
          {(record?.assets || []).map((asset) => {
            return (
              <ImagePreivew
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
