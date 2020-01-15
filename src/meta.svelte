<script>
  import { t } from "./i18n";

  let hostUrl = `https://checkadblocker.${process.env.LANG}`;
</script>

<svelte:head>
  <title>{t("meta.title")}</title>
  <meta name="description" content="{t("meta.description")}" />
  <link rel="canonical" href="{hostUrl}" />
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=qAJrlpKQ8p" />
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=qAJrlpKQ8p" />
  <link rel="manifest" href="/site.webmanifest?v=qAJrlpKQ8p" />
  <link rel="mask-icon" href="/safari-pinned-tab.svg?v=qAJrlpKQ8p" color="#fd6460" />
  <link rel="shortcut icon" href="/favicon.ico?v=qAJrlpKQ8p" />
  <meta name="msapplication-TileColor" content="#2d89ef" />
  <meta name="msapplication-config" content="/browserconfig.xml?v=qAJrlpKQ8p" />
  <meta name="theme-color" content="#ffffff" />
</svelte:head>
