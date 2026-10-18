import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Lets the inquiry-form E2E suite build an isolated copy with the form enabled.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  async redirects() {
    return [
      // https://octhera.org is canonical. If www is ever attached to this
      // service, send it to the apex permanently (308), keeping the path;
      // Next.js carries the query string over automatically.
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.octhera.org" }],
        destination: "https://octhera.org/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
