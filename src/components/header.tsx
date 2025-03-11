import { useTranslations } from "next-intl";
import Link from "next/link";
import { Button } from "./ui/button";
import { Nav } from "./nav";
import Image from "next/image";

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
          <Image src="/logo.svg" alt="logo" className="h-8" />
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
        <div>
          <Nav />
        </div>
      </header>
    </div>
  );
};
