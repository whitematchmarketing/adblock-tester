import { normalize as libNormalize, schema } from "normalizr";

const addSectionIds = (data) => {
  console.info(`🔥 data`, data);
  return data.map((section) => ({
    ...section,
    services: section.services.map((service) => ({
      ...service,
      checks: service.checks.map((check) => ({ ...check, sectionId: section.id })),
    })),
  }));
};
export const normalize = (data) => {
  console.info(`🔥 data`, data);

  // Define a users schema
  const checksSchema = new schema.Entity("checks");

  // Define your comments schema
  const servicesSchema = new schema.Entity("services", {
    checks: [checksSchema],
  });

  // Define your article
  const sectionsSchema = new schema.Entity("sections", {
    services: [servicesSchema],
  });

  const rootSchema = new schema.Array(sectionsSchema);

  const { entities } = libNormalize(addSectionIds(data), rootSchema);

  return {
    sectionsHash: entities.sections,
    servicesHash: entities.services,
    checksHash: entities.checks,
  };
};
