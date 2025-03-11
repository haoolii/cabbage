import { Record } from "@/request/types";
import { ImageAuthPreview } from "../imageAuthPreview";
import { getTranslations } from "next-intl/server";
import { Button } from "../ui/button";
import Link from "next/link";

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
        <div className="w-full space-y-4">
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
          <span>{t("countLabel")}</span>
          <span className="font-bold">{count}</span>
        </div>

        <div>
          <Link target="_blank" href={"https://docs.google.com/forms/d/e/1FAIpQLSdnZvBuCDzDPo8CfhonKDzK3L-SsukeWIJdZMzv9Kqq7kelug/viewform?usp=dialog"}>
            <Button variant="destructive">{t('report')}</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
