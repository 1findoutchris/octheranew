import type { Metadata } from "next";
import { siteConfig } from "@/data/site";

/**
 * Builds per-page metadata with a self-referencing canonical and matching
 * Open Graph/Twitter fields. Page-level `openGraph` replaces the root one
 * rather than merging, so siteName/type/url are set here every time.
 */
export function pageMetadata({
  title,
  description,
  path,
  noindex = false,
}: {
  title: string;
  description: string;
  /** Path beginning with "/", without query string. */
  path: string;
  noindex?: boolean;
}): Metadata {
  const fullTitle = `${title} | ${siteConfig.name}`;
  // The root opengraph-image is not inherited once a page sets its own
  // openGraph/twitter objects, so reference it explicitly.
  const image = { url: "/opengraph-image", width: 1200, height: 630, alt: `${siteConfig.name} — ${siteConfig.tagline}` };
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      url: path,
      title: fullTitle,
      description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

export function absoluteUrl(path: string) {
  return path === "/" ? siteConfig.url : `${siteConfig.url}${path}`;
}

export type Crumb = { name: string; path: string };

export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}
