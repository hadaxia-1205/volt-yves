import {
  getCategory,
  type Availability,
  type CategoryId,
} from "@/config/shop";

export type ProductImage = {
  src: string;
  alt: string;
};

export type ProductSpec = {
  label: string;
  value: string;
};

export type Product = {
  slug: string;
  name: string;
  category: CategoryId;
  brand: string;
  price: number;
  availability: Availability;
  description: string;
  highlights: [string, string];
  specs: ProductSpec[];
  images: [ProductImage, ProductImage];
  featured?: boolean;
};

function shots(
  slug: string,
  alt: string,
  altDetail: string,
): [ProductImage, ProductImage] {
  return [
    { src: `/images/produits/${slug}.svg`, alt },
    { src: `/images/produits/${slug}-detail.svg`, alt: altDetail },
  ];
}

/**
 * Catalogue de démonstration.
 * Pour remplacer l’assortiment, modifiez uniquement ce fichier
 * et les visuels correspondants dans public/images/produits/.
 */
export const products: Product[] = [
  {
    slug: "tour-graphite-s",
    name: "Tour Graphite S",
    category: "pc",
    brand: "Volt Atelier",
    price: 1890,
    availability: "en-stock",
    featured: true,
    description:
      "Tour compacte pour le bureau et le jeu en 1440p. Le châssis laisse voir la chambre, le flux d’air reste simple à entretenir, et l’atelier assure le montage.",
    highlights: ["8 cœurs, 32 Go DDR5", "SSD 1 To, graphique 12 Go"],
    specs: [
      { label: "Processeur", value: "8 cœurs / 16 fils, jusqu’à 5,0 GHz" },
      { label: "Mémoire", value: "32 Go DDR5" },
      { label: "Stockage", value: "SSD NVMe 1 To" },
      { label: "Graphisme", value: "Carte dédiée 12 Go" },
      { label: "Alimentation", value: "750 W, rendement Gold" },
      { label: "Boîtier", value: "Format moyen, panneau vitré" },
      { label: "Garantie atelier", value: "3 ans" },
    ],
    images: shots(
      "tour-graphite-s",
      "Illustration prototype d’une tour PC compacte, châssis graphite et fenêtre latérale.",
      "Détail prototype de la façade de la tour Graphite S, fentes d’aération et bouton d’alimentation.",
    ),
  },
  {
    slug: "station-forge-x",
    name: "Station Forge X",
    category: "pc",
    brand: "Nordline",
    price: 3490,
    availability: "en-stock",
    description:
      "Station haute pour le calcul, le montage et les fichiers lourds. Double chambre, mémoire généreuse et carte graphique 16 Go, sans éclairage superflu.",
    highlights: ["16 cœurs, 64 Go DDR5", "SSD 2 To, graphique 16 Go"],
    specs: [
      { label: "Processeur", value: "16 cœurs / 32 fils, jusqu’à 5,2 GHz" },
      { label: "Mémoire", value: "64 Go DDR5" },
      { label: "Stockage", value: "SSD NVMe 2 To" },
      { label: "Graphisme", value: "Carte dédiée 16 Go" },
      { label: "Alimentation", value: "1000 W, rendement Gold" },
      { label: "Boîtier", value: "Grand format, deux chambres" },
      { label: "Garantie atelier", value: "3 ans" },
    ],
    images: shots(
      "station-forge-x",
      "Illustration prototype d’une station de travail haute, double chambre et bandeau vertical.",
      "Détail prototype des ouïes et du bandeau de la station Forge X.",
    ),
  },
  {
    slug: "mini-arc-one",
    name: "Mini Arc One",
    category: "pc",
    brand: "Axiom",
    price: 1290,
    availability: "sur-commande",
    description:
      "Mini-tour pour un bureau étroit. Elle tient le quotidien, les appels et la bureautique lourde. Délai d’atelier d’environ dix jours.",
    highlights: ["6 cœurs, 16 Go", "SSD 512 Go, format cube"],
    specs: [
      { label: "Processeur", value: "6 cœurs / 12 fils, jusqu’à 4,6 GHz" },
      { label: "Mémoire", value: "16 Go DDR5" },
      { label: "Stockage", value: "SSD NVMe 512 Go" },
      { label: "Graphisme", value: "Circuit intégré" },
      { label: "Alimentation", value: "Bloc interne 180 W" },
      { label: "Encombrement", value: "Cube, moins de 8 litres" },
      { label: "Délai", value: "Sur commande, environ 10 jours" },
    ],
    images: shots(
      "mini-arc-one",
      "Illustration prototype d’un mini PC cubique, façade avec ports et voyant.",
      "Détail prototype des ports en façade du mini PC Arc One.",
    ),
  },
  {
    slug: "carte-mere-trace-b650",
    name: "Carte mère Trace B650",
    category: "composants",
    brand: "Helix",
    price: 219,
    availability: "en-stock",
    description:
      "Carte mère au format ATX pour une tour de travail. Quatre emplacements mémoire, un slot rapide pour la carte graphique et des pistes lisibles.",
    highlights: ["Format ATX, 4 slots DDR5", "2 emplacements M.2"],
    specs: [
      { label: "Format", value: "ATX" },
      { label: "Socket", value: "AM5, série 7000 et suivantes" },
      { label: "Mémoire", value: "4 slots DDR5, jusqu’à 128 Go" },
      { label: "Stockage", value: "2 emplacements M.2 NVMe" },
      { label: "Extension", value: "1 slot PCIe x16, 2 slots x1" },
      { label: "Réseau", value: "2,5 GbE" },
    ],
    images: shots(
      "carte-mere-trace-b650",
      "Illustration prototype d’une carte mère, pistes, socket processeur et emplacements mémoire.",
      "Détail prototype du socket et des pistes de la carte mère Trace.",
    ),
  },
  {
    slug: "memoire-vanta-32",
    name: "Mémoire Vanta 32 Go",
    category: "composants",
    brand: "Kestrel",
    price: 139,
    availability: "en-stock",
    description:
      "Kit de deux barrettes DDR5 pour passer une tour à 32 Go. Profil bas, sans diffuseur encombrant, compatible avec les ventirads larges.",
    highlights: ["2 × 16 Go DDR5", "Profil bas, 5600 MT/s"],
    specs: [
      { label: "Capacité", value: "32 Go (2 × 16 Go)" },
      { label: "Type", value: "DDR5" },
      { label: "Vitesse", value: "5600 MT/s" },
      { label: "Profil", value: "Dissipateur bas" },
      { label: "Tension", value: "1,25 V" },
    ],
    images: shots(
      "memoire-vanta-32",
      "Illustration prototype de deux barrettes mémoire, puces alignées et contacts.",
      "Détail prototype des puces sur une barrette mémoire Vanta.",
    ),
  },
  {
    slug: "alimentation-modul-850",
    name: "Alimentation Modul 850",
    category: "composants",
    brand: "Forge",
    price: 169,
    availability: "en-stock",
    description:
      "Bloc 850 W à câbles modulaires. Il laisse le chemin d’air libre dans la tour et tient une carte graphique récente sans monter en température inutilement.",
    highlights: ["850 W modulaires", "Rendement Gold, ventilateur 135 mm"],
    specs: [
      { label: "Puissance", value: "850 W" },
      { label: "Rendement", value: "80+ Gold" },
      { label: "Câblage", value: "Modulaire" },
      { label: "Ventilateur", value: "135 mm" },
      { label: "Format", value: "ATX, 150 mm de profondeur" },
      { label: "Protection", value: "Surtension et court-circuit" },
    ],
    images: shots(
      "alimentation-modul-850",
      "Illustration prototype d’un bloc d’alimentation, grille de ventilateur et ports modulaires.",
      "Détail prototype de la grille ronde du bloc Modul 850.",
    ),
  },
  {
    slug: "ventirad-double-flux",
    name: "Ventirad Double Flux",
    category: "composants",
    brand: "Arc",
    price: 89,
    availability: "rupture",
    description:
      "Dissipateur double tour pour les processeurs qui restent longtemps en charge. Deux ventilateurs, caloducs apparents. Rupture temporaire à l’atelier.",
    highlights: ["Double tour, 2 ventilateurs", "Hauteur 158 mm"],
    specs: [
      { label: "Type", value: "Air, double tour" },
      { label: "Ventilateurs", value: "2 × 120 mm" },
      { label: "Hauteur", value: "158 mm" },
      { label: "Caloducs", value: "6" },
      { label: "Sockets", value: "AM5 et LGA 1700 / 1851" },
      { label: "Disponibilité", value: "Rupture temporaire" },
    ],
    images: shots(
      "ventirad-double-flux",
      "Illustration prototype d’un ventirad à ailettes avec ventilateur circulaire.",
      "Détail prototype des ailettes du ventirad Double Flux.",
    ),
  },
  {
    slug: "ecran-lumen-27",
    name: "Écran Lumen 27",
    category: "ecrans",
    brand: "Lumen",
    price: 329,
    availability: "en-stock",
    featured: true,
    description:
      "Écran 27 pouces pour le travail quotidien et le jeu léger. Dalle mate, 165 Hz, pied réglable en hauteur. Le cadre reste fin sans disparaître.",
    highlights: ["27 pouces, 2560 × 1440", "165 Hz, dalle mate"],
    specs: [
      { label: "Diagonale", value: "27 pouces" },
      { label: "Résolution", value: "2560 × 1440" },
      { label: "Fréquence", value: "165 Hz" },
      { label: "Dalle", value: "IPS mate" },
      { label: "Pied", value: "Hauteur, inclinaison, pivot" },
      { label: "Connectique", value: "HDMI, DisplayPort" },
    ],
    images: shots(
      "ecran-lumen-27",
      "Illustration prototype d’un écran 27 pouces sur pied, dalle large et liseré bleu.",
      "Détail prototype du pied et du cadre de l’écran Lumen 27.",
    ),
  },
  {
    slug: "ecran-lumen-32",
    name: "Écran Lumen 32",
    category: "ecrans",
    brand: "Lumen",
    price: 689,
    availability: "en-stock",
    description:
      "Écran 32 pouces en 4K pour la retouche et les tableaux larges. La dalle reste lisible à distance de bureau, le socle tient sans encombrer.",
    highlights: ["32 pouces, 3840 × 2160", "4K, pied à socle carré"],
    specs: [
      { label: "Diagonale", value: "32 pouces" },
      { label: "Résolution", value: "3840 × 2160" },
      { label: "Fréquence", value: "60 Hz" },
      { label: "Dalle", value: "IPS mate" },
      { label: "Pied", value: "Socle carré, hauteur fixe" },
      { label: "Connectique", value: "HDMI, DisplayPort, USB-C 65 W" },
    ],
    images: shots(
      "ecran-lumen-32",
      "Illustration prototype d’un écran 32 pouces, dalle haute définition et socle carré.",
      "Détail prototype du cadre fin de l’écran Lumen 32.",
    ),
  },
  {
    slug: "ecran-lumen-34",
    name: "Écran Lumen 34",
    category: "ecrans",
    brand: "Lumen",
    price: 549,
    availability: "sur-commande",
    description:
      "Écran ultralarge 34 pouces pour tenir deux fenêtres sans second pied. Courbure légère, délai d’atelier d’environ deux semaines.",
    highlights: ["34 pouces ultralarge", "3440 × 1440, 144 Hz"],
    specs: [
      { label: "Diagonale", value: "34 pouces" },
      { label: "Format", value: "Ultralarge 21:9" },
      { label: "Résolution", value: "3440 × 1440" },
      { label: "Fréquence", value: "144 Hz" },
      { label: "Courbure", value: "Légère, 1500R" },
      { label: "Délai", value: "Sur commande, environ 2 semaines" },
    ],
    images: shots(
      "ecran-lumen-34",
      "Illustration prototype d’un écran ultralarge 34 pouces sur pied bas.",
      "Détail prototype de la dalle ultralarge Lumen 34.",
    ),
  },
  {
    slug: "clavier-lineaire-87",
    name: "Clavier Linéaire 87",
    category: "peripheriques",
    brand: "Nordline",
    price: 159,
    availability: "en-stock",
    featured: true,
    description:
      "Clavier mécanique compact, switches linéaires silencieux. Le format 87 touches garde les flèches et retire le pavé numérique.",
    highlights: ["Format 87 touches", "Switches linéaires, fil USB-C"],
    specs: [
      { label: "Format", value: "87 touches, sans pavé" },
      { label: "Switches", value: "Linéaires, course 4 mm" },
      { label: "Connexion", value: "USB-C, câble détachable" },
      { label: "Disposition", value: "Suisse (QWERTZ)" },
      { label: "Matériau", value: "Châssis aluminium" },
    ],
    images: shots(
      "clavier-lineaire-87",
      "Illustration prototype d’un clavier compact vu de dessus, grille de touches.",
      "Détail prototype des touches du clavier Linéaire 87.",
    ),
  },
  {
    slug: "souris-trace",
    name: "Souris Trace",
    category: "peripheriques",
    brand: "Axiom",
    price: 79,
    availability: "en-stock",
    description:
      "Souris filaire pour le dessin et les tableurs. Forme symétrique, molette crantée, capteur précis sur tapis textile.",
    highlights: ["Capteur 8 000 dpi", "6 boutons, fil 1,8 m"],
    specs: [
      { label: "Capteur", value: "Optique, jusqu’à 8 000 dpi" },
      { label: "Boutons", value: "6, dont deux latéraux" },
      { label: "Molette", value: "Crantée, clic central" },
      { label: "Connexion", value: "Fil USB, 1,8 m" },
      { label: "Poids", value: "82 g" },
    ],
    images: shots(
      "souris-trace",
      "Illustration prototype d’une souris vue de dessus, molette et deux boutons.",
      "Détail prototype de la molette de la souris Trace.",
    ),
  },
  {
    slug: "casque-ferme-studio",
    name: "Casque fermé Studio",
    category: "peripheriques",
    brand: "Kestrel",
    price: 199,
    availability: "en-stock",
    description:
      "Casque fermé pour les appels et l’écoute longue. Oreillettes circum-aurales, micro tige rabattable, câble détachable.",
    highlights: ["Fermé, circum-aural", "Micro tige, 32 ohms"],
    specs: [
      { label: "Type", value: "Fermé, circum-aural" },
      { label: "Impédance", value: "32 ohms" },
      { label: "Micro", value: "Tige rabattable" },
      { label: "Connexion", value: "Jack 3,5 mm, câble détachable" },
      { label: "Poids", value: "268 g" },
    ],
    images: shots(
      "casque-ferme-studio",
      "Illustration prototype d’un casque fermé, arceau et deux oreillettes.",
      "Détail prototype d’une oreillette du casque studio.",
    ),
  },
  {
    slug: "ssd-nvme-2-to",
    name: "SSD NVMe 2 To",
    category: "stockage",
    brand: "Helix",
    price: 179,
    availability: "en-stock",
    featured: true,
    description:
      "SSD NVMe 2 To pour le système et les projets en cours. Format M.2, lectures soutenues, dissipateur fin inclus.",
    highlights: ["2 To, format M.2", "Lecture 7 000 Mo/s"],
    specs: [
      { label: "Capacité", value: "2 To" },
      { label: "Format", value: "M.2 2280" },
      { label: "Interface", value: "NVMe PCIe 4.0" },
      { label: "Lecture", value: "jusqu’à 7 000 Mo/s" },
      { label: "Écriture", value: "jusqu’à 6 000 Mo/s" },
      { label: "Endurance", value: "1 200 To écrits" },
    ],
    images: shots(
      "ssd-nvme-2-to",
      "Illustration prototype d’un SSD NVMe, barrette avec puces et connecteur.",
      "Détail prototype du connecteur du SSD NVMe 2 To.",
    ),
  },
  {
    slug: "ssd-nvme-4-to",
    name: "SSD NVMe 4 To",
    category: "stockage",
    brand: "Helix",
    price: 349,
    availability: "en-stock",
    description:
      "SSD NVMe 4 To pour les rushes et les bibliothèques. Même format que le 2 To, avec davantage de puces sur la barrette.",
    highlights: ["4 To, format M.2", "Lecture 7 200 Mo/s"],
    specs: [
      { label: "Capacité", value: "4 To" },
      { label: "Format", value: "M.2 2280" },
      { label: "Interface", value: "NVMe PCIe 4.0" },
      { label: "Lecture", value: "jusqu’à 7 200 Mo/s" },
      { label: "Écriture", value: "jusqu’à 6 400 Mo/s" },
      { label: "Endurance", value: "2 400 To écrits" },
    ],
    images: shots(
      "ssd-nvme-4-to",
      "Illustration prototype d’un SSD NVMe longue capacité, quatre puces sur la barrette.",
      "Détail prototype des puces du SSD NVMe 4 To.",
    ),
  },
  {
    slug: "boitier-disque-4-to",
    name: "Boîtier disque 4 To",
    category: "stockage",
    brand: "Forge",
    price: 129,
    availability: "en-stock",
    description:
      "Boîtier externe 4 To pour les archives qui quittent la tour. USB-C, châssis fermé, témoin discret en façade.",
    highlights: ["4 To, USB-C", "Boîtier fermé, 2,5 pouces"],
    specs: [
      { label: "Capacité", value: "4 To" },
      { label: "Interface", value: "USB-C 10 Gb/s" },
      { label: "Format interne", value: "Disque 2,5 pouces" },
      { label: "Châssis", value: "Aluminium fermé" },
      { label: "Alimentation", value: "Par le bus USB" },
    ],
    images: shots(
      "boitier-disque-4-to",
      "Illustration prototype d’un boîtier disque externe, façade arrondie et témoin.",
      "Détail prototype du port et du témoin du boîtier disque.",
    ),
  },
];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getBrands() {
  return [...new Set(products.map((product) => product.brand))].sort((a, b) =>
    a.localeCompare(b, "fr"),
  );
}

export function productCountLabel(count: number) {
  return count === 1 ? "1 produit" : `${count} produits`;
}

export function categoryProductCount(category: CategoryId) {
  return products.filter((product) => product.category === category).length;
}

export function searchHaystack(product: Product) {
  const category = getCategory(product.category)?.label ?? product.category;
  return [
    product.name,
    product.brand,
    category,
    product.description,
    ...product.highlights,
    ...product.specs.flatMap((spec) => [spec.label, spec.value]),
  ].join(" ");
}
