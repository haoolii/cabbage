import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

export default function Media() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex flex-col items-center gap-6 py-20">
        <h2 className="font-semibold text-3xl py-4">
          最安全、快速、方便、免費的短網址服務
        </h2>
        <h3 className="font-semibold text-2xl">上傳影片、音訊</h3>
        <div className="flex flex-col gap-4 w-full items-center max-w-xl px-4">
          <label className="mb-4 p-14 bg-foreground/20 w-full rounded-xl flex justify-center border-2 border-dashed border-foreground/50 cursor-pointer hover:opacity-80 transition">
            <span className="font-medium text-base text-primary-foreground/60">
              上傳影片、音訊
            </span>
            <input type="file" hidden />
          </label>

          <div className="flex justify-start w-full">
            <label className="flex items-center gap-2 cursor-pointer">
              <Checkbox />
              <span className="-mb-0.5 font-medium text-sm">需要密碼</span>
            </label>
          </div>

          <label className="flex flex-col w-full gap-2">
            <span className="font-medium text-sm text-primary-foreground/60">
              密碼
            </span>
            <Input
              placeholder="請輸入密碼"
              className="bg-primary-foreground text-black rounded-2xl"
            />
          </label>

          <label className="flex flex-col w-full gap-2">
            <span className="font-medium text-sm text-primary-foreground/60">
              有效日期
            </span>
            <Input
              placeholder="請輸入有效日期"
              className="bg-primary-foreground text-black rounded-2xl"
            />
          </label>

          <label className="flex flex-col w-full gap-2">
            <span className="font-medium text-sm text-primary-foreground/60">
              說明內容
            </span>
            <Input
              placeholder="請輸入說明內容"
              className="bg-primary-foreground text-black rounded-2xl"
            />
          </label>
        </div>
        <Button className="w-44 rounded-2xl">上傳</Button>
      </div>
    </div>
  );
}
