"use client";

import { Button } from "./ui/button";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Props = {
  url: string;
};
export const CopyUrl: React.FC<Props> = ({ url }) => {
  const { toast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: "提示",
        description: "複製成功",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "錯誤",
        description: "複製失敗，請重試",
      });
    }
  };

  return (
    <div className="bg-secondary border-2  pl-6 pr-4 py-2 rounded-full flex items-center gap-4">
      <span>{url}</span>
      <Button className="rounded-full bg-background hover:bg-background"  onClick={() => handleCopy()}>
        <span className="text-sm">複製</span>
        <Copy />
      </Button>
    </div>
  );
};
