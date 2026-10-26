import FadeIn from "./FadeIn";
import SectionBackdrop, { SECTION_COLORS } from "./SectionBackdrop";

const STEPS = [
  {
    number: "1",
    title: "Request a Quote",
    text: "Tell us about your home and the service you need — online or by phone.",
  },
  {
    number: "2",
    title: "Schedule a Visit",
    text: "Pick a time that works. We confirm details and arrive ready to work.",
  },
  {
    number: "3",
    title: "Professional Cleaning",
    text: "Our technicians deep-clean with commercial equipment and careful prep.",
  },
  {
    number: "4",
    title: "Final Inspection and Results",
    text: "We walk you through the results so you can see and feel the difference.",
  },
];

export default function Process() {
  return (
    <section id="process" className="relative overflow-hidden bg-black py-16 sm:py-20 lg:py-24">
      <SectionBackdrop color={SECTION_COLORS.black} fadeFrom={SECTION_COLORS.alt} />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <h2 className="font-heading text-4xl font-extrabold italic tracking-tight sm:text-5xl">
            <span className="text-silver">How It </span>
            <span className="text-blue-gradient">Works</span>
          </h2>
          <p className="mt-3 max-w-2xl text-brand-muted">
            Four clear steps from quote to cleaner air.
          </p>
        </FadeIn>

        <div className="relative mt-12">
          {/* Connecting blue line (desktop) */}
          <div
            className="pointer-events-none absolute left-0 right-0 top-8 hidden h-0.5 bg-blue-gradient lg:block"
            aria-hidden="true"
          />

          <ol className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, index) => (
              <li key={step.number}>
                <FadeIn delay={index * 0.06} className="relative flex flex-col items-start">
                  <span className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-blue-gradient font-heading text-2xl font-extrabold italic text-white shadow-glow">
                    {step.number}
                  </span>
                  <h3 className="mt-4 font-heading text-xl font-extrabold italic text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-brand-muted">
                    {step.text}
                  </p>
                </FadeIn>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
