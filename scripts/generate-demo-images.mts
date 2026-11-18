// Génère les visuels SVG fictifs des véhicules de démo (public/demo).
// Usage : npm run demo:images
import { writeFileSync, mkdirSync } from "node:fs";
import { demoVehicles } from "../src/data/demo-vehicles.ts";

const COLORS: Record<string, string> = {
  "Rouge Corsa": "#c1121f", "Gris Graphite": "#4a4f57", "Blanc Nacré": "#e9e6df",
  "Bleu Azur": "#1f6fd1", "Noir Obsidienne": "#17181b",
};
const SHAPES: Record<string, { x0: number; x1: number; belt: number; roof: number; r0: number; r1: number; tail: number }> = {
  "Coupé":     { x0: 180, x1: 1420, belt: 560, roof: 430, r0: 640, r1: 900,  tail: 1220 },
  "Cabriolet": { x0: 190, x1: 1410, belt: 570, roof: 520, r0: 700, r1: 820,  tail: 1240 },
  "Berline":   { x0: 170, x1: 1430, belt: 545, roof: 405, r0: 620, r1: 1000, tail: 1250 },
  "SUV":       { x0: 200, x1: 1400, belt: 500, roof: 345, r0: 560, r1: 1180, tail: 1340 },
  "Citadine":  { x0: 300, x1: 1300, belt: 535, roof: 385, r0: 600, r1: 1070, tail: 1250 },
  "Break":     { x0: 170, x1: 1430, belt: 540, roof: 400, r0: 610, r1: 1270, tail: 1390 },
};
const SCENES = [
  { bg: ["#1b1d22", "#0a0a0b"], floor: "#141518", glow: "#ffffff", label: "Studio" },
  { bg: ["#ff7a3d", "#3a1a2e"], floor: "#2a1622", glow: "#ffb37a", label: "Riviera" },
  { bg: ["#0b1530", "#050608"], floor: "#0a0f1e", glow: "#3d7bff", label: "Nuit" },
  { bg: ["#d9d4ca", "#a8a397"], floor: "#bfb9ad", glow: "#ffffff", label: "Atelier" },
];

function shade(hex: string, amt: number) {
  const n = parseInt(hex.slice(1), 16);
  const c = [n >> 16, (n >> 8) & 255, n & 255].map((v) => Math.max(0, Math.min(255, Math.round(v + amt))));
  return "#" + c.map((v) => v.toString(16).padStart(2, "0")).join("");
}

