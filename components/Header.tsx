"use client";

import { useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import BrandLogo from "./BrandLogo";

const NAV_LINKS = [
  { href: "#services", label: "Services" },
  { href: "#before-after", label: "Before & After" },
  { href: "#why-us", label: "Why Us" },
  { href: "#process", label: "Process" },
  { href: "#service-area", label: "Service Area" },
  { href: "#contact", label: "Contact" },
];

// TODO: replace with real business phone number
const PHONE_DISPLAY = "(000) 000-0000";
const PHONE_HREF = "tel:+10000000000";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <a
          href="#top"
          className="flex min-h-11 min-w-0 shrink items-center"
          aria-label="NJ&NY Duct Cleaning LLC home"
        >
          <BrandLogo height={40} />
        </a>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-brand-muted transition hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {/* TODO: replace with real business phone number */}
          <a href={PHONE_HREF} className="btn-secondary gap-2 !px-4 !py-2 text-sm">
            <Phone className="h-4 w-4" aria-hidden="true" />
            {PHONE_DISPLAY}
          </a>
          <a href="#contact" className="btn-primary !px-4 !py-2 text-sm">
            Free Quote
          </a>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-pill border border-white/15 text-white lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="border-t border-white/10 bg-black/95 px-4 py-4 lg:hidden"
        >
          <nav className="flex flex-col gap-3" aria-label="Mobile">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="flex min-h-11 items-center rounded-lg px-3 text-base font-medium text-brand-muted hover:bg-white/5 hover:text-white"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            {/* TODO: replace with real business phone number */}
            <a
              href={PHONE_HREF}
              className="btn-secondary mt-2 min-h-11 w-full gap-2 text-base"
              onClick={() => setOpen(false)}
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {PHONE_DISPLAY}
            </a>
            <a
              href="#contact"
              className="btn-primary min-h-11 w-full text-base"
              onClick={() => setOpen(false)}
            >
              Free Quote
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
