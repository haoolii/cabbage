"use client";

import { postRecordPassword } from "@/request/requests";
import { useState } from "react";
import { Captcha } from "./captcha";
type Props = {
    uniqueId: string;
}
export const PasswordInput: React.FC<Props> = ({ uniqueId }) => {
  const [password, setPassword] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");

  const submit = async () => {
    await postRecordPassword(uniqueId, { password, captchaToken });
  };

  return (
    <div>
      <input
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Captcha onVerify={token => {
          setCaptchaToken(token);
      }} />
      <button onClick={() => submit()}>Submit</button>
    </div>
  );
};
