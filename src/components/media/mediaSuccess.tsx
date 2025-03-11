import env from "@/core/env";
import { useTranslations } from "next-intl";
import { Button } from "../ui/button";
import { CopyUrl } from "../copyUrl";
import { MediaPreview } from "../mediaPreview";
import { FileWrapper } from "@/types";
import Link from "next/link";

type Props = {
  files: FileWrapper[];
  uniqueId: string;
  onReset: () => void;
};

export const MediaSuccess: React.FC<Props> = ({ files, uniqueId, onReset }) => {
  const uniqueIdUrl = `${env.CLIENT_API_BASE}/${uniqueId}`;

  const t = useTranslations("MediaPage");

  return (
    <div className="flex flex-col items-center gap-4">
    <div className="py-4">
      <h2 className="font-bold text-3xl">{t("successPrompt")}</h2>
    </div>
    {files.map((file) => (
      <div key={file.id}>
          <MediaPreview file={file} />
      </div>
    ))}

    <div className="py-4">
      <CopyUrl url={uniqueIdUrl} />
    </div>

    <div className="flex gap-4">
      <Link href={uniqueIdUrl} target="_blank">
        <Button variant="outline">
          {t("visitNow")}
        </Button>
      </Link>
      <Button onClick={() => onReset()}>
        {t("continueUploading")}
      </Button>
    </div>
  </div>
  );
};
