"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, MapPin, Phone } from "lucide-react";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/contact";

const COUNTIES = [
  "Bergen",
  "Hudson",
  "Essex",
  "Passaic",
  "Morris",
  "Union",
  "Middlesex",
  "Monmouth",
  "Ocean",
  "Mercer",
  "Somerset",
  "Camden",
  "Burlington",
  "Atlantic",
  "Cape May",
  "Gloucester",
  "Hunterdon",
  "Warren",
  "Sussex",
  "Cumberland",
  "Salem",
];

const NJ_ZIP = /^0[78]\d{3}$/;

export default function ServiceAreaInteractive() {
  const [activeCounty, setActiveCounty] = useState<string | null>(null);
  const [zip, setZip] = useState("");
  const [result, setResult] = useState<"covered" | "unknown" | null>(null);

  const onCheck = (e: FormEvent) => {
    e.preventDefault();
    setResult(NJ_ZIP.test(zip.trim()) ? "covered" : "unknown");
  };

  return (
    <>
      <ul className="mt-8 flex flex-wrap gap-2.5" aria-label="New Jersey counties we serve">
        {COUNTIES.map((county) => {
          const active = activeCounty === county;
          return (
            <li key={county}>
              <button
                type="button"
                aria-pressed={active}
                onClick={() => setActiveCounty(active ? null : county)}
                className={`inline-flex min-h-11 items-center rounded-pill border px-4 text-base font-medium transition hover:border-transparent hover:bg-blue-gradient hover:text-white hover:shadow-glow ${
                  active
                    ? "border-transparent bg-blue-gradient text-white shadow-glow"
                    : "border-white/10 bg-[#0F1624] text-white/90"
                }`}
              >
                {county}
              </button>
            </li>
          );
        })}
      </ul>

      <form onSubmit={onCheck} className="mt-8 max-w-xl" noValidate>
        <label htmlFor="zip-check" className="block text-base font-medium text-white">
          Check your ZIP code
        </label>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <MapPin
              className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-cyan"
              aria-hidden="true"
            />
            <input
              id="zip-check"
              inputMode="numeric"
              autoComplete="postal-code"
              maxLength={5}
              placeholder="Enter your ZIP code"
              value={zip}
              onChange={(e) => {
                setZip(e.target.value.replace(/\D/g, ""));
                setResult(null);
              }}
              className="min-h-11 w-full rounded-pill border border-white/10 bg-black/40 py-3 pl-11 pr-4 text-base text-white outline-none transition placeholder:text-brand-muted/60 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue"
            />
          </div>
          <button type="submit" className="btn-primary min-h-11 whitespace-nowrap">
            Check availability
          </button>
        </div>

        <div aria-live="polite">
          {result === "covered" && (
            <div className="mt-4 rounded-card border border-emerald-400/30 bg-emerald-500/10 p-4">
              <p className="flex items-start gap-2 text-base font-medium text-emerald-300">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
                Great news - we serve your area! Call {PHONE_DISPLAY} or request a free quote.
              </p>
              <a href="#contact" className="btn-primary mt-3 min-h-11 text-base">
                Get a Free Quote
              </a>
            </div>
          )}
          {result === "unknown" && (
            <p className="mt-4 rounded-card border border-white/10 bg-white/5 p-4 text-base text-brand-muted">
              We may not cover this ZIP code yet. Call us and we will check.
            </p>
          )}
        </div>
      </form>

      <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-base text-brand-muted">
          Don&apos;t see your county? Call us - we may still be able to help.
        </p>
        <a href={PHONE_HREF} className="btn-secondary min-h-11 shrink-0 gap-2">
          <Phone className="h-4 w-4" aria-hidden="true" />
          Call Now
        </a>
      </div>
    </>
  );
}
