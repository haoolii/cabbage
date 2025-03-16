"use client";

import { useState } from "react";
import { MediaSuccess } from "./mediaSuccess";
import { MediaForm } from "./mediaForm";
import { FileWrapper } from "@/types";
import { scrollTop } from "@/lib/scroll";

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
            scrollTop();
          }}
        />
      ) : (
        <MediaSuccess
          files={files}
          uniqueId={uniqueId}
          onReset={() => {
            setFiles([]);
            setUniqueId("");
            scrollTop();
          }}
        />
      )}
    </div>
  );
};
