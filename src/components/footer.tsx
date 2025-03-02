import env from "@/core/env";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export const Footer: React.FC = async () => {
  const t = await getTranslations("Footer");

  return (
    <footer className="w-full  py-6 text-center text-sm text-primary-foreground ">
      <div className="max-w-4xl mx-auto space-y-4">
        <div>version: {env.VERSION || "-"}</div>
        <nav className="flex justify-center space-x-4">
          <Link href={"/about"} className="hover:underline">
            {t("about")}
          </Link>
          <Link href="/contact" className="hover:underline">
            {t("contact")}
          </Link>
          <Link href="/policy/privacy" className="hover:underline">
            {t("privacyPolicy")}
          </Link>
          <Link target="_blank" href="/sitemap.xml" className="hover:underline">
            {t("sitemap")}
          </Link>
          <Link href="/policy/disclaimer" className="hover:underline">
            {t("disclaimer")}
          </Link>
          <Link href="/policy/termsOfService" className="hover:underline">
            {t("termsOfService")}
          </Link>
        </nav>
        <div>
          &copy; {new Date().getFullYear()} Beurl. {t('allRightsReserved')}
        </div>
      </div>
    </footer>
  );
};
