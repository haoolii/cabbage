import env from "@/core/env";
import { useTranslations } from "next-intl";
import { MediaShow } from "./mediaShow";
import Link from "next/link";
import { Button } from "../ui/button";

type Props = {
  files: File[];
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
        <div key={file.name}>
          <MediaShow file={file} />
        </div>
      ))}

      <div>
        <Link href={uniqueIdUrl}>{uniqueIdUrl}</Link>
      </div>
      <Button onClick={() => onReset()} className="w-44 rounded-2xl">
        {t("continueUploading")}
      </Button>
    </div>
  );
};
