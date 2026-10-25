import type { Metadata } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import "./globals.css";
import { PHONE_E164 } from "@/lib/contact";

const heading = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["700", "800"],
  style: ["normal", "italic"],
  variable: "--font-heading",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const SITE_TITLE =
  "NJ&NY Duct Cleaning LLC | Air Duct, Dryer Vent, Chimney & HVAC in New Jersey";
const SITE_DESCRIPTION =
  "NJ&NY Duct Cleaning LLC — New Jersey's trusted experts in air duct cleaning, dryer vent cleaning, chimney cleaning, and HVAC maintenance. Healthier air, lower energy bills, safer homes.";

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    type: "website",
    locale: "en_US",
    siteName: "NJ&NY Duct Cleaning LLC",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "NJ&NY Duct Cleaning LLC",
  description: SITE_DESCRIPTION,
  telephone: PHONE_E164,
  // TODO: replace with real business email
  email: "info@example.com",
  areaServed: {
    "@type": "State",
    name: "New Jersey",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Home air and vent services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Air Duct Cleaning" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Dryer Vent Cleaning" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Chimney Cleaning" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "HVAC Maintenance" },
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable}`}>
      <body className="min-h-screen bg-black pb-28 font-body text-white antialiased md:pb-0">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd),
          }}
        />
        {children}
      </body>
    </html>
  );
}
