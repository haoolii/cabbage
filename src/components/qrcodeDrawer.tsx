import { useState } from "react";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";
import { Button } from "./ui/button";
import { QrCodeIcon } from "lucide-react";
import QRCode from "react-qr-code";

type Props = {
    value: string;
};

export const QRCodeDrawer: React.FC<Props> = ({ value }) => {
  const [open, setOpen] = useState(false);
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
        <div className="mx-auto w-full py-4 pb-20 flex flex-col h-full flex justify-center items-center">
          <QRCode
            size={256}
            className="h-full w-full max-h-48 max-w-48"
            value={value}
            viewBox={`0 0 256 256`}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
};
