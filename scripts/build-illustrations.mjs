import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dir = join(root, "public/images/produits");
mkdirSync(dir, { recursive: true });
mkdirSync(join(root, "public/images"), { recursive: true });

const ink = "#e7e2d6";
const dim = "#9aa097";
const fill = "#232a33";
const inset = "#15191e";
const blue = "#3d74ff";

function grid(width, height, step = 40) {
  let lines = "";
  for (let x = step; x < width; x += step) lines += `<path d="M${x} 0 V${height}"/>`;
  for (let y = step; y < height; y += step) lines += `<path d="M0 ${y} H${width}"/>`;
  return `<g stroke="#2c343d" stroke-width="1" fill="none">${lines}</g>`;
}

function marks(width, height) {
  const r = width - 28;
  const b = height - 28;
  return `<g stroke="${dim}" stroke-width="1.2" fill="none" opacity="0.75">
    <path d="M28 28 h20 M28 28 v20"/>
    <path d="M${r} 28 h-20 M${r} 28 v20"/>
    <path d="M28 ${b} h20 M28 ${b} v-20"/>
    <path d="M${r} ${b} h-20 M${r} ${b} v-20"/>
  </g>`;
}

function frame(body, title, width = 800, height = 640) {
  const safe = title.replaceAll("&", "&amp;").replaceAll("<", "&lt;");
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img">
<title>${safe}</title>
<rect width="${width}" height="${height}" fill="#171b20"/>
${grid(width, height)}
${marks(width, height)}
${body}
</svg>
`;
}

function scene(body, detail, fx = 400, fy = 330) {
  if (!detail) return body;
  return `<g transform="translate(${fx} ${fy}) scale(1.32) translate(${-fx} ${-fy})">${body}</g>
  <g stroke="${blue}" fill="none" stroke-width="1.4">
    <path d="M64 96 H132 M64 88 V104 M132 88 V104"/>
    <path d="M668 548 H736 M668 540 V556 M736 540 V556"/>
  </g>`;
}

const titles = {
  "tour-graphite-s": [
    "Illustration prototype d’une tour PC compacte, châssis graphite et fenêtre latérale.",
    "Détail prototype de la façade de la tour Graphite S, fentes d’aération et bouton d’alimentation.",
  ],
  "station-forge-x": [
    "Illustration prototype d’une station de travail haute, double chambre et bandeau vertical.",
    "Détail prototype des ouïes et du bandeau de la station Forge X.",
  ],
  "mini-arc-one": [
    "Illustration prototype d’un mini PC cubique, façade avec ports et voyant.",
    "Détail prototype des ports en façade du mini PC Arc One.",
  ],
  "carte-mere-trace-b650": [
    "Illustration prototype d’une carte mère, pistes, socket processeur et emplacements mémoire.",
    "Détail prototype du socket et des pistes de la carte mère Trace.",
  ],
  "memoire-vanta-32": [
    "Illustration prototype de deux barrettes mémoire, puces alignées et contacts.",
    "Détail prototype des puces sur une barrette mémoire Vanta.",
  ],
  "alimentation-modul-850": [
    "Illustration prototype d’un bloc d’alimentation, grille de ventilateur et ports modulaires.",
    "Détail prototype de la grille ronde du bloc Modul 850.",
  ],
  "ventirad-double-flux": [
    "Illustration prototype d’un ventirad à ailettes avec ventilateur circulaire.",
    "Détail prototype des ailettes du ventirad Double Flux.",
  ],
  "ecran-lumen-27": [
    "Illustration prototype d’un écran 27 pouces sur pied, dalle large et liseré bleu.",
    "Détail prototype du pied et du cadre de l’écran Lumen 27.",
  ],
  "ecran-lumen-32": [
    "Illustration prototype d’un écran 32 pouces, dalle haute définition et socle carré.",
    "Détail prototype du cadre fin de l’écran Lumen 32.",
  ],
  "ecran-lumen-34": [
    "Illustration prototype d’un écran ultralarge 34 pouces sur pied bas.",
    "Détail prototype de la dalle ultralarge Lumen 34.",
  ],
  "clavier-lineaire-87": [
    "Illustration prototype d’un clavier compact vu de dessus, grille de touches.",
    "Détail prototype des touches du clavier Linéaire 87.",
  ],
  "souris-trace": [
    "Illustration prototype d’une souris vue de dessus, molette et deux boutons.",
    "Détail prototype de la molette de la souris Trace.",
  ],
  "casque-ferme-studio": [
    "Illustration prototype d’un casque fermé, arceau et deux oreillettes.",
    "Détail prototype d’une oreillette du casque studio.",
  ],
  "ssd-nvme-2-to": [
    "Illustration prototype d’un SSD NVMe, barrette avec puces et connecteur.",
    "Détail prototype du connecteur du SSD NVMe 2 To.",
  ],
  "ssd-nvme-4-to": [
    "Illustration prototype d’un SSD NVMe longue capacité, quatre puces sur la barrette.",
    "Détail prototype des puces du SSD NVMe 4 To.",
  ],
  "boitier-disque-4-to": [
    "Illustration prototype d’un boîtier disque externe, façade arrondie et témoin.",
    "Détail prototype du port et du témoin du boîtier disque.",
  ],
};

function tower({ wide = false, mini = false } = {}) {
  const x = mini ? 300 : wide ? 230 : 275;
  const y = mini ? 170 : 90;
  const w = mini ? 200 : wide ? 340 : 250;
  const h = mini ? 220 : 430;
  const vents = wide
    ? `<g stroke="${dim}" fill="none" stroke-width="2">
        <path d="M${x + 28} ${y + 70} H${x + w * 0.42}"/>
        <path d="M${x + 28} ${y + 92} H${x + w * 0.42}"/>
        <path d="M${x + 28} ${y + 114} H${x + w * 0.42}"/>
        <path d="M${x + w * 0.58} ${y + 70} H${x + w - 28}"/>
        <path d="M${x + w * 0.58} ${y + 92} H${x + w - 28}"/>
        <path d="M${x + w * 0.58} ${y + 114} H${x + w - 28}"/>
      </g>
      <rect x="${x + w / 2 - 3}" y="${y + 36}" width="6" height="${h - 90}" fill="${blue}"/>`
    : `<g stroke="${dim}" fill="none" stroke-width="2">
        <path d="M${x + 28} ${y + h - 150} H${x + w - 28}"/>
        <path d="M${x + 28} ${y + h - 128} H${x + w - 28}"/>
        <path d="M${x + 28} ${y + h - 106} H${x + w - 28}"/>
      </g>`;
  const window = mini
    ? ""
    : `<rect x="${x + 36}" y="${y + 36}" width="${w - 72}" height="${wide ? 180 : 230}" fill="${inset}" stroke="${dim}"/>
       <rect x="${x + 48}" y="${y + 48}" width="${w - 96}" height="${wide ? 156 : 206}" fill="none" stroke="${blue}" stroke-width="1.6"/>`;
  const ports = mini
    ? `<g fill="${inset}" stroke="${dim}">
        <rect x="${x + 36}" y="${y + 70}" width="46" height="16"/>
        <rect x="${x + 36}" y="${y + 98}" width="28" height="12"/>
        <rect x="${x + 70}" y="${y + 98}" width="28" height="12"/>
      </g>
      <circle cx="${x + w - 48}" cy="${y + 84}" r="6" fill="${blue}"/>`
    : `<circle cx="${x + w / 2}" cy="${y + h - 58}" r="11" fill="none" stroke="${blue}" stroke-width="2"/>`;
  return `
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="${fill}" stroke="${ink}" stroke-width="2"/>
    ${window}
    ${vents}
    ${ports}
    <rect x="${x + 28}" y="${y + h}" width="36" height="10" fill="${fill}" stroke="${ink}"/>
    <rect x="${x + w - 64}" y="${y + h}" width="36" height="10" fill="${fill}" stroke="${ink}"/>
  `;
}

function board() {
  return `
    <rect x="150" y="120" width="500" height="400" rx="6" fill="#1c2830" stroke="${ink}" stroke-width="2"/>
    <g fill="none" stroke="${dim}" stroke-width="1.3">
      <path d="M190 180 H340 V250 H470"/>
      <path d="M210 430 H360 V340 H520 V220 H610"/>
      <path d="M430 200 H600 V300"/>
    </g>
    <path d="M250 300 H430 V360 H300" fill="none" stroke="${blue}" stroke-width="1.6"/>
    <rect x="330" y="200" width="110" height="110" fill="${inset}" stroke="${ink}"/>
    <rect x="354" y="224" width="62" height="62" fill="none" stroke="${blue}"/>
    <g fill="${inset}" stroke="${dim}">
      <rect x="470" y="170" width="18" height="120"/>
      <rect x="496" y="170" width="18" height="120"/>
      <rect x="522" y="170" width="18" height="120"/>
      <rect x="548" y="170" width="18" height="120"/>
    </g>
    <rect x="190" y="450" width="280" height="18" fill="${inset}" stroke="${dim}"/>
    <circle cx="210" cy="160" r="8" fill="none" stroke="${ink}"/>
    <circle cx="590" cy="460" r="8" fill="none" stroke="${ink}"/>
  `;
}

function memory() {
  const stick = (x) => `
    <rect x="${x}" y="150" width="78" height="340" rx="6" fill="${fill}" stroke="${ink}" stroke-width="2"/>
    <rect x="${x}" y="470" width="78" height="20" fill="#c6b48a"/>
    <g fill="${inset}" stroke="${dim}">
      ${[0, 1, 2, 3, 4].map((i) => `<rect x="${x + 16}" y="${190 + i * 48}" width="46" height="28"/>`).join("")}
    </g>
    <rect x="${x + 8}" y="168" width="62" height="8" fill="${blue}"/>
  `;
  return `${stick(300)}${stick(422)}`;
}

function psu() {
  return `
    <rect x="170" y="170" width="460" height="280" rx="8" fill="${fill}" stroke="${ink}" stroke-width="2"/>
    <circle cx="340" cy="310" r="92" fill="${inset}" stroke="${ink}" stroke-width="2"/>
    <circle cx="340" cy="310" r="62" fill="none" stroke="${dim}"/>
    <circle cx="340" cy="310" r="18" fill="none" stroke="${blue}" stroke-width="2"/>
    <g stroke="${dim}">
      <path d="M340 232 V268"/>
      <path d="M340 352 V388"/>
      <path d="M262 310 H298"/>
      <path d="M382 310 H418"/>
    </g>
    <g fill="${inset}" stroke="${dim}">
      <rect x="500" y="230" width="78" height="22"/>
      <rect x="500" y="266" width="78" height="22"/>
      <rect x="500" y="302" width="54" height="22"/>
      <rect x="500" y="338" width="54" height="22"/>
    </g>
  `;
}

function cooler() {
  const fins = Array.from({ length: 14 }, (_, i) => {
    const x = 250 + i * 16;
    return `<path d="M${x} 160 V430" stroke="${dim}" stroke-width="3"/>`;
  }).join("");
  return `
    <rect x="230" y="140" width="250" height="310" rx="6" fill="${fill}" stroke="${ink}" stroke-width="2"/>
    ${fins}
    <circle cx="500" cy="300" r="92" fill="${inset}" stroke="${ink}" stroke-width="2"/>
    <circle cx="500" cy="300" r="28" fill="none" stroke="${blue}" stroke-width="2"/>
    <path d="M430 300 H470 M530 300 H570 M500 230 V270 M500 330 V370" stroke="${dim}"/>
  `;
}

function monitor({ wide = false, tall = false } = {}) {
  const w = wide ? 620 : tall ? 500 : 520;
  const h = wide ? 210 : tall ? 300 : 280;
  const x = (800 - w) / 2;
  const y = wide ? 150 : 90;
  const neck = y + h;
  return `
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="${fill}" stroke="${ink}" stroke-width="2"/>
    <rect x="${x + 16}" y="${y + 16}" width="${w - 32}" height="${h - 32}" fill="${inset}"/>
    <path d="M${x + 28} ${y + h - 48} H${x + w - 28}" stroke="${blue}" stroke-width="2"/>
    <rect x="${390}" y="${neck}" width="20" height="${wide ? 70 : 90}" fill="${fill}" stroke="${ink}"/>
    <rect x="${tall ? 300 : wide ? 250 : 280}" y="${neck + (wide ? 70 : 90)}" width="${tall ? 200 : wide ? 300 : 240}" height="16" rx="3" fill="${fill}" stroke="${ink}"/>
  `;
}

function keyboard() {
  const keys = [];
  for (let row = 0; row < 5; row += 1) {
    const count = row === 4 ? 8 : 13;
    for (let col = 0; col < count; col += 1) {
      const w = row === 4 && col === 4 ? 92 : 32;
      const x = 150 + col * 38 + (row === 4 && col > 4 ? 54 : 0);
      const y = 190 + row * 48;
      const accent = row === 2 && col === 12;
      keys.push(
        `<rect x="${x}" y="${y}" width="${w}" height="32" rx="3" fill="${accent ? "#16306e" : inset}" stroke="${accent ? blue : dim}"/>`,
      );
    }
  }
  return `
    <rect x="120" y="150" width="560" height="300" rx="16" fill="${fill}" stroke="${ink}" stroke-width="2"/>
    ${keys.join("")}
  `;
}

