import type { Metadata, ResolvingMetadata } from "next";
import "./globals.css";
import { Header } from "@/components/header";
import { Toaster } from "@/components/ui/toaster";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { Noto_Sans_TC } from "next/font/google";
import { Footer } from "@/components/footer";
import Script from "next/script";

const fontTC = Noto_Sans_TC({
  weight: ["100", "200", "300", "400", "500", "600"],
  subsets: ["latin"],
});

export async function generateMetadata(
  { params: { locale } }: { params: { locale: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const t = await getTranslations("Global");

  return {
    title: t("title"),
    description: t("description"),
    icons: {
      icon: [
        { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/favicon.ico" },
      ],
      apple: "/apple-touch-icon.png",
    },
    manifest: "/site.webmanifest",
    appleWebApp: {
      title: "MyWebSite",
    },
    keywords: [],
    openGraph: {
      title: t("title"),
      description: t("description"),
      // images: "og.png",
    },
    other: {
      // "google-site-verification": "iCnHzSsovYn-Tqm8zsYP257tj72IgGl_0TTCVYCjU-4",
      // "google-adsense-account": "ca-pub-8420154229372901",
      "msapplication-TileColor": "#fff",
      "theme-color": "#fff",
    },
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
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-JZ36FSNR54"
      />
      <Script id="google-analytics">
        {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-JZ36FSNR54');
            `}
      </Script>
    </html>
  );
}
