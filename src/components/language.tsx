"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export default function Language() {
  const router = useRouter();

  const changeLocale = (locale: string) => {
    document.cookie = `locale=${locale}; path=/;`;
    router.refresh(); // 重新加載頁面
  };

  return (
    <div className="flex space-x-2">
      <Button variant="ghost" onClick={() => changeLocale("en")}>English</Button>
      <Button variant="ghost" onClick={() => changeLocale("zh-TW")}>中文</Button>
    </div>
  );
}
