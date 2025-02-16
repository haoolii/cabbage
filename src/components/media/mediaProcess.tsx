"use client";

import { useState } from "react";
import { MediaSuccess } from "./mediaSuccess";
import { MediaForm } from "./mediaForm";

type Props = {};

export const MediaProcess: React.FC<Props> = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [uniqueId, setUniqueId] = useState<string>("");

  return (
    <div className="w-full flex justify-center">
      {!uniqueId ? (
        <MediaForm
          onSuccess={(files, uniqueId) => {
            setFiles(files);
            setUniqueId(uniqueId);
          }}
        />
      ) : (
        <MediaSuccess
          files={files}
          uniqueId={uniqueId}
          onReset={() => {
            setFiles([]);
            setUniqueId("");
          }}
        />
      )}
    </div>
  );
};
