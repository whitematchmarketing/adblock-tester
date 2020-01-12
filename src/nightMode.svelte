<script>
  import Switcher from "./switcher";
  import { t } from "./i18n";
  import { getActiveTheme, saveTheme } from "./utils";

  let isNightMode = getActiveTheme();
  let html = document.documentElement;

  $: {
    html.classList.add(isNightMode ? "night-mode-on" : "night-mode-off");
    html.classList.remove(isNightMode ? "night-mode-off" : "night-mode-on");
    saveTheme(isNightMode);
  }

  function handleChange (event) {
    isNightMode = event.detail.checked;
  }
</script>

<div class="night-mode">
  <label>
    <span class="text">{t('page.nightMode')}</span>
    <Switcher bind:checked={isNightMode} on:change={handleChange} noLabel></Switcher>
  </label>
</div>

<style lang="scss">
  .night-mode,
  label {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    user-select: none;
  }
  label {
    cursor: pointer;
  }
  .text {
    padding: 0 1rem;
    font-size: 1rem;
    line-height: 1;

    @media (max-width: 768px) {
      font-size: 0.9rem;
    }
  }
</style>
