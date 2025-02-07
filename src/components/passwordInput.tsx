"use client";

import { postGetRecordDetail } from "@/request/requests";
import { useState } from "react";
type Props = {
    uniqueId: string;
}
export const PasswordInput: React.FC<Props> = ({ uniqueId }) => {
  const [password, setPassword] = useState("");

  const submit = async () => {
    const json = await postGetRecordDetail(uniqueId, { password });
  };

  return (
    <div>
      <input
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={() => submit()}>Submit</button>
    </div>
  );
};