function mouse() {
  return `
    <path d="M400 140
      C470 140 530 210 530 320
      C530 450 480 520 400 520
      C320 520 270 450 270 320
      C270 210 330 140 400 140 Z" fill="${fill}" stroke="${ink}" stroke-width="2"/>
    <path d="M400 150 V250" stroke="${dim}" stroke-width="2"/>
    <rect x="384" y="188" width="32" height="58" rx="10" fill="${inset}" stroke="${blue}"/>
    <circle cx="400" cy="360" r="6" fill="${blue}"/>
  `;
}

function headset() {
  return `
    <path d="M230 340
      C230 200 300 130 400 130
      C500 130 570 200 570 340" fill="none" stroke="${ink}" stroke-width="16" stroke-linecap="round"/>
    <rect x="188" y="300" width="86" height="150" rx="28" fill="${fill}" stroke="${ink}" stroke-width="2"/>
    <rect x="526" y="300" width="86" height="150" rx="28" fill="${fill}" stroke="${ink}" stroke-width="2"/>
    <circle cx="231" cy="375" r="22" fill="none" stroke="${blue}" stroke-width="2"/>
    <circle cx="569" cy="375" r="22" fill="none" stroke="${dim}"/>
    <path d="M569 470 V510" stroke="${dim}" stroke-width="3"/>
  `;
}

