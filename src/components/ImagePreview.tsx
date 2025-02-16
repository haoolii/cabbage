"use client";

import { useEffect, useState } from "react";

type Props = {
  assetKey: string;
  token: string;
};
export const ImagePreivew: React.FC<Props> = ({ assetKey, token }) => {
  const [src, setSrc] = useState("");

  const loadImage = async (url: string) => {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);
    setSrc(objectUrl);
  };

  useEffect(() => {
    loadImage(`http://localhost:3000/o/${assetKey}`);
  }, [assetKey]);

  return <div>{src && <img src={src} />}</div>;
};
