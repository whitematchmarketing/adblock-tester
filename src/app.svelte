<script>
  import { afterUpdate } from 'svelte';
  import { t } from "./i18n";
  import NightMode from "./nightMode";
  import Footer from "./footer";
  import TitleAndDescription from "./titleAndDescription";
  import Sections from './sections';

  if (process.env.NODE_ENV === "production") {
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
