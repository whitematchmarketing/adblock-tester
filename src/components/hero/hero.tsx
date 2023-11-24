import logo from "./logo.svg";
import { t } from "@/i18n";
import { version, releaseDate } from "@/../package.json";

export const Hero = () => {
  return (
    <>
      <div class="title">
        <img src={logo.src} width={logo.width} height={logo.height} alt="" />
        <h1>
          <span class="heading-text">{t("page.title")}</span>
          <small class="heading-version">
            ({t("page.version")}&nbsp;{version}
            {t("page.release")}&nbsp;
            {new Date(+releaseDate).toLocaleDateString(process.env.LANG)})
          </small>
        </h1>
      </div>

      <p
        class="description"
        dangerouslySetInnerHTML={{ __html: t("page.description") }}
      />
      <p
        class="warning"
        dangerouslySetInnerHTML={{ __html: t("page.warning") }}
      />
    </>
  );
};
