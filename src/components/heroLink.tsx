"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

type HeroLinkProps = {
  href: string;
  label: string;
  key: string;
};
export const HeroLink: React.FC<HeroLinkProps> = ({ key, href, label }) => {
  const pathname = usePathname();

  const currentPath = pathname;

  const isActive = currentPath.includes(href);

  return (
    <Link key={key} href={href}>
      <Button variant="link" className={`font-semibold text-lg text-primary-foreground underline-offset-8 ${isActive && 'underline'}`}>{label}</Button>
    </Link>
  );
};
