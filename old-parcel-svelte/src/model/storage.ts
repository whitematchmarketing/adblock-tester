import cloneDeep from "lodash/cloneDeep";

export const saveActiveAndVisible = <T>(servicesOrSections: T) => {
  Object.entries(servicesOrSections).forEach(([key, serviceOrSection]) => {
    localStorage.setItem(`${key}:visible`, serviceOrSection.visible + "");
    localStorage.setItem(`${key}:active`, serviceOrSection.active + "");
  });
};

export const syncActiveAndVisible = <T>(servicesOrSections: T): T => {
  const copied = cloneDeep(servicesOrSections);
  Object.entries(copied).forEach(([key, serviceOrSection]) => {
    const visibleStr = localStorage.getItem(`${key}:visible`);
    const activeStr = localStorage.getItem(`${key}:active`);

    if (visibleStr) serviceOrSection.visible = visibleStr === "true";
    if (activeStr) serviceOrSection.active = activeStr === "true";
  });
  return copied;
};
