export type BeforeAfterService =
  | "Air Duct"
  | "Dryer Vent"
  | "Chimney"
  | "HVAC";

export type BeforeAfterProject = {
  id: string;
  title: string;
  service: BeforeAfterService;
  /** Omit until the photo exists; the card shows an "Add photo" placeholder. */
  beforeSrc?: string;
  afterSrc?: string;
};

/**
 * Before/after gallery projects.
 *
 * To add a new project:
 * 1. Save job-N-before.webp (dirty) and job-N-after.webp (clean), max 1200px wide, into a
 *    service subfolder such as /public/images/before-after/dryer-vent/
 * 2. Append an entry below with a unique id, title, service, and those paths
 * 3. The gallery filter tabs will pick it up automatically
 */
export const beforeAfterProjects: BeforeAfterProject[] = [
  {
    id: "job-1",
    title: "Whole-Home Duct Refresh — Paramus",
    service: "Air Duct",
    beforeSrc: "/images/before-after/air-duct/job-1-before.webp",
    afterSrc: "/images/before-after/air-duct/job-1-after.webp",
  },
  {
    id: "job-2",
    title: "Lint-Clogged Dryer Line — Jersey City",
    service: "Dryer Vent",
    beforeSrc: "/images/before-after/dryer-vent/job-2-before.webp",
    afterSrc: "/images/before-after/dryer-vent/job-2-after.webp",
  },
  {
    id: "job-3",
    title: "Creosote Cleanup — Princeton",
    service: "Chimney",
  },
  {
    id: "job-4",
    title: "Seasonal HVAC Tune-Up — Edison",
    service: "HVAC",
  },
  {
    id: "job-5",
    title: "Pet-Dander Duct Deep Clean — Newark",
    service: "Air Duct",
    beforeSrc: "/images/before-after/air-duct/job-5-before.webp",
    afterSrc: "/images/before-after/air-duct/job-5-after.webp",
  },
  {
    id: "job-6",
    title: "Exterior Exhaust Restore — Toms River",
    service: "Dryer Vent",
  },
];
