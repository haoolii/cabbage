"use client";

import { ImageForm } from "@/components/image/imageForm";
import { useState } from "react";
import { ImageSuccess } from "./imageSuccess";

type Props = {};

export const ImageProcess: React.FC<Props> = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [uniqueId, setUniqueId] = useState<string>("");

  return (
    <div className="w-full flex justify-center">
      {!uniqueId ? (
        <ImageForm
          onSuccess={(files, uniqueId) => {
            setFiles(files);
            setUniqueId(uniqueId);
          }}
        />
      ) : (
        <ImageSuccess
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
