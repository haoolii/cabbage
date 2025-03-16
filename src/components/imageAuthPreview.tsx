"use client";

import env from "@/core/env";
import { useCallback, useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import Image from "next/image";

type Props = {
  assetKey: string;
  token: string;
};

export const ImageAuthPreview: React.FC<Props> = ({ assetKey, token }) => {
  const [src, setSrc] = useState("");
  const [loading, setLoading] = useState(true);

  const loadImage = useCallback(async (url: string) => {
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
  }, [setLoading, token]);

  useEffect(() => {
    loadImage(`${env.ASSET_BASE}/${assetKey}`);
  }, [assetKey, loadImage]);

  return (
    <div className="relative w-full">
      {loading ? (
        <Skeleton className="w-full h-full aspect-square"></Skeleton>
      ) : (
        <div className="flex justify-center items-center bg-black min-h-60 min-w-60 overflow-hidden rounded-lg shadow-md">
          {src && <img alt="image" className="max-w-full w-full" src={src} />}
          <div className="absolute top-0 left-0 w-full h-full"></div>
        </div>
      )}
    </div>
  );
};
