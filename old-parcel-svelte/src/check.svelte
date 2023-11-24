<script>
  import { onMount } from "svelte";
  import { EStatus, loadScript, fetchMediaSize, checkSize, checkEval, proveSize } from "./model";
  import { growingInterval } from "./utils";
  import { t } from "./i18n";

  export let check;
  let includeElement;
  // turned off temporary at least to check the google ads corrent way
  let includeVisible = false;
  let statusText = "";
  let nameText = "";
  let infoText = "";

  $: {
    includeVisible =
      check.include &&
      check.type === "size" &&
      check.status === EStatus.likelyBlocked &&
      check.status === EStatus.likelyUnblocked &&
      check.status === EStatus.unblocked;
    statusText = t(`statuses.${check.type}.${check.status}`) || t(`statuses.${check.status}`);
    nameText = t(`checkNames.${check.type}`);
    infoText = t(`statusInfo.${check.type}.${check.status}`) || t(`statusInfo.${check.status}`);
  }
  const proveSizeFactory = (proved) => () => proveSize({ check, proved, element: includeElement });
  onMount(() => {
    if (check.type === "localLoading") fetchMediaSize(check);
    if (check.type === "script") loadScript(check);
    if (check.type === "size") growingInterval(() => checkSize({ check, element: includeElement }));
    if (check.type === "eval") growingInterval(() => checkEval(check));
  });
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
        {t("sizeQuestion.description")}
      </div>
      <div class="buttons">
        <button type="button" class="button accept" on:click={proveSizeFactory(true)}>
          {t("sizeQuestion.approve")}
        </button>
        <button type="button" class="button reject" on:click={proveSizeFactory(false)}>
          {t("sizeQuestion.reject")}
        </button>
      </div>
    {/if}
    <div />
    <div class="includeWrapper">
      <div bind:this={includeElement} class="include">
        {@html check.include}
      </div>
    </div>
  {:else if check.include}
    {@html check.include}
  {/if}
</li>

<style>
  .includeWrapper {
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
  }
  .warning {
    margin-top: 1rem;
    padding-left: 1rem;
    max-width: 100%;
  }
  .buttons {
    display: flex;
    margin-top: 1rem;
  }
  .button {
    position: relative;
    padding: 0.5rem 1.5rem;
    border-radius: 0.2rem;
    font: inherit;
    border: 0;
    cursor: pointer;
    line-height: 1.1;
    letter-spacing: 0.1px;
    color: var(--bg-color);
    overflow: hidden;
    background: transparent;
    font-weight: 500;
    opacity: 0.85;
  }

  .button.accept {
    font-weight: 600;
  }

  .button:hover,
  .button:focus,
  .button:active {
    opacity: 1;
  }
  .button:active {
    transform: translateY(0.1rem);
  }

  .button + .button {
    margin-left: 1rem;
  }

  .button.accept {
    background-color: var(--color-green);
  }
  .button.reject {
    background-color: var(--color-red);
  }
  .status[data-status="pending"] {
    color: var(--color-orange);
  }
  .status[data-status="unknown"] {
    color: var(--color-pumpkin);
  }
  .status[data-status="likelyBlocked"],
  .status[data-status="blocked"] {
    color: var(--color-green);
  }
  .status[data-status="likelyUnblocked"],
  .status[data-status="unblocked"] {
    color: var(--color-red);
  }

  li {
    transform: translateX(0) !important;
  }

  li + li {
    margin-top: 0.25rem;
  }

  @media (max-width: 768px) {
    li {
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
