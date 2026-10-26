"use client";

import { motion } from "framer-motion";

type LonLat = [number, number];

// Approximate New Jersey border, traced clockwise from the NY/PA tri-state point.
const BORDER: LonLat[] = [
  [-74.69, 41.36], [-73.89, 41.0], [-73.91, 40.96], [-73.96, 40.83],
  [-74.01, 40.76], [-74.03, 40.7], [-74.08, 40.65], [-74.18, 40.64],
  [-74.25, 40.55], [-74.27, 40.5], [-74.15, 40.45], [-74.0, 40.42],
  [-73.99, 40.47], [-73.98, 40.3], [-74.0, 40.22], [-74.03, 40.11],
  [-74.07, 39.94], [-74.1, 39.76], [-74.17, 39.62], [-74.42, 39.36],
  [-74.58, 39.27], [-74.81, 39.0], [-74.96, 38.93], [-74.89, 39.17],
  [-75.05, 39.21], [-75.17, 39.24], [-75.36, 39.34], [-75.53, 39.46],
  [-75.56, 39.62], [-75.47, 39.83], [-75.2, 39.89], [-75.13, 39.95],
  [-75.05, 40.0], [-74.85, 40.12], [-74.76, 40.22], [-74.94, 40.34],
  [-75.07, 40.46], [-75.19, 40.58], [-75.2, 40.69], [-75.08, 40.85],
  [-75.13, 40.97], [-74.97, 41.09],
];

type City = { name: string; lonLat: LonLat; labelSide: "left" | "right" };

const CITIES: City[] = [
  { name: "Paramus", lonLat: [-74.07, 40.94], labelSide: "right" },
  { name: "Newark", lonLat: [-74.17, 40.735], labelSide: "left" },
  { name: "Jersey City", lonLat: [-74.08, 40.72], labelSide: "right" },
  { name: "Edison", lonLat: [-74.41, 40.52], labelSide: "left" },
  { name: "Princeton", lonLat: [-74.66, 40.35], labelSide: "left" },
  { name: "Toms River", lonLat: [-74.2, 39.95], labelSide: "left" },
  { name: "Camden", lonLat: [-75.12, 39.93], labelSide: "left" },
  { name: "Atlantic City", lonLat: [-74.42, 39.36], labelSide: "right" },
];

// Equirectangular projection with longitude scaled by cos(40°) so the state keeps its shape.
const project = ([lon, lat]: LonLat): [number, number] => [
  (lon + 75.6) * 152,
  (41.4 - lat) * 200,
];

const outline =
  BORDER.map((p, i) => {
    const [x, y] = project(p);
    return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ") + " Z";

export default function NewJerseyMap() {
  return (
    <svg
      viewBox="-95 -15 450 525"
      className="h-auto w-full max-w-[520px]"
      role="img"
      aria-label="Map of New Jersey showing Newark, Jersey City, Paramus, Princeton, Edison, Toms River, Camden and Atlantic City"
    >
      <defs>
        <filter id="nj-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="nj-dot-glow" x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>

      <path
        d={outline}
        fill="#0F1624"
        stroke="#1E90FF"
        strokeWidth={2}
        strokeLinejoin="round"
        filter="url(#nj-glow)"
      />

      {CITIES.map((city, i) => {
        const [x, y] = project(city.lonLat);
        const left = city.labelSide === "left";
        return (
          <g key={city.name}>
            <motion.circle
              cx={x}
              cy={y}
              fill="#29B6FF"
              initial={{ r: 5, opacity: 0.6 }}
              animate={{ r: [5, 16, 5], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.3, ease: "easeOut" }}
            />
            <circle cx={x} cy={y} r={7} fill="#1E90FF" filter="url(#nj-dot-glow)" />
            <circle cx={x} cy={y} r={4.5} fill="#29B6FF" stroke="#FFFFFF" strokeWidth={1.2} />
            <text
              x={left ? x - 11 : x + 11}
              y={y + 4.5}
              textAnchor={left ? "end" : "start"}
              className="fill-white font-body"
              fontSize={14}
              fontWeight={600}
              paintOrder="stroke"
              stroke="#000000"
              strokeWidth={3}
              strokeOpacity={0.6}
            >
              {city.name}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
