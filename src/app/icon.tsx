import { ImageResponse } from "next/og";
import { octheraMarkNodes, octheraMarkConnectorPath, octheraGradient } from "@/lib/brand";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/**
 * ImageResponse renders via satori, which does not read Tailwind classes —
 * only inline styles — so this mirrors OctheraMark's geometry directly
 * rather than reusing the component.
 */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: `linear-gradient(135deg, ${octheraGradient.from} 0%, ${octheraGradient.to} 100%)`,
          borderRadius: "50%",
        }}
      >
        <svg
          width={18}
          height={18}
          viewBox="0 0 24 24"
          fill="none"
          stroke="#fff"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d={octheraMarkConnectorPath} />
          {octheraMarkNodes.map((node) => (
            <circle key={`${node.cx}-${node.cy}`} cx={node.cx} cy={node.cy} r={node.r} fill="#fff" stroke="none" />
          ))}
        </svg>
      </div>
    ),
    { ...size }
  );
}
