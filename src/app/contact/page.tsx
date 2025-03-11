import { Button } from "@/components/ui/button";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function Contact() {
  const t = await getTranslations("ContactPage");
  return (
    <div className="max-w-4xl mx-auto py-10 px-4 flex flex-col">
      <div className="flex flex-col">
        <h1 className="font-semibold text-2xl">{t("contactEmail")}</h1>
        <h4 className="font-semibold text-lg">admin@beurl.cc</h4>
      </div>

      <Link href={"/"} className="mt-10">
        <Button>{t("backToHome")}</Button>
      </Link>
    </div>
  );
}