function ssd(chips) {
  const chipMarks = Array.from({ length: chips }, (_, i) => {
    const x = 250 + (i % 2) * 150;
    const y = 250 + Math.floor(i / 2) * 70;
    return `<rect x="${x}" y="${y}" width="110" height="46" rx="4" fill="${inset}" stroke="${dim}"/>`;
  }).join("");
  return `
    <g transform="rotate(-8 400 320)">
      <rect x="150" y="250" width="500" height="120" rx="8" fill="${fill}" stroke="${ink}" stroke-width="2"/>
      <g fill="#c6b48a">
        ${Array.from({ length: 8 }, (_, i) => `<rect x="${168 + i * 16}" y="268" width="8" height="28"/>`).join("")}
      </g>
      ${chipMarks}
      <rect x="560" y="292" width="70" height="10" fill="${blue}"/>
    </g>
  `;
}

function enclosure() {
  return `
    <rect x="170" y="210" width="460" height="200" rx="28" fill="${fill}" stroke="${ink}" stroke-width="2"/>
    <rect x="210" y="292" width="220" height="10" fill="${blue}"/>
    <rect x="520" y="276" width="64" height="28" rx="6" fill="${inset}" stroke="${dim}"/>
    <circle cx="230" cy="250" r="5" fill="${blue}"/>
  `;
}

