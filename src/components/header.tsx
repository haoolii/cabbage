import Link from "next/link";
import env from "@/core/env";

export const Header = () => {
  return (
    <header className="max-w-3xl w-full mx-auto flex items-center">
      <Link href={"/"} className="p-4">{env.APP_NAME}</Link>
      <nav className="flex gap-4">
        <Link href={"/url"}>{"URL"}</Link>
        <Link href={"/image"}>{"Image"}</Link>
        <Link href={"/media"}>{"Media"}</Link>
      </nav>
    </header>
  );
};
