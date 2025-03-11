import { FileWrapper } from "@/types";
import { Cross1Icon } from "@radix-ui/react-icons";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";

type Props = {
  file: FileWrapper;
};

export const MediaPreview: React.FC<Props> = ({ file }) => {
  const [src, setSrc] = useState<string>("");

  useEffect(() => {
    const objectUrl = URL.createObjectURL(file.file);
    setSrc(objectUrl);
    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [file]);

  return (
    <div className="relative w-full">
      {src && (
        <div className="flex justify-center items-center bg-black min-h-60 overflow-hidden rounded-lg shadow-md">
          <video controls className="max-w-full">
            <source src={src} type="video/mp4" />
            <source src={src} type="audio/mpeg" />
            {"browser not support"}
          </video>
        </div>
      )}
    </div>
  );
};
