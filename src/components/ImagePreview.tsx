"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import env from "@/core/env";

type Props = {
  assetKey: string;
  token: string;
};
export const ImagePreivew: React.FC<Props> = ({ assetKey, token }) => {
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
    <div>
      {loading ? (
        <Skeleton className="aspect-square bg-secondary" />
      ) : (
        <div>{src && <img src={src} />}</div>
      )}
    </div>
  );
};
