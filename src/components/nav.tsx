"use client";

import { useState } from "react";
import ReactDOM from "react-dom";
import Link from "next/link";
import { useTranslations } from "next-intl";

// components
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import Language from "./language";
import { scrollTop } from "@/lib/scroll";

export const Nav = () => {
  const [open, setOpen] = useState(false);
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

  const policies = [
    {
      label: "links.privacyPolicy",
      value: "/policy/privacy",
    },
    {
      label: "links.disclaimer",
      value: "/policy/disclaimer",
    },
    {
      label: "links.termsOfService",
      value: "/policy/termsOfService",
    },
  ];
  return (
    <Drawer open={open} onOpenChange={setOpen} shouldScaleBackground={true}>
      <DrawerTrigger
        asChild
        onClick={() => {
          setOpen(true);
        }}
      >
        <Button variant="outline" size="icon">
          <HamburgerMenuIcon />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-4/5 max-w-3xl mx-auto">
        <div className="mx-auto w-full py-4 flex flex-col px-4 h-full">
          {links.map((link) => {
            const href = link.value;
            return (
              <Link
                key={link.value}
                href={href}
                className="py-1 w-full"
                onClick={() => {
                  if (href === window.location.pathname) {
                    // If the URL is the same, close, wait a little, and scroll to top smoothly
                    setOpen(false);
                    scrollTop();
                  } else {
                    // Otherwise, wait for the URL change before closing and scroll up instantly
                    onUrlChange(() => {
                      ReactDOM.flushSync(() => setOpen(false));
                      scrollTop();
                    });
                  }
                }}
              >
                <Button variant="ghost" className="w-full">
                  {t(link.label)}
                </Button>
              </Link>
            );
          })}
          <Separator className="max-w-40 mx-auto my-4" />
          <div className="flex justify-center">
            <Language />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

function onUrlChange(callback: () => void) {
  const initialUrl = window.location.href;

  function rafRecursively() {
    requestAnimationFrame(() => {
      if (initialUrl === window.location.href) {
        rafRecursively();
      } else {
        callback();
      }
    });
  }

  rafRecursively();
}
