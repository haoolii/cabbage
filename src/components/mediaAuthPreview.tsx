"use client";

import React, { useEffect, useState } from "react";
import env from "@/core/env";

type Props = {
  assetKey: string;
  token: string;
};

export const MediaAuthPreview: React.FC<Props> = ({ assetKey, token }) => {
  const [src, setSrc] = useState("");
  const [loading, setLoading] = useState(true);

  const loadImage = async (url: string) => {
    try {
      setLoading(true);
      const response = await fetch("https://asset.beurl.cc/2025-03-09/08823a99-0b7a-4fd5-9d0f-6dd4c3f9c83a.mp4", {
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
        {
          src &&  <video className="max-w-full" controls controlsList="nodownload">
          <source src={src} type="video/mp4" />
          <source src={src} type="audio/mpeg"  />
          {"browser not support"}
        </video>
        }

      </div>
    </div>
  );
};
