"use client";

import { useRef, useState } from "react";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";
import { Button } from "./ui/button";
import { QrCodeIcon } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import { useTranslations } from "next-intl";

type Props = {
  value: string;
};

export const QRCodeDrawer: React.FC<Props> = ({ value }) => {
  const t = useTranslations("Global");
  const [open, setOpen] = useState(false);
  const qrRef = useRef<HTMLCanvasElement>(null);

  const downloadQRCode = () => {
    if (qrRef.current) {
      const canvas = qrRef.current;
      const url = canvas.toDataURL("image/png"); // 轉換為圖片 URL
      const a = document.createElement("a");
      a.href = url;
      a.download = "qrcode.png"; // 設定下載的檔名
      a.click();
      document.removeChild(a);
    }
  };

  return (
    <Drawer open={open} onOpenChange={setOpen} shouldScaleBackground={true}>
      <DrawerTrigger
        asChild
        onClick={() => {
          setOpen(true);
        }}
      >
        <Button size="icon" className="rounded-full px-6">
          <QrCodeIcon />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-1/3">
        <div className="mx-auto w-full pt-10 pb-20 flex flex-col h-full justify-center items-center gap-4">
          <div className="aspect-square max-h-full flex justify-center">
            <QRCodeCanvas className="max-h-full" value={value} size={256} ref={qrRef} />
          </div>
          <Button variant="outline" disabled={!value} onClick={downloadQRCode}>{t("downloadQRCode")}</Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
