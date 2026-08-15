import { ImageResponse } from "next/og";
import { octheraMarkNodes, octheraMarkConnectorPath, octheraGradient } from "@/lib/brand";
import { siteConfig } from "@/data/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          background: "#070707",
          backgroundImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,90,31,0.22), transparent 70%)",
          padding: "80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 76,
              height: 76,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${octheraGradient.from} 0%, ${octheraGradient.to} 100%)`,
            }}
          >
            <svg
              width={42}
              height={42}
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d={octheraMarkConnectorPath} />
              {octheraMarkNodes.map((node) => (
                <circle key={`${node.cx}-${node.cy}`} cx={node.cx} cy={node.cy} r={node.r} fill="#fff" stroke="none" />
              ))}
            </svg>
          </div>
          <span style={{ fontSize: 52, fontWeight: 700, color: "#fff", letterSpacing: -1 }}>
            OCTHERA
          </span>
        </div>

        <div style={{ display: "flex", marginTop: 48, fontSize: 44, fontWeight: 600, color: "#fff", maxWidth: 920, lineHeight: 1.25 }}>
          Powering the Future of iGaming
        </div>

        <div style={{ display: "flex", marginTop: 24, fontSize: 26, color: "#a3a3a3", maxWidth: 880, lineHeight: 1.5 }}>
          B2B casino aggregation, sportsbook, turnkey and white-label
          infrastructure for operators worldwide.
        </div>
      </div>
    ),
    { ...size }
  );
}
