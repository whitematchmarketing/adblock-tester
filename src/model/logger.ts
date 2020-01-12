import { app, log } from "./store";

app.onCreateStore(store => {
  store.updates.watch((...args) => log(`📦${store.shortName}`, ...args));
});
app.onCreateEvent(event => {
  event.watch((...args) => log(`✨${event.shortName}`, ...args));
});
app.onCreateEffect(effect => {
  effect.watch((...args) => log(`✨start ${effect.shortName}`, ...args));
  effect.done.watch((...args) => log(`✨done ${effect.shortName}`, ...args));
  effect.fail.watch((...args) => log(`✨fail ${effect.shortName}`, ...args));
  effect.pending.watch((...args) => log(`✨pending ${effect.shortName}`, ...args));
});
