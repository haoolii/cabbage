"use client";

import React, { useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useTranslations } from "next-intl";

const RotatingContent = () => {
  const t = useTranslations("Global");

  const links = [
    {
      label: t("shortenUrl"),
      href: "/url",
    },
    {
      label: t("shortenImage"),
      href: "/image",
    },
    {
      label: t("shortenMedia"),
      href: "/media",
    },
  ];
  const c = useMotionValue(0);
  const y = useTransform(
    c,
    [0, links.length - 1],
    ["0px", `-${(links.length - 1) * 80}px`]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      animate(c, (c.get() + 1) % links.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [c, links.length]);

  return (
    <div className="relative w-96 flex justify-center overflow-hidden h-20">
      <motion.div style={{ y }} className="absolute">
        {links.map((link) => (
          <motion.a
            href={link.href}
            target="_blank"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            key={link.href}
            className="h-20 flex justify-center items-center w-full"
          >
            <h2 className="font-semibold text-3xl border-b-8 border-[#f5d44a] px-4">
              {link.label}
            </h2>
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
};

export default RotatingContent;
