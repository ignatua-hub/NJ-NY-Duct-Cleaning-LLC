"use client";

import { Flame, AirVent, Wind, Wrench } from "lucide-react";
import FadeIn from "./FadeIn";

const SERVICES = [
  {
    id: "air-duct",
    icon: Wind,
    title: "Air Duct Cleaning",
    tagline: "Fresh air starts inside your walls.",
    text: "Over time, your ducts collect dust, pet dander, pollen, mold spores and construction debris — and every time your system runs, it pushes that into the air your family breathes. Our professional duct cleaning removes years of buildup, so you get cleaner air, fewer allergy symptoms, a fresher home and an HVAC system that runs more efficiently.",
    bullets: [
      "Whole-home deep cleaning",
      "Powerful negative-pressure vacuum system",
      "Vent, register and return cleaning",
      "Allergen and odor reduction",
    ],
  },
  {
    id: "dryer-vent",
    icon: AirVent,
    title: "Dryer Vent Cleaning",
    tagline: "Faster drying. Lower bills. Safer home.",
    text: "A clogged dryer vent is one of the most common causes of house fires and the most common reason clothes take two cycles to dry. We clear lint from the entire vent line — from the dryer to the exterior exhaust — restoring airflow, cutting drying time and energy costs, and giving you real peace of mind.",
    bullets: [
      "Full vent line lint removal",
      "Exterior exhaust cleaning",
      "Airflow test before and after",
      "Fire-risk reduction",
    ],
  },
  {
    id: "chimney",
    icon: Flame,
    title: "Chimney Cleaning",
    tagline: "Warm nights, worry-free.",
    text: "Creosote and soot build up inside your chimney every time you light a fire, and left alone they become a serious fire and carbon monoxide hazard. Our certified technicians clean your flue thoroughly, check for blockages and damage, and make sure your fireplace is ready for the season — safe, clean and efficient.",
    bullets: [
      "Soot and creosote removal",
      "Flue and damper inspection",
      "Blockage and nest removal",
      "Clean, dust-controlled work",
    ],
  },
  {
    id: "hvac",
    icon: Wrench,
    title: "HVAC Maintenance",
    tagline: "Keep comfort running all year.",
    text: "A well-maintained system works less, lasts longer and costs less to run. Our maintenance visits cover inspection, cleaning and performance checks so small problems are caught before they become expensive breakdowns — keeping your home comfortable in every New Jersey season.",
    bullets: [
      "Full system inspection",
      "Filter and coil care",
      "Performance and airflow check",
      "Seasonal tune-up",
    ],
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-brand-alt py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <h2 className="font-heading text-4xl font-extrabold italic tracking-tight sm:text-5xl">
            <span className="text-silver">Our </span>
            <span className="text-blue-gradient">Services</span>
          </h2>
          <p className="mt-3 max-w-2xl text-brand-muted">
            Professional cleaning and maintenance for healthier air and a safer home
            across New Jersey.
          </p>
        </FadeIn>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <FadeIn key={service.id} delay={index * 0.05}>
                <article className="card-surface group h-full p-6 transition hover:shadow-glow sm:p-8">
                  <div className="mb-4 inline-flex rounded-full bg-blue-gradient p-3 text-white shadow-glow">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="font-heading text-2xl font-extrabold italic text-white">
                    {service.title}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-brand-cyan">{service.tagline}</p>
                  <p className="mt-4 text-base leading-relaxed text-brand-muted">{service.text}</p>
                  <ul className="mt-5 space-y-2">
                    {service.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-2 text-base text-white/90"
                      >
                        <span
                          className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-cyan"
                          aria-hidden="true"
                        />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#contact"
                    className="mt-4 inline-flex min-h-11 items-center text-base font-semibold text-brand-blue transition hover:text-brand-cyan"
                  >
                    Get a Quote →
                  </a>
                </article>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
