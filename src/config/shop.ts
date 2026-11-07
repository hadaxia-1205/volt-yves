export const shop = {
  name: "VOLT CORE",
  city: "Lausanne",
  locale: "fr-CH",
  currency: "CHF",
  vatRate: 0.081,
  vatLabel: "TVA 8,1 % incluse",
  pricesIncludeTax: true,
  description:
    "Atelier d’informatique à Lausanne. PC, composants, écrans, périphériques et stockage, dans une ligne sobre.",
  cartStorageKey: "volt-core-panier",
  maxQuantity: 9,
  priceFilter: { min: 0, max: 4000, step: 10 },
} as const;

export const demo = {
  enabled: true,
  paymentConnected: false,
  stockConnected: false,
  ordersConnected: false,
  persistCustomerDetails: false,
  banner:
    "Mode démonstration. Aucun paiement n’est encaissé et aucune commande n’est envoyée. Les données saisies servent seulement à tester cette page : elles ne sont pas enregistrées.",
  confirmationTitle: "Démonstration terminée",
  confirmationBody:
    "Rien n’a été payé et aucune commande n’a été transmise. Les informations saisies ont été effacées de cette page.",
} as const;

export const demoSample = {
  nom: "Ada Martin",
  email: "ada.martin@example.com",
  telephone: "079 000 00 00",
  adresse: "Rue de l'Exemple 1",
  npa: "1003",
  ville: "Lausanne",
} as const;

export const categories = [
  {
    id: "pc",
    label: "PC",
    blurb: "Tours et stations assemblées à l’atelier.",
  },
  {
    id: "composants",
    label: "Composants",
    blurb: "Cartes, mémoire, alimentation et refroidissement.",
  },
  {
    id: "ecrans",
    label: "Écrans",
    blurb: "Dalles choisies pour le travail et l’image.",
  },
  {
    id: "peripheriques",
    label: "Périphériques",
    blurb: "Claviers, souris et casques.",
  },
  {
    id: "stockage",
    label: "Stockage",
    blurb: "SSD NVMe et boîtiers disque.",
  },
] as const;

export type CategoryId = (typeof categories)[number]["id"];

export const navigation = [
  { href: "/", label: "Accueil" },
  { href: "/catalogue", label: "Catalogue" },
] as const;

export const availabilityOptions = [
  { id: "en-stock", label: "En stock" },
  { id: "sur-commande", label: "Sur commande" },
  { id: "rupture", label: "Rupture" },
] as const;

export type Availability = (typeof availabilityOptions)[number]["id"];

export const sortOptions = [
  { id: "nom-asc", label: "Nom (A à Z)" },
  { id: "nom-desc", label: "Nom (Z à A)" },
  { id: "prix-asc", label: "Prix croissant" },
  { id: "prix-desc", label: "Prix décroissant" },
] as const;

export type SortId = (typeof sortOptions)[number]["id"];

export function getCategory(id: string) {
  return categories.find((category) => category.id === id);
}

export function availabilityLabel(id: Availability) {
  return availabilityOptions.find((option) => option.id === id)?.label ?? id;
}
