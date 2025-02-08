import { Cross2Icon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

type Props = {
  file: File;
  onRemove?: () => void;
};
export const ImageShow: React.FC<Props> = ({ file, onRemove }) => {
  const [src, setSrc] = useState<string>("");

  useEffect(() => {
    const objectUrl = URL.createObjectURL(file);
    setSrc(objectUrl);
    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [file]);

  return (
    <div className="relative w-80 h-80 overflow-hidden flex justify-center items-center rounded-md">
      <img
        className="w-full h-full object-cover hover:scale-110 transition-transform"
        src={src}
      />
      {onRemove && (
        <div
          className="absolute right-2 top-2 bg-destructive rounded-full overflow-hidden w-8 h-8 flex justify-center items-center"
          onClick={() => {
            onRemove();
          }}
        >
          <Button type="button" size="icon" variant="outline">
            <Cross2Icon />
          </Button>
        </div>
      )}
    </div>
  );
};