const drawings = {
  "tour-graphite-s": () => tower(),
  "station-forge-x": () => tower({ wide: true }),
  "mini-arc-one": () => tower({ mini: true }),
  "carte-mere-trace-b650": board,
  "memoire-vanta-32": memory,
  "alimentation-modul-850": psu,
  "ventirad-double-flux": cooler,
  "ecran-lumen-27": () => monitor(),
  "ecran-lumen-32": () => monitor({ tall: true }),
  "ecran-lumen-34": () => monitor({ wide: true }),
  "clavier-lineaire-87": keyboard,
  "souris-trace": mouse,
  "casque-ferme-studio": headset,
  "ssd-nvme-2-to": () => ssd(2),
  "ssd-nvme-4-to": () => ssd(4),
  "boitier-disque-4-to": enclosure,
};

const focus = {
  "tour-graphite-s": [400, 430],
  "station-forge-x": [400, 220],
  "mini-arc-one": [380, 280],
  "carte-mere-trace-b650": [390, 260],
  "memoire-vanta-32": [400, 320],
  "alimentation-modul-850": [340, 310],
  "ventirad-double-flux": [360, 300],
  "ecran-lumen-27": [400, 250],
  "ecran-lumen-32": [400, 240],
  "ecran-lumen-34": [400, 250],
  "clavier-lineaire-87": [430, 300],
  "souris-trace": [400, 230],
  "casque-ferme-studio": [569, 375],
  "ssd-nvme-2-to": [250, 300],
  "ssd-nvme-4-to": [400, 320],
  "boitier-disque-4-to": [540, 290],
};

