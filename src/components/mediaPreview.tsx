"use client";

import env from "@/core/env";
import { useEffect, useState } from "react";

type Props = {
  assetKey: string;
  token: string;
};
export const MediaPreivew: React.FC<Props> = ({ assetKey, token }) => {
  const [src, setSrc] = useState("");

  const loadImage = async (url: string) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + 0.5 * 24 * 60 * 60 * 1000); // 計算過期時間
    document.cookie = `${"Authorization"}=Bearer ${token};expires=${expires.toUTCString()};path=/`;
    setSrc(url);
    // const response = await fetch(url, {
    //   credentials: "include",
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // });
    // const blob = await response.blob();
    // const objectUrl = URL.createObjectURL(blob);
    // setSrc(objectUrl);
  };

  useEffect(() => {
      loadImage(`${env.ASSET_BASE}/${assetKey}`);
  }, [assetKey]);

  return (
    <div>
      {src && (
        <video controls className="max-h-96">
          <source src={src} type="video/mp4" />
          <source src={src} type="audio/mpeg" />
          {"browser not support"}
        </video>
      )}
    </div>
  );
};
