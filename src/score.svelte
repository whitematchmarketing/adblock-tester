<script>
  import { t } from './i18n';
  import { activeServicesCount, activeChecksCount, score } from './model';
  let color = "";
  $: {
    if ($score >= 75) color = "green";
    if ($score < 75) color = "orange";
    if ($score < 50) color = "pumpkin";
    if ($score < 25) color = "red";
  }
</script>

<h3 class="final-score" data-color={color}>
  <div class="final-score-text">
    <b class="final-score-value">{$score}</b>
    <span class="final-score-pre-value-text">{t("score.points", $score, false)} {t("score.outOf")} 100</span>
  </div>
  <span class="final-score-info">
    ({t("score.services", $activeServicesCount)}, {t("score.checks", $activeChecksCount)})
  </span>
</h3>

<style lang="scss">
.final-score {
  position: absolute;
  position: sticky;
  bottom: 0;
  z-index: 200;
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  margin: 0;
  padding: 0.5rem var(--body-hmargin);
  background-color: var(--color-green);
  box-shadow: 0 0 5px var(--small-shadow);
  color: var(--bg-color);
  text-shadow: 0 0 4px var(--small-shadow);
  font-weight: normal;
  transition: background-color var(--speed-quick) ease, color var(--speed-quick) ease,
    text-shadow var(--speed-quick) ease;

  @media (min-width: 768px) {
    padding: 0.75rem 2rem;
  }
  .night-mode-on & {
    text-shadow: 0 0 4px rgba(255, 255, 255, 0.15);
  }
  &[data-color="red"] {
    background-color: var(--color-red);
  }
  &[data-color="pumpkin"] {
    background-color: var(--color-pumpkin);
  }
  &[data-color="orange"] {
    background-color: var(--color-orange);
  }
  &[data-color="green"] {
    background-color: var(--color-green);
  }
}
.final-score-info {
  @media (min-width: 768px) {
    margin-left: auto;
  }
}
.final-score-pre-value-text {
  margin-right: 0.5rem;
  font-size: 0.8rem;
  font-size: 1rem;
}
.final-score-info {
  display: block;
  font-size: 0.8rem;
}
</style>
