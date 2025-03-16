"use client";


import { useState } from "react";
import { ImageSuccess } from "./imageSuccess";
import { ImageForm } from "./imageForm";
import { FileWrapper } from "@/types";
import { scrollTop } from "@/lib/scroll";

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
            scrollTop();
          }}
        />
      ) : (
        <ImageSuccess
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
