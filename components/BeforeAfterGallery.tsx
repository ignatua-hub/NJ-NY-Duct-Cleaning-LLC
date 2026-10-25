"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  beforeAfterProjects,
  type BeforeAfterService,
} from "@/data/beforeAfter";
import BeforeAfterSlider from "./BeforeAfterSlider";
import FadeIn from "./FadeIn";

const FILTERS: Array<"All" | BeforeAfterService> = [
  "All",
  "Air Duct",
  "Dryer Vent",
  "Chimney",
  "HVAC",
];

export default function BeforeAfterGallery() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");

  const projects = useMemo(() => {
    if (filter === "All") return beforeAfterProjects;
    return beforeAfterProjects.filter((p) => p.service === filter);
  }, [filter]);

  return (
    <section id="before-after" className="bg-black py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <h2 className="font-heading text-4xl font-extrabold italic tracking-tight sm:text-5xl">
            <span className="text-silver">See the </span>
            <span className="text-blue-gradient">Difference</span>
          </h2>
          <p className="mt-3 max-w-2xl text-brand-muted">
            Real jobs. Real results. Drag the slider to compare.
          </p>
        </FadeIn>

        <div
          className="mt-8 flex flex-wrap gap-2"
          role="tablist"
          aria-label="Filter by service"
        >
          {FILTERS.map((tab) => {
            const active = filter === tab;
            return (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(tab)}
                className={`inline-flex min-h-11 items-center rounded-pill px-4 text-sm font-semibold transition ${
                  active
                    ? "bg-blue-gradient text-white shadow-glow"
                    : "border border-white/15 text-brand-muted hover:border-white/30 hover:text-white"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        <motion.div
          layout
          className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {projects.map((project, index) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
                className="card-surface overflow-hidden p-3 transition hover:shadow-glow sm:p-4"
              >
                <BeforeAfterSlider
                  beforeSrc={project.beforeSrc}
                  afterSrc={project.afterSrc}
                  title={project.title}
                  priority={index === 0}
                />
                <div className="mt-3 px-1 pb-1">
                  <h3 className="font-heading text-lg font-extrabold italic text-white">
                    {project.title}
                  </h3>
                  <span className="mt-1 inline-block rounded-pill border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs font-medium text-brand-cyan">
                    {project.service}
                  </span>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
