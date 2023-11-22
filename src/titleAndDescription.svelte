<script>
  import logo from "./assets/logo.svg";
  import { version, releaseDate } from "../package.json";
  import { t } from "./i18n";
</script>

<div class="title">
  <img src={logo} alt="" />
  <h1>
    <span class="heading-text">{t("page.title")}</span>
    <small class="heading-version"
      >({t("page.version")}&nbsp;{version}
      {t("page.release")}&nbsp;{new Date(+releaseDate).toLocaleDateString(process.env.LANG)})</small
    >
  </h1>
</div>

<p class="description">
  {@html t("page.description")}
</p>

<p class="warning">
  {@html t("page.warning")}
</p>

<style>
  .title {
    display: flex;
    align-items: center;
    margin-top: 3rem;
    margin-bottom: 1.5rem;
  }
  @media (min-width: 768px) {
    .title {
      flex-wrap: wrap;
      margin-top: 2rem;
    }
  }

  h1 {
    margin: 0;
    margin-right: 0.25em;
    line-height: 1;
  }
  @media (max-width: 768px) {
    h1 {
      line-height: 0.8;
    }
  }

  .heading-text,
  .heading-version {
    line-height: 1;
  }

  svg,
  img {
    flex-shrink: 0;
    margin-right: 0.5rem;
    height: 6rem;
    transform: translateY(-5%);
  }
  @media (max-width: 768px) {
    svg,
    img {
      height: 4rem;
      font-size: 4rem;
      margin-right: 1rem;
    }
  }

  .warning {
    margin: 2rem 0 0;
    padding-left: 1.5rem;
    border-left: 0.3em solid var(--color-orange);
  }
  @media (max-width: 768px) {
    .warning {
      margin: 1.5rem 0;
    }
  }
</style>
