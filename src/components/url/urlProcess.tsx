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
        <UrlForm onSuccess={(uniqueId) => setUniqueId(uniqueId)} />
      ) : (
        <UrlSuccess
          uniqueId={uniqueId}
          onReset={() => {
            setUniqueId("");
          }}
        />
      )}
    </div>
  );
};
