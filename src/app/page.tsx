import { Hero } from "@/components/hero";
import { Button } from "@/components/ui/button";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import Image from "next/image";


export default async function Home() {
  const t = await getTranslations("Global");
  return (
    <div>
      <div className="flex flex-col items-center pt-32 pb-40">
        <Image src="/logo.svg" alt="logo" className="w-40" width={160} height={160} />
        <h2 className="font-bold text-8xl py-4 text-center">{"BEURL"}</h2>
        <Hero />
        <div className="py-10 flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link href={"/url"} target="_blank">
            <Button variant="outline">{t("shortenUrlActionLink")}</Button>
          </Link>
          <Link href={"/image"} target="_blank">
            <Button variant="outline">{t("shortenImageActionLink")}</Button>
          </Link>
          <Link href={"/media"} target="_blank">
            <Button variant="outline">{t("shortenMediaActionLink")}</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
