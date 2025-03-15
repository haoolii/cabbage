"use client";

import { useState } from "react";
import { UrlForm } from "./urlForm";
import { UrlSuccess } from "./urlSuccess";

type Props = {};

export const UrlProcess: React.FC<Props> = () => {
  const [uniqueId, setUniqueId] = useState<string>("");

  return (
    <div className="w-full flex justify-center">
      {!uniqueId ? (
        <UrlForm
          onSuccess={(uniqueId) => {
            setUniqueId(uniqueId);
            window.scrollTo({
              top: 0,
              behavior: "smooth", // 平滑滾動
            });
          }}
        />
      ) : (
        <UrlSuccess
          uniqueId={uniqueId}
          onReset={() => {
            setUniqueId("");
            window.scrollTo({
              top: 0,
              behavior: "smooth", // 平滑滾動
            });
          }}
        />
      )}
    </div>
  );
};
