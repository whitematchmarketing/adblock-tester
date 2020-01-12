<script>
  import { t } from './i18n'
  export let priority;
</script>

<span class="badge" data-priority={priority}>
  {t(`priorities.${priority}`)}
</span>

<style lang="scss">
.badge {
  display: inline-block;
  padding: 0.2em 0.5em 0.25em;
  border-radius: 4px;
  background-color: var(--color-gray);
  color: var(--bg-color);
  vertical-align: middle;
  white-space: nowrap;
  font-weight: normal;
  font-weight: bold;
  font-size: 0.8rem;
  line-height: 1;
  opacity: 1;
  transition: color var(--speed-quick) ease, background-color var(--speed-quick) ease;

  &[data-priority="critical"] {
    background-color: var(--color-red);
  }
  &[data-priority="high"] {
    background-color: var(--color-pumpkin);
  }
  &[data-priority="medium"] {
    background-color: var(--color-orange);
  }
  &[data-priority="low"] {
    background-color: var(--color-green);
  }
  &[data-priority="trivial"] {
    background-color: var(--color-blue);
  }
}

</style>
