import { ImageProcess } from "@/components/image/imageProcess";

export default function Image() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex flex-col items-center gap-6 py-20 px-4">
        <h2 className="font-semibold text-3xl py-4 text-center">
          最安全、快速、方便、免費的短網址服務
        </h2>
        <h3 className="font-semibold text-2xl">上傳圖片、上傳影像</h3>
        <ImageProcess />
      </div>
    </div>
  );
}
