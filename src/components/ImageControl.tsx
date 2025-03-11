import { FileWrapper } from "@/types";
import { Cross1Icon } from "@radix-ui/react-icons";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";

type Props = {
  file: FileWrapper;
  onDelete?: (id: string) => void;
};

export const ImageControl: React.FC<Props> = ({
  file,
  onDelete = () => {},
}) => {
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
      <Button
        size="icon"
        className=" w-6 h-6 rounded-full absolute -right-3 -top-3"
        onClick={() => onDelete(file.id)}
      >
        <Cross1Icon width={24} height={24} />
      </Button>
      <div className="flex justify-center items-center bg-black min-h-60 overflow-hidden rounded-lg shadow-md">
        <Image alt="image" className="max-w-full" src={src} />
      </div>
    </div>
  );
};
