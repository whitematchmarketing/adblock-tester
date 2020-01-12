import { normalize, schema } from "normalizr";
import { sections as importSections } from "./data";

const sectionsWithIds = importSections.map((section, scIndex) => {
  const sectionId = section.id ? section.id : `${scIndex}`;
  const services = section.services.map((service, svIndex) => {
    const checks = service.checks.map((check, chIndex) => ({
      ...check,
      sectionId,
      id: check.id ? check.id : `${scIndex}-${svIndex}-${chIndex}`,
    }));
    return { ...service, id: service.id ? service.id : `${scIndex}-${svIndex}`, checks };
  });
  return { ...section, id: sectionId, services };
});

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

const { entities } = normalize(sectionsWithIds, rootSchema);
export const sectionsHash = entities.sections;
export const servicesHash = entities.services;
export const checksHash = entities.checks;
