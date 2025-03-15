"use client";

import { useState } from "react";
import { MediaSuccess } from "./mediaSuccess";
import { MediaForm } from "./mediaForm";
import { FileWrapper } from "@/types";

export const MediaProcess: React.FC = () => {
  const [files, setFiles] = useState<FileWrapper[]>([]);
  const [uniqueId, setUniqueId] = useState<string>("");

  return (
    <div className="">
      {!uniqueId ? (
        <MediaForm
          onSuccess={(files, uniqueId) => {
            setFiles(files);
            setUniqueId(uniqueId);
            window.scrollTo({
              top: 0,
              behavior: "smooth", // 平滑滾動
            });
          }}
        />
      ) : (
        <MediaSuccess
          files={files}
          uniqueId={uniqueId}
          onReset={() => {
            setFiles([]);
            setUniqueId("");
            window.scrollTo({
              top: 0,
              behavior: "smooth", // 平滑滾動
            });
          }}
        />
      )}
    </div>
  );
};
