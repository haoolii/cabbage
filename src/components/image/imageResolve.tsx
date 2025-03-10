import { Record } from "@/request/types";
import { ImageAuthPreview } from "../imageAuthPreview";
import { getTranslations } from "next-intl/server";

type Props = {
  record: Record;
  token: string;
  count: number;
};

export const ImageResolve: React.FC<Props> = async ({
  record,
  token,
  count,
}) => {
  const t = await getTranslations("resolvePage");

  return (
    <div className="w-full flex justify-center py-10">
      <div className="w-full max-w-4xl flex flex-col gap-6 px-4 items-center">
        {record.prompt && (
          <div className="flex flex-col items-center">
            <span className="font-semibold">{t("promptText")}</span>
            <span>{record.prompt || t("none")}</span>
          </div>
        )}
        <div>
          {(record?.assets || []).map((asset) => {
            return (
              <ImageAuthPreview
                key={asset.key}
                assetKey={asset.key}
                token={token}
              />
            );
          })}
        </div>

        <div className="flex flex-col items-center">
          <span>此短網址閱覽次數</span>
          <span className="font-bold">{count}</span>
        </div>
      </div>
    </div>
  );
};
