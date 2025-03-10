import { PropsWithChildren, useRef } from "react";
import { Button } from "./ui/button";
import { v4 as uuid } from "uuid";
import { FileWrapper } from "@/types";

type Props = {
  accept?: string;
  onChange?: (files: FileWrapper[]) => void;
};

export const UploadButton: React.FC<PropsWithChildren<Props>> = ({
  accept = "",
  onChange = () => {},
  children,
}) => {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <label htmlFor="file-upload">
      <Button
        type="button"
        className="w-full"
        variant="outline"
        onClick={() => ref.current?.click()}
      >
        {children}
      </Button>
      <input
        ref={ref}
        id="file-upload"
        type="file"
        hidden
        accept={accept}
        multiple
        onChange={(e) => {
          if (e.target.files) {
            onChange(
              [...e.target.files].map((file) => ({
                file,
                id: uuid(),
              }))
            );
          } else {
            onChange([]);
          }
          e.target.value = "";
        }}
      />
    </label>
  );
};
