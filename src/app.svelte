<script>
  import "./index.scss";
  import { t } from "./i18n";
  import NightMode from "./nightMode";
  import Footer from "./footer";
  import TitleAndDescription from "./titleAndDescription";
  import Sections from './sections'
</script>

<svelte:head>
  <title>{t("meta.title")}</title>
</svelte:head>

<NightMode />
<TitleAndDescription />
<Sections />
<Footer />
