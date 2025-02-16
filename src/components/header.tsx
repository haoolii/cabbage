import { useTranslations } from "next-intl";
import Link from "next/link";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import env from "@/core/env";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Language from "./language";
import { Button } from "./ui/button";

export const Header = () => {
  const t = useTranslations("Header");

  const links = [
    {
      label: "links.shortenUrlLink",
      value: "/url",
    },
    {
      label: "links.shortenImageLink",
      value: "/image",
    },
    {
      label: "links.shortenMediaLink",
      value: "/media",
    },
    {
      label: "links.policyLink",
      value: "/policy",
    },
  ];

  return (
    <header className="max-w-4xl w-full mx-auto flex items-center py-2 px-2">
      <Link href={"/"} className="p-2">
        {env.APP_NAME || "APP_Name"}
      </Link>
      <nav className="gap-2 hidden md:flex">
        {links.map((link) => (
          <Link key={link.value} href={link.value}>
            <Button variant="ghost">{t(link.label)}</Button>
          </Link>
        ))}
      </nav>
      <div className="flex-1"></div>
      <div className="hidden md:inline-block">
        <Language />
      </div>
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger className="p-2 border rounded-md">
            <HamburgerMenuIcon width={18} height={18} />
          </SheetTrigger>
          <SheetContent side="top">
            <SheetHeader>
              <SheetTitle>
                <Link href={"/"}>{env.APP_NAME || "APP_Name"}</Link>
              </SheetTitle>
              <SheetDescription className="flex flex-col gap-0.5 items-center justify-center">
                {links.map((link) => (
                  <Link
                    key={link.value}
                    href={link.value}
                    className="py-1 w-full"
                  >
                    <Button variant="ghost" className="w-full">
                      {t(link.label)}
                    </Button>
                  </Link>
                ))}
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};
