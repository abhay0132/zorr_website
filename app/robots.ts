import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Public pages are indexable. The logged-in area (Phase 4) is kept out of search.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/plan", "/account", "/onboarding"] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
