import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { providers, isProviderIndexable } from "@/data/providers";
import { pageLastModified } from "@/data/sitemap";
import { absoluteUrl } from "@/lib/seo";

/**
 * Canonical, indexable, 200-status marketing pages only. Provider pages are
 * added once their availability is confirmed (see isProviderIndexable).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "/",
    "/products",
    "/game-aggregation",
    "/providers",
    "/platform",
    "/solutions",
    "/pricing",
    "/docs",
    "/about",
    "/contact",
  ];
  const productRoutes = products.map((product) => `/products/${product.slug}`);
  const providerRoutes = providers
    .filter(isProviderIndexable)
    .map((provider) => `/providers/${provider.slug}`);

  return [...staticRoutes, ...productRoutes, ...providerRoutes].map((path) => ({
    url: absoluteUrl(path),
    ...(pageLastModified[path] ? { lastModified: pageLastModified[path] } : {}),
  }));
}
