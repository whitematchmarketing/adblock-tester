<script>
  import { onMount } from 'svelte';
  import { EStatus, loadScript, fetchMediaSize, checkSize, checkEval, proveSize } from './model';
  import { growingInterval } from './utils'
  import { t } from "./i18n";

  export let check;
  let includeElement;
  let statusText = ""
  let nameText = ""
  let infoText = ""

  $: {
    statusText = t(`statuses.${check.type}.${check.status}`) || t(`statuses.${check.status}`);
    nameText = t(`checkNames.${check.type}`);
    infoText = t(`statusInfo.${check.type}.${check.status}`) || t(`statusInfo.${check.status}`);
  }
  const proveSizeFactory = (proved) => () => proveSize({ check, proved, element: includeElement });
  onMount(() => {
    if (check.type === "localLoading") fetchMediaSize(check);
    if (check.type === "script") loadScript(check);
    if (check.type === "size") growingInterval(() => checkSize({ check, element: includeElement}));
    if (check.type === "eval") growingInterval(() => checkEval(check));
  })
</script>

<li>
  <span class="result">
    <span class="name">{nameText}:&nbsp;</span>
    <b class="status" data-status={check.status}>{statusText}</b>
    {#if infoText}
      <small class="infoText">({infoText})</small>
    {/if}
  </span>
  {#if check.include && check.type === "size"}
    {#if check.status === EStatus.likelyUnblocked}
        <div class="warning">
          Рекламный блок не пустой.
          К сожалению, мы не можем определить показывается там реклама или это пустой блок от вашего блокировщика.
          Для точного финального результата, пожалуйста, уточните что вы видите.
        </div>
        <div class="buttons">
          <button type="button" class="button accept" on:click={proveSizeFactory(true)}>Пустой блок</button>
          <button type="button" class="button reject" on:click={proveSizeFactory(false)}>Рекламу</button>
        </div>
      {/if}
      <div></div>
      <div class="includeWrapper" class:visuallyHidden={check.status === EStatus.blocked}>
        <div bind:this={includeElement} class="include">
          {@html check.include}
        </div>
      </div>
  {:else if check.include}
    {@html check.include}
  {/if}
</li>

<style lang="scss">
.includeWrapper {
  display: inline-block;
  vertical-align: top;
  max-width: 100%;
  margin-top: 1rem;
  padding: 1rem;
  background: -webkit-repeating-linear-gradient(
    315deg,
    var(--little-shadow),
    var(--little-shadow) 10px,
    transparent 10px,
    transparent 20px
  );
  background: repeating-linear-gradient(
    135deg,
    var(--little-shadow),
    var(--little-shadow) 10px,
    transparent 10px,
    transparent 20px
  );
}
.include {
  overflow: hidden;
}
.warning {
  margin-top: 1rem;
  padding-left: 1rem;
  max-width: 100%;
  // font-size: 0.85rem;
}
.buttons {
  display: flex;
  margin-top: 1rem;
}
.button {
  position: relative;
  padding: .5rem 1.5rem;
  border-radius: .2rem;
  font: inherit;
  border: 0;
  cursor: pointer;
  line-height: 1.1;
  letter-spacing: .1px;
  color: var(--bg-color);
  overflow: hidden;
  background: transparent;
  font-weight: 500;
  opacity: 0.85;

  &.accept {
    font-weight: 600;
  }

  &:hover,
  &:focus,
  &:active {
    opacity: 1;
  }
  &:active {
    transform: translateY(.1rem);
  }

  & + & {
    margin-left: 1rem;
  }

  &.accept {
    background-color: var(--color-green);
  }
  &.reject {
    background-color: var(--color-red);
  }
}
.status {
  &[data-status="pending"] {
    color: var(--color-orange);
  }
  &[data-status="unknown"] {
    color: var(--color-pumpkin);
  }
  &[data-status="likelyBlocked"],
  &[data-status="blocked"] {
    color: var(--color-green);
  }
  &[data-status="likelyUnblocked"],
  &[data-status="unblocked"] {
    color: var(--color-red);
  }
}

li {
  transform: translateX(0) !important;

  & + & {
    margin-top: 0.25rem;
  }

  @media (max-width: 768px) {
    margin-bottom: 0.5em;
  }
}

.infoText {
  white-space: normal;
  display: inline-block;
  overflow: hidden;
  max-width: 100%;
  vertical-align: middle;
  text-overflow: ellipsis;
}

</style>
