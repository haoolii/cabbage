import { getTranslations } from "next-intl/server";

export default async function Policy() {
  const t = await getTranslations("Policy.disclaimer");

  return (
    <div className="max-w-3xl mx-auto pt-10 pb-60 privacy-policy px-4">
      <h1 className="text-4xl font-bold py-8 text-center">{t("title")}</h1>
      <ul className="space-y-6 leading-relaxed list-disc  text-pretty">
        <li className="list-none">
          <h3 className="text-lg font-semibold">{t("1_title")}</h3>
          <p>{t("1_content")}</p>
        </li>
        <li className="list-none">
          <h3 className="text-lg font-semibold">{t("2_title")}</h3>
          <p>{t("2_content")}</p>
        </li>
        <li className="list-none">
          <h3 className="text-lg font-semibold">{t("3_title")}</h3>
          <p>{t("3_content")}</p>
        </li>
        <li className="list-none">
          <h3 className="text-lg font-semibold">{t("4_title")}</h3>
          <p>{t("4_content")}</p>
        </li>
        <li className="list-none">
          <h3 className="text-lg font-semibold">{t("5_title")}</h3>
          <p>{t("5_content")}</p>
        </li>
        <li className="list-none">
          <h3 className="text-lg font-semibold">{t("6_title")}</h3>
          <p>{t("6_content")}</p>
        </li>
        <li className="list-none">
          <h3 className="text-lg font-semibold">{t("7_title")}</h3>
          <p>{t("7_content")}</p>
        </li>
        <li className="list-none">
          <h3 className="text-lg font-semibold">{t("8_title")}</h3>
          <p>{t("8_content")}</p>
        </li>
      </ul>
    </div>
  );
}
