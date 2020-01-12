<script>
  import Switcher from './switcher'
  import Badge from './badge'
  import { t } from "./i18n";
  import { changeSectionActive, changeSectionVisible, changeServiceActive, changeServiceVisible } from './model';

  export let section;
  export let service;
  $: data = section || service;
  $: id = data.id;

  const handleChange = (property) => (value) =>  {
    const activeAction = section ? changeSectionActive : changeServiceActive;
    const visibleAction = section ? changeSectionVisible : changeServiceVisible;
    if (property === "active") activeAction({ id, value: !data.active });
    if (property === "visible") visibleAction({ id, value: !data.visible });
  }
</script>

<div class="block" class:section class:service class:inactive={!data.active} >
  <div class="title">
    <div class="switcher">
      <Switcher id={id} small={!!service} checked={data.active} on:change={handleChange("active")}></Switcher>
    </div>

    {#if section}
      <h2 class="heading"><label for={id}>{t(data.titleKey)}</label></h2>
    {:else}
      <h4 class="heading"><label for={id}>{t(data.titleKey)}</label></h4>
    {/if}

    {#if section}
      <div class="badge">
        <Badge priority={data.priority}></Badge>
      </div>
    {/if}

    <button type="button" class="toggler text-small" on:click={handleChange("visible")}>
      { data.visible ? t("actions.close") : t("actions.open")}
    </button>
  </div>
  <div class="content" class:visuallyHidden={!data.visible}>
      {#if t(data.descriptionKey)}
        <p class="description">{t(data.descriptionKey)}</p>
      {/if}
    <slot></slot>
  </div>
</div>

<style lang="scss">
.section {
  background: #fff;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.05);
  margin-bottom: 1rem;
}
:global(.night-mode-on) .section {
    background: rgba(0, 0, 0, 0.1);
}
.block {
  padding: 1.5rem 2rem;
  transition: background var(--speed-quick) ease, opacity var(--speed-quick) ease;

  &.inactive {
    opacity: 0.5;
  }
  @media (max-width: 768px) {
    padding-right: var(--body-hmargin);
    padding-left: var(--body-hmargin);
  }
}
.service {
  margin-top: 2rem;
  padding-left: 2rem;
  padding-top: 0;
  padding-right: 0;
  padding-bottom: 0;

  @media (max-width: 768px) {
    padding-left: 1rem;
  }
}
.description {
  margin-bottom: 1rem;
}
.content {
  margin-top: 1rem;

  &.inactive {
      pointer-events: none;
  }
}

.title {
  display: flex;
  align-items: flex-end;
  flex-wrap: wrap;
  margin-top: -1rem;

  @media (max-width: 768px) {
    align-items: center;
  }
}

.service .title {
  flex-wrap: nowrap;
}

.heading {
  margin: 0;
  line-height: 1;

  label {
    user-select: none;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    order: 1;
    width: 100%;
  }
}

h2.heading {
  line-height: 0.8;
}

.service .heading {
  margin-bottom: 0;
}

.section .switcher {
  @media (max-width: 768px) {
    order: 2;
  }
}
.service .switcher {
  @media (max-width: 768px) {
    order: initial;
  }
}

.badge {
  font-size: 0;
  @media (max-width: 768px) {
    order: 3;
  }
}

.toggler {
  line-height: 1.3;
  color: inherit;
  margin: 0;
  padding: 0;
  border: 0;
  border-bottom: 1px dashed;
  background: transparent;
  font-size: 0.8em;
  cursor: pointer;
  transition: color var(--speed-quick) ease, opacity var(--speed-quick) ease;

  &:hover,
  &:active {
    color: var(--color-orange);
    opacity: 1;
  }

  @media (max-width: 768px) {
    order: 4;
  }
}

.switcher,
.badge,
.heading {
  margin-right: 1rem;
}
.switcher,
.badge,
.heading,
.toggler {
  margin-top: 1rem;
}
</style>
