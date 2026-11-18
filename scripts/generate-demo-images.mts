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
      <stop offset="0" stop-color="${shade(color, 30)}"/><stop offset=".5" stop-color="${color}"/><stop offset="1" stop-color="${shade(color, -35)}"/>
    </linearGradient>
    <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#3a414c"/><stop offset=".5" stop-color="#0d1016"/><stop offset="1" stop-color="#232a35"/>
    </linearGradient>
    <radialGradient id="rim"><stop offset="0" stop-color="#9aa0a8"/><stop offset="1" stop-color="#3b3f45"/></radialGradient>
  </defs>
  <ellipse cx="800" cy="${yb + 28}" rx="700" ry="30" fill="#000" opacity=".18"/>
  <path d="${path}" fill="url(#paint)"/>
  <path d="${glass}" fill="url(#glass)"/>
  <path d="M${s.x0 + 90},${s.belt + 45} L${s.x1 - 60},${s.belt + 50}" stroke="${shade(color, 60)}" stroke-opacity=".35" stroke-width="3"/>
  <rect x="${s.x0 - 4}" y="${s.belt + 40}" width="60" height="16" rx="8" fill="#f4f1ea" opacity=".9"/>
  <rect x="${s.x1 - 52}" y="${s.belt + 34}" width="50" height="14" rx="7" fill="#9c1c1c" opacity=".85"/>
  ${wheel(w1)}${wheel(w2)}`;
}

// Fond studio neutre, sans effets : visuel provisoire en attendant les vraies photos.
const VIEWS = [
  { viewBox: "0 0 1600 1000", flip: false },
  { viewBox: "0 0 1600 1000", flip: true },
  { viewBox: "120 330 900 562", flip: false },
  { viewBox: "580 330 900 562", flip: false },
];

function svg(v: (typeof demoVehicles)[number], i: number) {
  const view = VIEWS[i];
  const color = COLORS[v.color] ?? "#888";
  const [x, y, w, h] = view.viewBox.split(" ").map(Number);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${view.viewBox}" width="1600" height="1000">
  <defs>
    <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eeede9"/><stop offset="1" stop-color="#e2e0db"/></linearGradient>
    <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d9d7d1"/><stop offset="1" stop-color="#cfcdc6"/></linearGradient>
  </defs>
  <rect x="-200" y="-200" width="2000" height="1400" fill="url(#wall)"/>
  <rect x="-200" y="765" width="2000" height="500" fill="url(#floor)"/>
  <g ${view.flip ? `transform="translate(1600 0) scale(-1 1)"` : ""}>${car(color, v.bodyType)}</g>
  <text x="${x + w - 24 * (w / 1600)}" y="${y + h - 24 * (h / 1000)}" text-anchor="end" font-family="Helvetica, Arial, sans-serif" font-size="${22 * (w / 1600)}" fill="#8a8882">Visuel provisoire · photo à venir</text>
</svg>`;
}

mkdirSync("public/demo", { recursive: true });
for (const v of demoVehicles) v.images.forEach((_, i) => writeFileSync(`public/demo/${v.slug}-${i + 1}.svg`, svg(v, i)));
console.log(`${demoVehicles.length * 4} visuels générés.`);
