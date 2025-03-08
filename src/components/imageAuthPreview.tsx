"use client";

import env from "@/core/env";
import { useEffect, useState } from "react";

type Props = {
  assetKey: string;
  token: string;
};

export const ImageAuthPreview: React.FC<Props> = ({ assetKey, token }) => {
  const [src, setSrc] = useState("");
  const [loading, setLoading] = useState(true);

  const loadImage = async (url: string) => {
    try {
      setLoading(true);
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      setSrc(objectUrl);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadImage(`${env.ASSET_BASE}/${assetKey}`);
  }, [assetKey]);

  return (
    <div className="relative w-full">
      <div className="flex justify-center items-center bg-black min-h-60 overflow-hidden rounded-lg shadow-md">
        <img className="max-w-full" src={src} />
      </div>
    </div>
  );
};
