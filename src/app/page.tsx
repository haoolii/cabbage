import { Hero } from "@/components/hero";
import { Button } from "@/components/ui/button";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import Image from "next/image";

export default async function Home() {
  const t = await getTranslations("Global");
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex flex-col items-center pt-16 pb-20 sm:pt-24 sm:pb-28 md:pt-32 md:pb-40">
        {/* Logo */}
        <Image
          src="/logo.svg"
          alt="BEURL Logo"
          className="w-24 sm:w-32 md:w-40"
          width={160}
          height={160}
          priority // 優先加載首屏圖片
        />

        {/* Title */}
        <h2 className="font-bold text-4xl sm:text-6xl md:text-8xl py-4 text-center">
          {"BEURL"}
        </h2>

        {/* Hero Component */}
        <div className="w-full max-w-4xl px-4 flex justify-center">
          <Hero />
        </div>

        {/* Buttons */}
        <div className="py-6 sm:py-10 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 px-4 w-full max-w-2xl">
          <Link href={"/url"} className="w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto text-sm sm:text-base">
              {t("shortenUrlActionLink")}
            </Button>
          </Link>
          <Link href={"/image"} className="w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto text-sm sm:text-base">
              {t("shortenImageActionLink")}
            </Button>
          </Link>
          <Link href={"/media"} className="w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto text-sm sm:text-base">
              {t("shortenMediaActionLink")}
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}