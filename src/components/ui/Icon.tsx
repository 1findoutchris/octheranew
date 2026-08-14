import type { SVGProps } from "react";

export type IconName =
  | "aggregator"
  | "sportsbook"
  | "turnkey"
  | "white-label"
  | "api"
  | "back-office"
  | "payments"
  | "affiliate"
  | "menu"
  | "close"
  | "chevron-right"
  | "chevron-down"
  | "search"
  | "check"
  | "arrow-right"
  | "bolt"
  | "globe"
  | "layers"
  | "sliders"
  | "server"
  | "headset"
  | "lock"
  | "activity"
  | "webhook"
  | "bar-chart"
  | "users"
  | "wallet"
  | "gamepad"
  | "shield"
  | "gift"
  | "megaphone"
  | "database"
  | "key"
  | "settings"
  | "rocket"
  | "puzzle"
  | "trending-up"
  | "link"
  | "grid"
  | "code"
  | "alert-triangle"
  | "telegram";

const paths: Record<IconName, React.ReactNode> = {
  aggregator: (
    <>
      <circle cx="12" cy="6" r="2.4" />
      <circle cx="5" cy="18" r="2.4" />
      <circle cx="19" cy="18" r="2.4" />
      <path d="M12 8.4V13m0 0-5.4 3M12 13l5.4 3" />
    </>
  ),
  sportsbook: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 3.5v17M3.5 12h17M6 6l12 12M18 6 6 18" />
    </>
  ),
  turnkey: (
    <>
      <rect x="3.5" y="6" width="17" height="13" rx="1.5" />
      <path d="M8 6V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1M3.5 11h17" />
    </>
  ),
  "white-label": (
    <>
      <path d="M4 12 12 4l8 8-8 8-8-8Z" />
      <path d="M9 12h6" />
    </>
  ),
  api: (
    <>
      <rect x="3.5" y="4.5" width="17" height="15" rx="2" />
      <path d="M8 9.5v5M12 9.5v5M16 9.5v5" />
    </>
  ),
  "back-office": (
    <>
      <rect x="3.5" y="4" width="17" height="12" rx="1.5" />
      <path d="M9 20h6M12 16v4" />
    </>
  ),
  payments: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <path d="M3 10h18" />
      <path d="M7 14.5h4" />
    </>
  ),
  affiliate: (
    <>
      <circle cx="7" cy="7" r="2.6" />
      <circle cx="17" cy="7" r="2.6" />
      <circle cx="12" cy="18" r="2.6" />
      <path d="M8.9 8.7 10.5 16M15.1 8.7 13.5 16M9.5 6.4h5" />
    </>
  ),
  menu: (
    <>
      <path d="M4 6.5h16M4 12h16M4 17.5h16" />
    </>
  ),
  close: (
    <>
      <path d="M5 5l14 14M19 5 5 19" />
    </>
  ),
  "chevron-right": (
    <>
      <path d="M9 5l7 7-7 7" />
    </>
  ),
  "chevron-down": (
    <>
      <path d="M5 9l7 7 7-7" />
    </>
  ),
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M20 20l-4.6-4.6" />
    </>
  ),
  check: (
    <>
      <path d="M5 13l4.5 4.5L19 7.5" />
    </>
  ),
  "arrow-right": (
    <>
      <path d="M4.5 12h15M13 5.5 19.5 12 13 18.5" />
    </>
  ),
  bolt: (
    <>
      <path d="M13 3 5 13.5h5.5L11 21l8-11h-5.5L13 3Z" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.6 2.4 4 5.4 4 8.5s-1.4 6.1-4 8.5c-2.6-2.4-4-5.4-4-8.5s1.4-6.1 4-8.5Z" />
    </>
  ),
  layers: (
    <>
      <path d="M12 3.5 20.5 8 12 12.5 3.5 8 12 3.5Z" />
      <path d="M3.5 12 12 16.5 20.5 12M3.5 16 12 20.5 20.5 16" />
    </>
  ),
  sliders: (
    <>
      <path d="M5 6h14M5 12h14M5 18h14" />
      <circle cx="9" cy="6" r="1.8" />
      <circle cx="16" cy="12" r="1.8" />
      <circle cx="10" cy="18" r="1.8" />
    </>
  ),
  server: (
    <>
      <rect x="3.5" y="4" width="17" height="6.5" rx="1.5" />
      <rect x="3.5" y="13.5" width="17" height="6.5" rx="1.5" />
      <path d="M7 7.25h.01M7 16.75h.01" />
    </>
  ),
  headset: (
    <>
      <path d="M4 13v-1a8 8 0 0 1 16 0v1" />
      <rect x="3" y="13" width="4" height="5.5" rx="1.4" />
      <rect x="17" y="13" width="4" height="5.5" rx="1.4" />
      <path d="M19 18.5v.5a3 3 0 0 1-3 3h-2.5" />
    </>
  ),
  lock: (
    <>
      <rect x="4.5" y="10.5" width="15" height="10" rx="2" />
      <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
    </>
  ),
  activity: (
    <>
      <path d="M3.5 12h4l2.2-6.5L13 18l2.3-6h5.2" />
    </>
  ),
  webhook: (
    <>
      <path d="M6 8.5A4.5 4.5 0 1 1 13.7 12" />
      <circle cx="6" cy="16.5" r="2.3" />
      <circle cx="17.5" cy="8" r="2.3" />
      <circle cx="15" cy="17.5" r="2.3" />
      <path d="M8 15.3 12.8 12M14 15.7l-2-3" />
    </>
  ),
  "bar-chart": (
    <>
      <path d="M4 20V10M12 20V4M20 20v-7" />
      <path d="M2.5 20h19" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.3" />
      <path d="M2.8 19a6.2 6.2 0 0 1 12.4 0" />
      <path d="M15.5 5.2a3.3 3.3 0 0 1 0 6.2M18.2 19a6.2 6.2 0 0 0-3.6-5.6" />
    </>
  ),
  wallet: (
    <>
      <path d="M3.5 7.5A2 2 0 0 1 5.5 5.5H18a1.5 1.5 0 0 1 1.5 1.5v11A1.5 1.5 0 0 1 18 19.5H5.5A2 2 0 0 1 3.5 17.5v-10Z" />
      <path d="M15.5 12.5h3.5v3h-3.5a1.5 1.5 0 0 1 0-3Z" />
    </>
  ),
  gamepad: (
    <>
      <rect x="2.5" y="8" width="19" height="10" rx="4" />
      <path d="M7.5 11v4M5.5 13h4M16 12h.01M18.5 14.5h.01" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3.5 19 6.5v5.6c0 4-3 7.1-7 8.4-4-1.3-7-4.4-7-8.4V6.5L12 3.5Z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  gift: (
    <>
      <rect x="3.5" y="9" width="17" height="4" rx="1" />
      <path d="M5 13v6.5a1.5 1.5 0 0 0 1.5 1.5H17.5A1.5 1.5 0 0 0 19 19.5V13M12 9v12" />
      <path d="M12 9c-1.5-3.5-6-3.5-6-.5C6 9.5 9 9 12 9ZM12 9c1.5-3.5 6-3.5 6-.5 0 1-3 .5-6 .5Z" />
    </>
  ),
  megaphone: (
    <>
      <path d="M3.5 10.5v3l4 1V9.5l-4 1Z" />
      <path d="M7.5 9.5 18 5.5v13L7.5 14.5" />
      <path d="M6.5 14.5 8 19.5" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="6" rx="7.5" ry="2.8" />
      <path d="M4.5 6v12c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8V6" />
      <path d="M4.5 12c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8" />
    </>
  ),
  key: (
    <>
      <circle cx="8" cy="15.5" r="4" />
      <path d="M11 12.5 19.5 4M16.5 7l2.5 2.5M14 9.5 16 11.5" />
    </>
  ),
  settings: (
    <>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 3.5v2.3M12 18.2v2.3M4.9 6.9l1.6 1.6M17.5 15.5l1.6 1.6M3.5 12h2.3M18.2 12h2.3M4.9 17.1l1.6-1.6M17.5 8.5l1.6-1.6" />
    </>
  ),
  rocket: (
    <>
      <path d="M12 3c3 1.5 5 4.6 5 8.5 0 2.3-.7 4-1.6 5.3L12 21l-3.4-4.2C7.7 15.5 7 13.8 7 11.5 7 7.6 9 4.5 12 3Z" />
      <circle cx="12" cy="10.5" r="1.8" />
      <path d="M8.5 16.5 6 19M15.5 16.5 18 19" />
    </>
  ),
  puzzle: (
    <>
      <path d="M9 4.5h4V7a2 2 0 1 0 0 4h.001V8.5H20V13a2 2 0 1 1 0 4v3.5h-4.5a2 2 0 1 0-4 0H4.5V16a2 2 0 1 1 0-4H8V8.5H4.5V4.5H9Z" />
    </>
  ),
  "trending-up": (
    <>
      <path d="M3.5 16.5 10 10l4 4 6.5-6.5" />
      <path d="M15 7.5h5.5V13" />
    </>
  ),
  link: (
    <>
      <path d="M9.5 14.5 14.5 9.5" />
      <path d="M11 6.5 13 4.5a3.5 3.5 0 1 1 5 5l-2 2M13 17.5l-2 2a3.5 3.5 0 1 1-5-5l2-2" />
    </>
  ),
  grid: (
    <>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.2" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.2" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.2" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.2" />
    </>
  ),
  code: (
    <>
      <path d="M9 8 4.5 12 9 16" />
      <path d="M15 8l4.5 4-4.5 4" />
    </>
  ),
  "alert-triangle": (
    <>
      <path d="M12 4 21 19H3L12 4Z" />
      <path d="M12 10v4M12 16.5h.01" />
    </>
  ),
  telegram: (
    <>
      <path d="M21.5 2.5 10.3 13.6" />
      <path d="M21.5 2.5 14.6 21.5l-4.3-7.9-8-4.1 19.2-6.9Z" />
    </>
  ),
};

export function Icon({
  name,
  className,
  ...props
}: { name: IconName } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
