"use client";

import {
  FormEvent,
  useState,
  type InputHTMLAttributes,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
  type ReactNode,
} from "react";
import SectionBackdrop, { SECTION_COLORS } from "./SectionBackdrop";
import { BadgeCheck, Clock, Phone } from "lucide-react";
import FadeIn from "./FadeIn";
import { HOURS_DISPLAY, PHONE_DISPLAY, PHONE_HREF } from "@/lib/contact";

const SERVICES = [
  "Air Duct Cleaning",
  "Dryer Vent Cleaning",
  "Chimney Cleaning",
  "HVAC Maintenance",
] as const;

type FormState = {
  fullName: string;
  phone: string;
  email: string;
  cityZip: string;
  service: string;
  message: string;
  website: string;
};

const INITIAL: FormState = {
  fullName: "",
  phone: "",
  email: "",
  cityZip: "",
  service: "",
  message: "",
  website: "",
};

export default function QuoteForm() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );
  const [serverError, setServerError] = useState("");

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.fullName.trim()) next.fullName = "Full name is required.";
    if (!form.phone.trim() || form.phone.replace(/\D/g, "").length < 10) {
      next.phone = "Enter a valid phone number.";
    }
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Enter a valid email.";
    }
    if (!form.cityZip.trim()) next.cityZip = "City or ZIP is required.";
    if (!form.service) next.service = "Select a service.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formEl = e.currentTarget as HTMLFormElement;
    if (!validate()) {
      requestAnimationFrame(() =>
        formEl.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus()
      );
      return;
    }
    setStatus("submitting");
    setServerError("");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json().catch(() => null)) as
        | { ok?: boolean; error?: string }
        | null;
      if (!res.ok || !data?.ok) {
        setServerError(
          data?.error ||
            `Something went wrong. Please call us at ${PHONE_DISPLAY}.`
        );
        setStatus("error");
        return;
      }
      setStatus("success");
      setForm(INITIAL);
    } catch {
      setServerError(`Something went wrong. Please call us at ${PHONE_DISPLAY}.`);
      setStatus("error");
    }
  };

  const field = (
    id: keyof FormState,
    label: string,
    props: (
      | InputHTMLAttributes<HTMLInputElement>
      | TextareaHTMLAttributes<HTMLTextAreaElement>
      | SelectHTMLAttributes<HTMLSelectElement>
    ) & {
      as?: "input" | "textarea" | "select";
      children?: ReactNode;
    }
  ) => {
    const { as = "input", children, ...rest } = props;
    const a11y = {
      "aria-invalid": errors[id] ? true : undefined,
      "aria-describedby": errors[id] ? `${id}-error` : undefined,
    };
    const shared =
      "mt-1.5 min-h-11 w-full rounded-card border border-white/10 bg-black/40 px-4 py-3 text-base text-white outline-none transition placeholder:text-brand-muted/60 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue";
    return (
      <label className="block text-base font-medium text-white" htmlFor={id}>
        {label}
        {as === "textarea" ? (
          <textarea
            id={id}
            className={shared}
            value={form[id]}
            onChange={(e) => setForm((f) => ({ ...f, [id]: e.target.value }))}
            {...a11y}
            {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : as === "select" ? (
          <select
            id={id}
            className={shared}
            value={form[id]}
            onChange={(e) => setForm((f) => ({ ...f, [id]: e.target.value }))}
            {...a11y}
            {...(rest as SelectHTMLAttributes<HTMLSelectElement>)}
          >
            {children}
          </select>
        ) : (
          <input
            id={id}
            className={shared}
            value={form[id]}
            onChange={(e) => setForm((f) => ({ ...f, [id]: e.target.value }))}
            {...a11y}
            {...(rest as InputHTMLAttributes<HTMLInputElement>)}
          />
        )}
        {errors[id] && (
          <span id={`${id}-error`} className="mt-1.5 block text-base font-medium text-red-300">
            {errors[id]}
          </span>
        )}
      </label>
    );
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-brand-alt py-16 sm:py-20 lg:py-24"
    >
      <SectionBackdrop
        src="/images/backgrounds/quote.webp"
        imageClassName="object-[56%_center] md:object-[center_40%]"
        color={SECTION_COLORS.alt}
        fadeFrom={SECTION_COLORS.black}
        overlay={
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F1A]/55 via-[#0A0F1A]/45 to-[#0A0F1A] md:to-[#0A0F1A]/80" />
        }
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <h2 className="font-heading text-4xl font-extrabold italic tracking-tight sm:text-5xl">
            <span className="text-silver">Get Your </span>
            <span className="text-blue-gradient">Free Quote</span>
          </h2>
          <p className="mt-3 max-w-2xl text-brand-muted">
            Tell us what you need. We&apos;ll follow up fast with upfront pricing.
          </p>
        </FadeIn>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-5">
          <FadeIn className="lg:col-span-3">
            <form
              onSubmit={onSubmit}
              className="relative card-surface grid grid-cols-1 gap-4 !bg-[#0F1624]/85 p-6 backdrop-blur-sm sm:grid-cols-2 sm:p-8"
              noValidate
            >
              <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input
                  id="website"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.website}
                  onChange={(e) => setForm((f) => ({ ...f, website: e.target.value }))}
                />
              </div>
              {field("fullName", "Full Name", {
                placeholder: "Jane Doe",
                autoComplete: "name",
              })}
              {field("phone", "Phone", {
                placeholder: "(201) 555-0100",
                type: "tel",
                inputMode: "tel",
                autoComplete: "tel",
              })}
              {field("email", "Email", {
                placeholder: "you@email.com",
                type: "email",
                inputMode: "email",
                autoComplete: "email",
              })}
              {field("cityZip", "City/ZIP", {
                placeholder: "Newark, 07102",
                autoComplete: "postal-code",
              })}
              <div className="sm:col-span-2">
                {field("service", "Service", {
                  as: "select",
                  children: (
                    <>
                      <option value="">Select a service</option>
                      {SERVICES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </>
                  ),
                })}
              </div>
              <div className="sm:col-span-2">
                {field("message", "Message", {
                  as: "textarea",
                  rows: 4,
                  placeholder: "Anything we should know about your home or system?",
                })}
              </div>

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                  disabled={status === "submitting"}
                >
                  {status === "submitting" ? "Sending…" : "Request Free Quote"}
                </button>
                {status === "success" && (
                  <p className="mt-3 text-base font-medium text-brand-cyan" role="status">
                    Thanks — we received your request and will be in touch shortly.
                  </p>
                )}
                {status === "error" && (
                  <p className="mt-3 text-base font-medium text-red-300" role="alert">
                    {serverError ||
                      `Something went wrong. Please call us at ${PHONE_DISPLAY}.`}
                  </p>
                )}
              </div>
            </form>
          </FadeIn>

          <FadeIn delay={0.08} className="lg:col-span-2">
            <aside className="card-surface flex h-full flex-col gap-6 !bg-[#0F1624]/85 p-6 backdrop-blur-sm sm:p-8">
              <div className="inline-flex w-fit items-center gap-2 rounded-pill bg-blue-gradient px-3 py-1.5 text-sm font-bold uppercase tracking-wide text-white shadow-glow">
                <BadgeCheck className="h-4 w-4" aria-hidden="true" />
                Free estimates
              </div>

              <div>
                <h3 className="font-heading text-xl font-extrabold italic text-white">
                  Prefer to talk?
                </h3>
                <p className="mt-2 text-base text-brand-muted">
                  Call — we typically respond the same day.
                </p>
              </div>

              <a
                href={PHONE_HREF}
                className="flex min-h-11 items-center gap-3 text-white transition hover:text-brand-cyan"
              >
                <span className="rounded-full bg-white/5 p-2.5 text-brand-cyan">
                  <Phone className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-sm text-brand-muted">Phone</span>
                  <span className="font-semibold">{PHONE_DISPLAY}</span>
                </span>
              </a>

              <div className="flex items-start gap-3 text-white">
                <span className="rounded-full bg-white/5 p-2.5 text-brand-cyan">
                  <Clock className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <span className="block text-sm text-brand-muted">Working hours</span>
                  <span className="font-semibold">{HOURS_DISPLAY}</span>
                  <span className="mt-1 block text-base text-brand-muted">Sunday: closed</span>
                </div>
              </div>
            </aside>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
