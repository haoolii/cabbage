import type { Metadata, ResolvingMetadata } from "next";
import "./globals.css";
import { Header } from "@/components/header";
import { Toaster } from "@/components/ui/toaster";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { Noto_Sans_TC } from "next/font/google";
import { Footer } from "@/components/footer";

const fontTC = Noto_Sans_TC({ weight: ["100", "200", "300", "400", "500", "600"], subsets: ['latin'] });

export async function generateMetadata(
  { params: { locale } }: { params: { locale: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const t = await getTranslations("Global");

  return {
    title: t("title"),
    description: t("description"),
    // keywords: [
    //   "USDT 匯率",
    //   "usdtwd 匯率",
    //   "usdt 換 twd",
    //   "usdt 台幣匯率",
    //   "usdt 轉台幣",
    //   "usdtw",
    //   "USDT",
    //   "泰達幣",
    //   "比比幣",
    //   "比價",
    //   "加密貨幣",
    //   "交易所",
    //   "划算",
    //   "交易",
    //   "合規",
    //   "虛擬貨幣",
    //   "台灣",
    //   "台幣",
    // ].map((w) => t(w)),
    // icons: [
    //   {
    //     type: "image/png",
    //     sizes: "32x32",
    //     url: "/favicon-32x32.png",
    //   },
    //   {
    //     type: "image/png",
    //     sizes: "16x16",
    //     url: "/favicon-16x16.png",
    //   },
    // ],
    openGraph: {
      title: t("title"),
      description: t("description"),
      // images: "og.png",
    },
    // other: {
    //   "google-site-verification": "iCnHzSsovYn-Tqm8zsYP257tj72IgGl_0TTCVYCjU-4",
    //   "google-adsense-account": "ca-pub-8420154229372901",
    //   "msapplication-TileColor": "#ee4d2d",
    //   "theme-color": "#ee4d2d",
    // },
    // manifest: "/site.webmanifest",
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  const messages = await getMessages();
  return (
    <html lang={locale}>
      <body className={`${fontTC.className} antialiased`}>
        <NextIntlClientProvider messages={messages}>
            <div vaul-drawer-wrapper="">
              <div className="bg-primary-foreground">
                <Header />
                <div className="min-h-dvh">{children}</div>
                <Toaster />
                <div className="h-16 sm:hidden"></div>
                <Footer />
              </div>
            </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
