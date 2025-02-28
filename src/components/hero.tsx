import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { HeroLink } from "./heroLink";

export const Hero: React.FC = async () => {
  const t = await getTranslations("Header");

  //   const pathname = getPathN()

  //   const currentPath = pathname;

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
    <div className="flex flex-col items-center py-16 gap-4">
      <Image src={"/bibibi.svg"} alt="Logo" width={80} height={80} />
      <div className="flex">
        {links.map((link) => (
          <HeroLink key={link.value} href={link.value} label={t(link.label)} />
        ))}
      </div>
    </div>
  );
};
