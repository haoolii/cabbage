import { useTranslations } from "next-intl";

export const useExpireTimes = () => {
  const t = useTranslations("Global");

  return [
    { label: t("1min"), value: 1 * 60 },
    { label: t("5min"), value: 5 * 60 },
    { label: t("30min"), value: 30 * 60 },
    { label: t("1hour"), value: 1 * 60 * 60 },
    { label: t("6hour"), value: 6 * 60 * 60 },
    { label: t("12hour"), value: 12 * 60 * 60 },
    { label: t("1day"), value: 1 * 24 * 60 * 60 },
    { label: t("3day"), value: 3 * 24 * 60 * 60 },
    { label: t("7day"), value: 7 * 24 * 60 * 60 },
    { label: t("10day"), value: 10 * 24 * 60 * 60 },
    { label: t("30day"), value: 30 * 24 * 60 * 60 },
    { label: t("Unlimited"), value: 0 },
  ];
};
