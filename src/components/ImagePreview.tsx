"use client";

import { FileWrapper } from "@/types";
import { useEffect, useState } from "react";
import Image from "next/image";

type Props = {
  file: FileWrapper;
};

export const ImagePreview: React.FC<Props> = ({ file }) => {
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
      <div className="flex justify-center items-center bg-black min-h-60 overflow-hidden rounded-lg shadow-md">
        <Image alt="image" className="max-w-full" src={src} />
      </div>
    </div>
  );
};
