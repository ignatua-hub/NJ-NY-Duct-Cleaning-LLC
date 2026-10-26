export type BeforeAfterService =
  | "Air Duct"
  | "Dryer Vent"
  | "Chimney"
  | "HVAC";

export type BeforeAfterProject = {
  id: string;
  title: string;
  service: BeforeAfterService;
  beforeSrc: string;
  afterSrc: string;
};

/**
 * Before/after gallery projects.
 *
 * To add a new project:
 * 1. Drop job-N-before.jpg (dirty) and job-N-after.jpg (clean) into /public/images/before-after/
 *    or a service subfolder such as /public/images/before-after/dryer-vent/
 * 2. Append an entry below with a unique id, title, service, and those paths
 * 3. The gallery filter tabs will pick it up automatically
 */
export const beforeAfterProjects: BeforeAfterProject[] = [
  {
    id: "job-1",
    title: "Whole-Home Duct Refresh — Paramus",
    service: "Air Duct",
    beforeSrc: "/images/before-after/air-duct/job-1-before.jpg",
    afterSrc: "/images/before-after/air-duct/job-1-after.jpg",
  },
  {
    id: "job-2",
    title: "Lint-Clogged Dryer Line — Jersey City",
    service: "Dryer Vent",
    beforeSrc: "/images/before-after/dryer-vent/job-2-before.jpg",
    afterSrc: "/images/before-after/dryer-vent/job-2-after.jpg",
  },
  {
    id: "job-3",
    title: "Creosote Cleanup — Princeton",
    service: "Chimney",
    beforeSrc: "/images/before-after/job-3-before.jpg",
    afterSrc: "/images/before-after/job-3-after.jpg",
  },
  {
    id: "job-4",
    title: "Seasonal HVAC Tune-Up — Edison",
    service: "HVAC",
    beforeSrc: "/images/before-after/job-4-before.jpg",
    afterSrc: "/images/before-after/job-4-after.jpg",
  },
  {
    id: "job-5",
    title: "Pet-Dander Duct Deep Clean — Newark",
    service: "Air Duct",
    beforeSrc: "/images/before-after/job-5-before.jpg",
    afterSrc: "/images/before-after/job-5-after.jpg",
  },
  {
    id: "job-6",
    title: "Exterior Exhaust Restore — Toms River",
    service: "Dryer Vent",
    beforeSrc: "/images/before-after/job-6-before.jpg",
    afterSrc: "/images/before-after/job-6-after.jpg",
  },
];
