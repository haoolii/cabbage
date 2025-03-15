"use client";

import env from "@/core/env";
import { useCallback, useEffect, useRef, useState } from "react";
import { Skeleton } from "./ui/skeleton";

type Props = {
  assetKey: string;
  token: string;
};

export const ImageAuthPreview: React.FC<Props> = ({ assetKey, token }) => {
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
        const img = new Image();

        img.onload = () => {
          if (!canvasRef.current) return;

          const canvas = canvasRef.current;
          const ctx = canvas.getContext("2d");

          if (!ctx) return;

          console.log("img", img);
          console.log(`img.width`, img.width);
          console.log(`img.height`, img.height);

          try {
            // 設定 canvas 尺寸
            canvas.width = img.width;
            canvas.height = img.height;

            // 清空 canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // 繪製圖片
            ctx.drawImage(img, 0, 0);
            setLoading(false);
            setLoaded(true);
            console.log("heeeelo", loaded);
          } catch (drawError) {
            console.error("Error drawing image:", drawError);
            setLoading(false);
            setError(true);
          }
        };

        img.onerror = (error) => {
          console.error("Image load error:", error);
          setLoading(false);
          setLoaded(false);
        };

        img.src = URL.createObjectURL(blob);
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
    <div className="relative w-full flex flex-col items-center">
      {loading ? (
        <Skeleton className="w-full h-full aspect-square"></Skeleton>
      ) : (
        <div className="flex justify-center items-center bg-black min-h-60 min-w-60 overflow-hidden rounded-lg shadow-md">
          <div className="relative w-full h-full">
            <canvas ref={canvasRef} className="max-w-full w-full" />
            <div className="absolute top-0 left-0 w-full h-full"></div>
          </div>
        </div>
      )}
      {error && (
        <div className="py-4 text-center">
          <h2 className="font-semibold text-4xl">Error</h2>
        </div>
      )}
    </div>
  );
};
