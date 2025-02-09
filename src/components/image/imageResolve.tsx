import { Record } from "@/request/types";
import { ImagePreivew } from "../ImagePreview";

type Props = {
  record: Record;
  token: string;
};

export const ImageResolve: React.FC<Props> = ({ record, token }) => {
  return (
    <div className="w-full flex justify-center py-10">
      <div className="w-full max-w-xl flex flex-col gap-6 px-4 items-center">
        <span className="font-medium text-sm text-primary-foreground/60">
          提示內容: {record.prompt || "無"}
        </span>
        <div>
          {(record?.assets || []).map((asset) => {
            return (
              <ImagePreivew
                key={asset.filename}
                filename={asset.filename}
                token={token}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
