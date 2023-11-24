<script>
  import { afterUpdate } from 'svelte';
  import NightMode from "./nightMode";
  import Footer from "./footer";
  import TitleAndDescription from "./titleAndDescription";
  import Sections from './sections';
  import Meta from './meta';

  if (process.env.NODE_ENV === "production") {
    afterUpdate(() => setTimeout(() => document.dispatchEvent(new Event("prerender-trigger")), 250));
  }
</script>

<Meta />
<NightMode />
<TitleAndDescription />
<Sections />
<Footer />
