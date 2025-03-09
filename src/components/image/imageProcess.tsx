"use client";


import { useState } from "react";
import { ImageSuccess } from "./imageSuccess";
import { ImageForm } from "./imageForm";
import { FileWrapper } from "@/types";

export const ImageProcess: React.FC = () => {
  const [files, setFiles] = useState<FileWrapper[]>([]);
  const [uniqueId, setUniqueId] = useState<string>("");
 
  return (
    <div className="">
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
