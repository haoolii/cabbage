"use client";

import { useTranslations } from "next-intl";
import { Button } from "../ui/button";
import { ImageShow } from "./imageShow";
import { CopyUrl } from "../copyUrl";
import env from "@/core/env";

type Props = {
  files: File[];
  uniqueId: string;
  onReset: () => void;
};
export const ImageSuccess: React.FC<Props> = ({ files, uniqueId, onReset }) => {
  const uniqueIdUrl = `${env.CLIENT_API_BASE}/${uniqueId}`;

  const t = useTranslations("ImagePage");

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="py-4">
        <h2 className="font-bold text-3xl">{t("successPrompt")}</h2>
      </div>
      {files.map((file) => (
        <div key={file.name}>
          <ImageShow file={file} />
        </div>
      ))}

      <div className="py-4">
        <CopyUrl url={uniqueIdUrl} />
      </div>
      <Button onClick={() => onReset()} className="w-44 rounded-2xl">
        {t("continueUploading")}
      </Button>
    </div>
  );
};
