import env from "@/core/env";
import { Turnstile } from "next-turnstile";

type Props = {
  onError?: () => void;
  onExpire?: () => void;
  onLoad?: () => void;
  onVerify?: (token: string) => void;
};
export const Captcha: React.FC<Props> = ({
  onError,
  onExpire,
  onLoad,
  onVerify,
}) => {
  return (
    <Turnstile
      siteKey={env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ""}
      retry="auto"
      execution="render"
      refreshExpired="auto"
      sandbox={env.NODE_ENV === "development"}
      onError={onError}
      onExpire={onExpire}
      onLoad={onLoad}
      onVerify={onVerify}
    />
  );
};
