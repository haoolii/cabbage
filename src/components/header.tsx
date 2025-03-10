import { useTranslations } from "next-intl";
import Link from "next/link";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import env from "@/core/env";
import Image from "next/image"; 
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
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "./ui/drawer";
import { Nav } from "./nav";

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
  ];

  return (
    <div>
      <header className="max-w-5xl w-full mx-auto flex items-center gap-x-2 p-4">
        <Link href={"/"} className="justify-center items-center flex mr-4">
          <img src="/logo.svg" alt="logo" className="h-8" />
          <h1 className="font-semibold -mb-1">{"BeURL"}</h1>
        </Link>
        <nav className="gap-2 hidden md:flex -mb-1">
          {links.map((link) => (
            <Link key={link.value} href={link.value}>
              <Button variant="ghost" className="font-semibold">
                {t(link.label)}
              </Button>
            </Link>
          ))}
        </nav>
        <div className="flex-1"></div>
        <div >
          <Nav />
        </div>
      </header>
    </div>
  );
};
