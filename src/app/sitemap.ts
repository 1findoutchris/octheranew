import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";
import { products } from "@/data/products";
import { providers } from "@/data/providers";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/products",
    "/game-aggregation",
    "/providers",
    "/platform",
    "/solutions",
    "/pricing",
    "/about",
    "/contact",
  ].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
  }));

  const productRoutes = products.map((product) => ({
    url: `${siteConfig.url}/products/${product.slug}`,
    lastModified: new Date(),
  }));

  const providerRoutes = providers.map((provider) => ({
    url: `${siteConfig.url}/providers/${provider.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...productRoutes, ...providerRoutes];
}
