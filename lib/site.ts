/** Public site URL used for canonical, Open Graph and sitemap links. Set NEXT_PUBLIC_SITE_URL in production. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:43123").replace(/\/$/, "");
