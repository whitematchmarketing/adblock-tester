<script>
  import { afterUpdate } from 'svelte';

  import "./index.scss";
  import { t } from "./i18n";
  import { isProd } from "./utils";
  import NightMode from "./nightMode";
  import Footer from "./footer";
  import TitleAndDescription from "./titleAndDescription";
  import Sections from './sections';

  if (isProd) {
    afterUpdate(() => setTimeout(() => document.dispatchEvent(new Event("prerender-trigger")), 500));
  }
</script>

<svelte:head>
  <title>{t("meta.title")}</title>
</svelte:head>

<NightMode />
<TitleAndDescription />
<Sections />
<Footer />
