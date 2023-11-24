<script>
  import Block from "./block";
  import Check from "./check";
  import Score from "./score";
  import { sections, services, checks } from "./model";
  $: sectionsArr = Object.values($sections);
</script>

<div class="section-container">
  {#each sectionsArr as section}
    <Block {section}>
      {#each section.services as serviceId, i}
        <Block service={$services[serviceId]}>
          <ol class="check-list">
            {#each $services[serviceId].checks as checkId}
              <Check check={$checks[checkId]} />
            {/each}
          </ol>
        </Block>
      {/each}
    </Block>
  {/each}
  <Score />
</div>

<style>
  .section-container {
    margin-top: 3rem;
  }
  @media (max-width: 768px) {
    .section-container {
      margin-right: calc(var(--body-hmargin) * -1);
      margin-left: calc(var(--body-hmargin) * -1);
    }
  }
  @media (min-width: 768px) {
    .section-container {
      max-width: 100%;
      display: inline-flex;
      flex-direction: column;
    }
  }

  .check-list {
    padding-left: 0;
    list-style-type: none;
    margin: 0;
  }
</style>
