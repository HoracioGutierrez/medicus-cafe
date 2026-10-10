export type Soda = {
  name: string;
  label: string;
  era: string;
  description: string;
  calories: string;
  ingredients: string;
  texture: string;
};

export const sodas: Soda[] = [
  {
    name: "COCA-COLA",
    label: "Coca-Cola",
    era: "circa 1960",
    description: "La primera que llegó al mostrador, con la receta de siempre.",
    calories: "140",
    ingredients:
      "CARBONATED WATER · SUGAR · CARAMEL COLOR · NATURAL FLAVORS · CAFFEINE",
    texture: "brands/coca-cola.jpg",
  },
  {
    name: "7UP",
    label: "7UP",
    era: "circa 1965",
    description: "La de las tardes de domingo sin fútbol por la radio.",
    calories: "140",
    ingredients:
      "CARBONATED WATER · SUGAR · CITRIC ACID · LEMON AND LIME FLAVORS",
    texture: "brands/7up.jpg",
  },
  {
    name: "DR-PEPPER",
    label: "Dr Pepper",
    era: "circa 1970",
    description: "La trajo un marinero y nunca volvió a buscarla.",
    calories: "150",
    ingredients:
      "CARBONATED WATER · SUGAR · CARAMEL COLOR · NATURAL FLAVORS · CAFFEINE",
    texture: "brands/dr-pepper.jpg",
  },
  {
    name: "SPRITE",
    label: "Sprite",
    era: "circa 1972",
    description: "La que pide todo el que jura que no toma gaseosa.",
    calories: "140",
    ingredients:
      "CARBONATED WATER · SUGAR · CITRIC ACID · NATURAL LEMON-LIME FLAVORS",
    texture: "brands/sprite.jpg",
  },
  {
    name: "FANTA",
    label: "Fanta",
    era: "circa 1975",
    description: "Naranja como el atardecer que se ve desde la vereda.",
    calories: "160",
    ingredients:
      "CARBONATED WATER · SUGAR · ORANGE JUICE · CITRIC ACID · NATURAL FLAVORS",
    texture: "brands/fanta.jpg",
  },
  {
    name: "PEPSI",
    label: "Pepsi",
    era: "circa 1980",
    description: "La eterna segunda opción, aunque acá nadie discute gustos.",
    calories: "150",
    ingredients:
      "CARBONATED WATER · SUGAR · CARAMEL COLOR · NATURAL FLAVORS · CAFFEINE",
    texture: "brands/pepsi.jpg",
  },
  {
    name: "MTN-DEW",
    label: "Mtn Dew",
    era: "circa 1985",
    description: "Llegó con los pibes del rock y se quedó para siempre.",
    calories: "170",
    ingredients:
      "CARBONATED WATER · SUGAR · CITRUS FLAVOR · NATURAL FLAVORS · CAFFEINE",
    texture: "brands/mtn-dew.jpg",
  },
];

/** Index of the soda shown centered/frontmost when the shelf first loads. */
export const CAROUSEL_ORIGIN = 3;
