"use client";

import { Button } from "./ui/button";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTranslations } from "next-intl";

type Props = {
  url: string;
};
export const CopyUrl: React.FC<Props> = ({ url }) => {
  const { toast } = useToast();
  const t = useTranslations("Global");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: t("prompt"),
        description: t("copySuccess"),
      });
    } catch (error) {
      console.error(error);
      toast({
        title: t("error"),
        description: "copyFailed",
      });
    }
  };

  return (
    <div className="bg-secondary border-2  pl-6 pr-4 py-2 rounded-full flex items-center gap-4">
      <span>{url}</span>
      <Button
        className="rounded-full bg-background hover:bg-background"
        onClick={() => handleCopy()}
      >
        <span className="text-sm">{t("Copy")}</span>
        <Copy />
      </Button>
    </div>
  );
};
