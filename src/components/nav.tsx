"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";
import { useTranslations } from "next-intl";
import { useState } from "react";
import ReactDOM from "react-dom";

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
  return (
    <Drawer open={open} onOpenChange={setOpen} shouldScaleBackground={true}>
      <DrawerTrigger asChild onClick={() => { setOpen(true)}}>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent className="h-4/5">
        <div className="mx-auto w-full max-w-sm">
          {links.map((link) => {
            const href = link.value;
            return  <Link key={link.value} href={href} className="py-1 w-full" onClick={() => {
                if (href === window.location.pathname) {
                    // If the URL is the same, close, wait a little, and scroll to top smoothly
                    setOpen(false);
                    setTimeout(() => {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }, 500);
                  } else {
                    // Otherwise, wait for the URL change before closing and scroll up instantly
                    onUrlChange(() => {
                      ReactDOM.flushSync(() => setOpen(false));
                      window.scrollTo({ top: 0, behavior: 'instant' });
                    });
                  }
            }}>
              <Button variant="ghost" className="w-full">
                {t(link.label)}
              </Button>
            </Link>
          })}
          {/* <DrawerHeader>
          <DrawerTitle>Move Goal</DrawerTitle>
          <DrawerDescription>
            Set your daily activity goal.
          </DrawerDescription>
        </DrawerHeader> */}
          {/* <div className="p-4 pb-0">
          <h1>Hello World</h1>
        </div> */}
          {/* <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter> */}
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
