import { useEffect, useState } from "react";

type Props = {
  file: File;
  onRemove?: () => void;
};

export const MediaShow: React.FC<Props> = ({ file, onRemove = () => {} }) => {
  const [src, setSrc] = useState<string>("");

  useEffect(() => {
    const objectUrl = URL.createObjectURL(file);
    setSrc(objectUrl);
    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [file]);

  return (
    <div className="flex justify-center items-center" onClick={() => onRemove()}>
      <video controls className="max-h-96">
        <source src={src} type="video/mp4" />
        <source src={src} type="audio/mpeg" />
        {"browser not support"}
      </video>
    </div>
  );
};
