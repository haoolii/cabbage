import { getTranslations } from "next-intl/server";
import { Button } from "./ui/button";
import Link from "next/link";

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

export const NavLinks: React.FC = async () => {
  const t = await getTranslations("Header");

  return (
    <div className="pt-2 pb-4">
      {links.map((link) => (
        <Link key={link.value} href={link.value}>
          <Button variant="ghost">{t(link.label)}</Button>
        </Link>
      ))}
    </div>
  );
};
