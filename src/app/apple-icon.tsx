import { ImageResponse } from "next/og";
import { octheraMarkNodes, octheraMarkConnectorPath, octheraGradient } from "@/lib/brand";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#070707",
        }}
      >
        <div
          style={{
            width: 132,
            height: 132,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${octheraGradient.from} 0%, ${octheraGradient.to} 100%)`,
          }}
        >
          <svg
            width={70}
            height={70}
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
      </div>
    ),
    { ...size }
  );
}
