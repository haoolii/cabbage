"use client";

import { useState } from "react";
import { UrlForm } from "./urlForm";
import { UrlSuccess } from "./urlSuccess";
import { scrollTop } from "@/lib/scroll";

type Props = {};

export const UrlProcess: React.FC<Props> = () => {
  const [uniqueId, setUniqueId] = useState<string>("");

  return (
    <div className="w-full flex justify-center">
      {!uniqueId ? (
        <UrlForm
          onSuccess={(uniqueId) => {
            setUniqueId(uniqueId);
            scrollTop();
          }}
        />
      ) : (
        <UrlSuccess
          uniqueId={uniqueId}
          onReset={() => {
            setUniqueId("");
             scrollTop();
          }}
        />
      )}
    </div>
  );
};
