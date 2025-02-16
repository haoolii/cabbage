import { getConfig } from "@/core/config";

export default function Policy() {
  const htmlString = getConfig("").privacyPolicy;
  return (
    <div className="max-w-3xl mx-auto py-10 privacy-policy">
      <div dangerouslySetInnerHTML={{ __html: htmlString }} />
    </div>
  );
}
