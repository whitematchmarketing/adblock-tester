import { combine, createDomain } from "effector";
import flatten from "lodash/flatten";

import { syncActiveAndVisible } from "./storage";
import { logger } from "../utils";
import { checksHash, sectionsHash, servicesHash } from "./data";
import {
  EPriority,
  EStatus,
  ICheck,
  ISection,
  IService,
  statusWeights,
  typeWeights,
} from "./types";

export const log = logger("🏠 app");
export const app = createDomain("app");

interface IHash<T> {
  [id: string]: T;
}
export const sections = app.createStore<IHash<ISection>>(syncActiveAndVisible(sectionsHash), {
  name: "sections",
});
export const services = app.createStore<IHash<IService>>(syncActiveAndVisible(servicesHash), {
  name: "services",
});
export const checks = app.createStore<IHash<ICheck>>(checksHash, {
  name: "checks",
});

// computed
const sectionsArr = sections.map(Object.values);
const servicesArr = services.map(Object.values);
const checksArr = checks.map(Object.values);
const activeSectionsArr = sectionsArr.map(sectionsArr =>
  sectionsArr.filter(({ active }) => active),
);
const activeServicesArr = combine(activeSectionsArr, servicesArr, (sectionsArr, servicesArrr) => {
  const servicesIds = flatten(sectionsArr.map(({ services }) => services));
  const activeServices = servicesArrr.filter(
    ({ id, active }) => servicesIds.includes(id) && active,
  );
  return activeServices;
});
const activeChecksArr = combine(activeServicesArr, checksArr, (servicesArr, checksArr) => {
  const checksIds = flatten(servicesArr.map(({ checks }) => checks));
  const activeChecs = checksArr.filter(({ id }) => checksIds.includes(id));
  return activeChecs;
});

export const activeServicesCount = activeServicesArr.map(services => services.length);
export const activeChecksCount = activeChecksArr.map(checks => checks.length);
export const score = activeChecksArr.map(checks => {
  let maxScore = 0,
    score = 0;
  const checksArr = Object.values(checks);
  const allSections = sections.getState();

  checksArr.forEach(check => {
    const sectionPriorityValue = EPriority[allSections[check.sectionId].priority];
    const typeMultiplicator = typeWeights[check.type];
    if (check.status !== EStatus.unknown) {
      maxScore += sectionPriorityValue * typeMultiplicator;
      score += sectionPriorityValue * typeMultiplicator * statusWeights[check.status];
    }
  });

  log("score", { score, maxScore });
  const result = Math.round((score / maxScore) * 100);
  return isNaN(result) ? "Error" : result;
});
