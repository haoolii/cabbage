"use client";

import React, { useCallback, useEffect, useState } from "react";
import env from "@/core/env";
import { Skeleton } from "./ui/skeleton";

type Props = {
  assetKey: string;
  token: string;
};

export const MediaAuthPreview: React.FC<Props> = ({ assetKey, token }) => {
  const [src, setSrc] = useState("");
  const [loading, setLoading] = useState(true);

  const loadImage = useCallback(
    async (url: string) => {
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
    },
    [setLoading, token]
  );

  useEffect(() => {
    loadImage(`${env.ASSET_BASE}/${assetKey}`);
  }, [assetKey, loadImage]);

  return (
    <div className="relative w-full">
      {loading ? (
        <Skeleton className="w-full h-full aspect-square"></Skeleton>
      ) : (
        <div className="flex justify-center items-center bg-black min-h-60 min-w-60 overflow-hidden rounded-lg shadow-md">
          {src && (
            <video className="max-w-full" controls controlsList="nodownload">
              <source src={src} type="video/mp4" />
              <source src={src} type="audio/mpeg" />
              {"browser not support"}
            </video>
          )}
        </div>
      )}
    </div>
  );
};