function car(color: string, body: string) {
  const s = SHAPES[body] ?? SHAPES["Berline"];
  const yb = 735, wy = 690, wr = 88;
  const w1 = s.x0 + 250, w2 = s.x1 - 250;
  const path = `M${s.x0},${yb} C${s.x0 - 20},${yb - 60} ${s.x0 - 5},${s.belt + 40} ${s.x0 + 80},${s.belt + 15}
    L${s.r0 - 90},${s.belt - 5} C${s.r0 - 40},${s.roof + 60} ${s.r0 - 10},${s.roof} ${s.r0 + 40},${s.roof}
    L${s.r1},${s.roof} C${s.r1 + 80},${s.roof} ${s.tail - 30},${s.belt - 30} ${s.tail},${s.belt - 10}
    L${s.x1 - 40},${s.belt} C${s.x1 + 10},${s.belt + 10} ${s.x1 + 15},${yb - 50} ${s.x1},${yb} Z`;
  const glass = `M${s.r0 - 60},${s.belt - 12} C${s.r0 - 20},${s.roof + 55} ${s.r0},${s.roof + 18} ${s.r0 + 45},${s.roof + 18}
    L${s.r1 - 5},${s.roof + 18} C${s.r1 + 60},${s.roof + 18} ${s.tail - 70},${s.belt - 30} ${s.tail - 50},${s.belt - 14} Z`;
  const wheel = (x: number) => `
    <circle cx="${x}" cy="${wy}" r="${wr + 14}" fill="#050505"/>
    <circle cx="${x}" cy="${wy}" r="${wr}" fill="#111"/>
    <circle cx="${x}" cy="${wy}" r="${wr - 22}" fill="url(#rim)"/>
    ${[0, 72, 144, 216, 288].map((a) => `<rect x="${x - 5}" y="${wy - wr + 26}" width="10" height="${wr - 30}" rx="5" fill="#2a2c30" transform="rotate(${a} ${x} ${wy})"/>`).join("")}
    <circle cx="${x}" cy="${wy}" r="12" fill="#888"/>`;
  return `
  <defs>
    <linearGradient id="paint" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${shade(color, 55)}"/><stop offset=".45" stop-color="${color}"/><stop offset="1" stop-color="${shade(color, -60)}"/>
    </linearGradient>
    <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#3a414c"/><stop offset=".5" stop-color="#0d1016"/><stop offset="1" stop-color="#232a35"/>
    </linearGradient>
    <radialGradient id="rim"><stop offset="0" stop-color="#9aa0a8"/><stop offset="1" stop-color="#3b3f45"/></radialGradient>
  </defs>
  <ellipse cx="800" cy="${yb + 30}" rx="720" ry="36" fill="#000" opacity=".55"/>
  <path d="${path}" fill="url(#paint)"/>
  <path d="${glass}" fill="url(#glass)"/>
  <path d="M${s.x0 + 90},${s.belt + 45} L${s.x1 - 60},${s.belt + 50}" stroke="${shade(color, 90)}" stroke-opacity=".5" stroke-width="4"/>
  <rect x="${s.x0 - 4}" y="${s.belt + 40}" width="60" height="16" rx="8" fill="#fff7e0" opacity=".9"/>
  <rect x="${s.x1 - 52}" y="${s.belt + 34}" width="50" height="14" rx="7" fill="#ff2a2a" opacity=".9"/>
  ${wheel(w1)}${wheel(w2)}`;
}

function svg(v: (typeof demoVehicles)[number], i: number) {
  const sc = SCENES[i];
  const color = COLORS[v.color] ?? "#888";
  const flip = i === 2 ? `transform="translate(1600 0) scale(-1 1)"` : "";
  const zoom = i === 3 ? `viewBox="250 280 900 562"` : `viewBox="0 0 1600 1000"`;
  const dark = i !== 3;
  return `<svg xmlns="http://www.w3.org/2000/svg" ${zoom} width="1600" height="1000">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${sc.bg[0]}"/><stop offset="1" stop-color="${sc.bg[1]}"/></linearGradient>
    <radialGradient id="spot" cx=".5" cy=".55" r=".55"><stop offset="0" stop-color="${sc.glow}" stop-opacity=".35"/><stop offset="1" stop-color="${sc.glow}" stop-opacity="0"/></radialGradient>
  </defs>
  <rect x="-200" y="-200" width="2000" height="1400" fill="url(#bg)"/>
  ${i === 1 ? `<circle cx="1200" cy="470" r="120" fill="#ffd29a" opacity=".8"/><rect x="-200" y="600" width="2000" height="400" fill="#1d2d52" opacity=".55"/>` : ""}
  <rect x="-200" y="765" width="2000" height="500" fill="${sc.floor}"/>
  <ellipse cx="800" cy="560" rx="820" ry="380" fill="url(#spot)"/>
  ${i === 2 ? `<rect x="-200" y="766" width="2000" height="3" fill="#3d7bff" opacity=".8"/>` : ""}
  <g ${flip}>${car(color, v.bodyType)}</g>
  <text x="${i === 3 ? 280 : 60}" y="${i === 3 ? 320 : 80}" font-family="Arial, sans-serif" font-size="${i === 3 ? 18 : 26}" letter-spacing="6" fill="${dark ? "#fff" : "#111"}" opacity=".6">IRONCAR · VISUEL DE DÉMONSTRATION</text>
</svg>`;
}

mkdirSync("public/demo", { recursive: true });
for (const v of demoVehicles) v.images.forEach((_, i) => writeFileSync(`public/demo/${v.slug}-${i + 1}.svg`, svg(v, i)));
console.log(`${demoVehicles.length * 4} visuels générés.`);
