import { UrlProcess } from "@/components/url/urlProcess";

export default function Url() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex flex-col items-center gap-6 py-40">
        <h2 className="font-semibold text-3xl py-4">
          最安全、快速、方便、免費的短網址服務
        </h2>
        <UrlProcess />
      </div>
    </div>
  );
}