for (const [slug, draw] of Object.entries(drawings)) {
  const [title, detailTitle] = titles[slug];
  const [fx, fy] = focus[slug];
  const body = draw();
  writeFileSync(join(dir, `${slug}.svg`), frame(scene(body, false), title));
  writeFileSync(join(dir, `${slug}-detail.svg`), frame(scene(body, true, fx, fy), detailTitle));
}

function iso(x, y, z) {
  const X = 400 + (x - y) * 0.78;
  const Y = 528 - z * 0.92 + (x + y) * 0.34;
  return [X, Y];
}

function face(points, fillColor, stroke = ink) {
  const pointsAttr = points.map((point) => iso(...point).map((n) => n.toFixed(1)).join(",")).join(" ");
  return `<polygon points="${pointsAttr}" fill="${fillColor}" stroke="${stroke}" stroke-width="2" stroke-linejoin="round"/>`;
}

const hero = (() => {
  const w = 210;
  const d = 150;
  const h = 360;
  const x0 = -40;
  const y0 = -20;
  const front = [
    [x0, y0, 0],
    [x0 + w, y0, 0],
    [x0 + w, y0, h],
    [x0, y0, h],
  ];
  const side = [
    [x0 + w, y0, 0],
    [x0 + w, y0 + d, 0],
    [x0 + w, y0 + d, h],
    [x0 + w, y0, h],
  ];
  const top = [
    [x0, y0, h],
    [x0 + w, y0, h],
    [x0 + w, y0 + d, h],
    [x0, y0 + d, h],
  ];
  const glass = [
    [x0 + 22, y0, 48],
    [x0 + w - 22, y0, 48],
    [x0 + w - 22, y0, h - 70],
    [x0 + 22, y0, h - 70],
  ];
  const seam = [iso(x0 + w, y0, 12), iso(x0 + w, y0, h - 12)];
  const vents = [28, 48, 68]
    .map((offset) => {
      const a = iso(x0 + 28, y0, offset);
      const b = iso(x0 + w - 28, y0, offset);
      return `<line x1="${a[0].toFixed(1)}" y1="${a[1].toFixed(1)}" x2="${b[0].toFixed(1)}" y2="${b[1].toFixed(1)}" stroke="${dim}" stroke-width="2"/>`;
    })
    .join("");
  return `
    ${face(top, "#2a323c")}
    ${face(side, "#1d242c")}
    ${face(front, fill)}
    ${face(glass, inset, blue)}
    ${vents}
    <line x1="${seam[0][0].toFixed(1)}" y1="${seam[0][1].toFixed(1)}" x2="${seam[1][0].toFixed(1)}" y2="${seam[1][1].toFixed(1)}" stroke="${blue}" stroke-width="3"/>
  `;
})();

writeFileSync(
  join(root, "public/images/hero-tour.svg"),
  frame(
    hero,
    "Illustration prototype d’une tour PC de l’atelier VOLT CORE, châssis géométrique et arête bleue.",
  ),
);

writeFileSync(
  join(root, "public/images/motif-pcb.svg"),
  `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 240 240">
  <g fill="none" stroke="#e7e2d6" stroke-width="1" opacity="0.22">
    <path d="M12 48 H88 V128 H156 V36 H228"/>
    <path d="M24 220 V156 H120 V196 H210"/>
    <path d="M96 48 V96 H150"/>
    <rect x="108" y="168" width="18" height="12"/>
    <circle cx="88" cy="128" r="3.5" fill="#e7e2d6" stroke="none"/>
    <circle cx="156" cy="36" r="3.5" fill="#3d74ff" stroke="none"/>
  </g>
</svg>
`,
);

console.log(`Illustrations écrites dans ${dir}`);
