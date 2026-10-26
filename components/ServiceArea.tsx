import fs from "fs";
import path from "path";
import Image from "next/image";
import FadeIn from "./FadeIn";
import NewJerseyMap from "./NewJerseyMap";
import ServiceAreaInteractive from "./ServiceAreaInteractive";

const BACKGROUND_SRC = "/images/backgrounds/bg-service-area.jpg";

function hasBackground() {
  return fs.existsSync(path.join(process.cwd(), "public", BACKGROUND_SRC));
}

export default function ServiceArea() {
  const showBackground = hasBackground();

  return (
    <section
      id="service-area"
      className="relative overflow-hidden bg-brand-alt py-16 sm:py-20 lg:py-24"
    >
      {showBackground && (
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <Image src={BACKGROUND_SRC} alt="" fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-black/80" />
        </div>
      )}

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-x-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <FadeIn className="lg:col-start-1 lg:row-start-1">
          <h2 className="font-heading text-4xl font-extrabold italic tracking-tight sm:text-5xl">
            <span className="text-silver">Proudly Serving All of </span>
            <span className="text-blue-gradient">New Jersey</span>
          </h2>
          <p className="mt-3 max-w-2xl text-brand-muted">
            From Bergen to Cape May, our crews are on the road every day.
          </p>
        </FadeIn>

        <FadeIn
          delay={0.05}
          className="mt-8 flex justify-center lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mt-0 lg:items-center"
        >
          <NewJerseyMap />
        </FadeIn>

        <FadeIn delay={0.08} className="lg:col-start-1 lg:row-start-2">
          <ServiceAreaInteractive />
        </FadeIn>
      </div>
    </section>
  );
}
