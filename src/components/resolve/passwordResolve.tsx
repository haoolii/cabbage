"use client";

import { Input } from "../ui/input";
import { postRecordPassword } from "@/request/requests";
import { useState } from "react";
import { Button } from "../ui/button";
import { Record } from "@/request/types";
import { isSuccess } from "@/request/util";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "../ui/toast";
type Props = {
  uniqueId: string;
  record: Record;
};
export const PasswordResolve: React.FC<Props> = ({ uniqueId, record }) => {
  const [password, setPassword] = useState("");
  const { toast } = useToast()

  const onSubmit = async () => {
    const json = await postRecordPassword(uniqueId, { password });
    setPassword("");
    console.log('json', json)
    if (isSuccess(json)) {
      document.cookie = `Authorization=${json?.data?.token}; path=/;`;
      window.location.reload();
      return;
    }
    toast({
      variant: "destructive",
      title: "錯誤提示",
      description: "密碼錯誤",
    })
  };

  return (
    <div className="flex justify-center py-20">
      <div className="w-full max-w-xl flex flex-col gap-6 items-center px-4">
        <h2 className="font-semibold text-3xl py-4">請輸入密碼解鎖</h2>
        <div>
          <span className="font-medium text-sm text-primary-foreground/60">
            提示內容: {record.prompt || "無"}
          </span>
        </div>
        <Input
          placeholder="請輸入密碼"
          value={password}
          className="bg-primary-foreground text-black rounded-2xl max-w-xl"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button className="w-44 rounded-2xl" onClick={() => onSubmit()}>
          送出
        </Button>
      </div>
    </div>
  );
};
