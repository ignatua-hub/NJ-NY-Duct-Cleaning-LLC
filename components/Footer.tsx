import BrandLogo from "./BrandLogo";
import Skyline from "./Skyline";

const FOOTER_LINKS = [
  { href: "#services", label: "Services" },
  { href: "#before-after", label: "Before & After" },
  { href: "#why-us", label: "Why Us" },
  { href: "#process", label: "Process" },
  { href: "#service-area", label: "Service Area" },
  { href: "#contact", label: "Contact" },
];

const SERVICE_LINKS = [
  "Air Duct Cleaning",
  "Dryer Vent Cleaning",
  "Chimney Cleaning",
  "HVAC Maintenance",
];

// TODO: replace with real business phone number
const PHONE_DISPLAY = "(000) 000-0000";
const PHONE_HREF = "tel:+10000000000";
// TODO: replace with real business email
const EMAIL_DISPLAY = "info@example.com";
const EMAIL_HREF = "mailto:info@example.com";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-black">
      <Skyline
        className="pointer-events-none absolute bottom-0 left-0 right-0 w-full"
        opacity={0.1}
      />
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <BrandLogo height={48} />
            <p className="mt-4 text-sm leading-relaxed text-brand-muted">
              NJ&amp;NY Duct Cleaning LLC — New Jersey&apos;s trusted experts in air duct,
              dryer vent, chimney and HVAC care. Healthier air, safer homes.
            </p>
          </div>

          <div>
            <h3 className="font-heading text-lg font-extrabold italic text-white">
              Explore
            </h3>
            <ul className="mt-3 space-y-2">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-brand-muted transition hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-lg font-extrabold italic text-white">
              Services
            </h3>
            <ul className="mt-3 space-y-2">
              {SERVICE_LINKS.map((label) => (
                <li key={label}>
                  <a
                    href="#services"
                    className="text-sm text-brand-muted transition hover:text-white"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-lg font-extrabold italic text-white">
              Contact
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-brand-muted">
              <li>
                {/* TODO: replace with real business phone number */}
                <a href={PHONE_HREF} className="transition hover:text-white">
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li>
                {/* TODO: replace with real business email */}
                <a href={EMAIL_HREF} className="transition hover:text-white">
                  {EMAIL_DISPLAY}
                </a>
              </li>
              <li>Serving all of New Jersey</li>
            </ul>
          </div>
        </div>

        <p className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-brand-muted">
          © 2026 NJ&amp;NY Duct Cleaning LLC. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
