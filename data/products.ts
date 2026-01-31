export type Product = {
  id: string;
  name: { en: string; de: string };
  price: number;
  category: "earrings" | "necklaces" | "rings" | "sets" | "pendants";
  description: { en: string; de: string };
  image: string[];
};


export const products: Product[] = [
  {
    id: "earrings-1",
    name: { en: "Silver Drop Earrings", de: "Silberne Tropfenohrringe" },
    price: 59,
    category: "earrings",
    description: {
      en: "Handcrafted 950 Peruvian silver earrings.",
      de: "Handgefertigte Ohrringe aus 950er peruanischem Silber.",
    },
    image: ["/placeholder.jpg"],
  },
  {
    id: "ring-1",
    name: { en: "Minimal Silver Ring", de: "Minimalistischer Silberring" },
    price: 79,
    category: "rings",
    description: {
      en: "A timeless ring with a clean design.",
      de: "Ein zeitloser Ring mit klarem Design.",
    },
    image: ["/placeholder.jpg"],
  },
  {
  id: "necklace-1",
  name: { en: "Silver Necklace", de: "Silberkette" },
  price: 89,
  category: "necklaces",
  description: { en: "950 silver necklace.", de: "950er Silberkette." },
  image: ["/placeholder.jpg"],
},
{
  id: "pendant-1",
  name: { en: "Peru Pendant", de: "Peru Anhänger" },
  price: 69,
  category: "pendants",
  description: { en: "A symbolic pendant.", de: "Ein symbolischer Anhänger." },
  image: ["/placeholder.jpg"],
},
{
  id: "set-1",
  name: { en: "Silver Set (Earrings + Pendant)", de: "Silber-Set (Ohrringe + Anhänger)" },
  price: 129,
  category: "sets",
  description: {
    en: "A matching set in 950 Peruvian silver.",
    de: "Ein passendes Set aus 950er peruanischem Silber.",
  },
  image: ["/placeholder.jpg"],
},
{
  id: "cereza",
  category: "sets",
  price: 50,

  name: {
    de: "Cereza",
    en: "Cereza",
  },

  description: {
    de: "Set aus Ohrringen und Anhänger aus 950 Silber.",
    en: "Set with earrings and pendant made of 950 silver.",
  },

  image: [
    "/images/sets/cereza/cereza1.png",
    "/images/sets/cereza/cereza2.png",
    "/images/sets/cereza/cereza3.png",
  ],
}

];
