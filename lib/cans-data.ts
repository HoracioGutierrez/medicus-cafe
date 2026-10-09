export type CanEntry = {
  id: string;
  name: string;
  era: string;
  description: string;
  labelColor: string;
  metalColor: string;
  rimColor: string;
};

export const cans: CanEntry[] = [
  {
    id: "gaseosa-del-che",
    name: "Gaseosa del Che",
    era: "circa 1958",
    description:
      "The oldest can on the shelf, found behind a radiator during the 1991 renovation and never thrown out.",
    labelColor: "#d9b98c",
    metalColor: "#8a7a63",
    rimColor: "#f3ead9",
  },
  {
    id: "cerveza-del-barrio",
    name: "Cerveza del Barrio",
    era: "circa 1962",
    description:
      "Brewed two blocks away. The can that was on the counter the day Medicus opened its doors.",
    labelColor: "#8a5a2b",
    metalColor: "#9a8565",
    rimColor: "#e8b64a",
  },
  {
    id: "vermut-amargo",
    name: "Vermút Amargo",
    era: "circa 1966",
    description:
      "Bitter, syrupy, and still ordered by name from the regulars who remember the glass bottle.",
    labelColor: "#6e1f1a",
    metalColor: "#8c7a6a",
    rimColor: "#e8b64a",
  },
  {
    id: "soda-negra",
    name: "Soda Negra",
    era: "circa 1973",
    description:
      "A short-lived dark cola with a cult following among the Thursday night card players.",
    labelColor: "#241c14",
    metalColor: "#7a7066",
    rimColor: "#d97736",
  },
  {
    id: "cola-imperial",
    name: "Cola Imperial",
    era: "circa 1978",
    description:
      "The house cola since the first fridge arrived, still poured over ice behind the counter every morning.",
    labelColor: "#b23a2e",
    metalColor: "#b7a98f",
    rimColor: "#f3ead9",
  },
  {
    id: "naranja-dorada",
    name: "Naranja Dorada",
    era: "circa 1985",
    description:
      "A kid's bribe for finishing homework at the corner table, two stools down from the pennant wall.",
    labelColor: "#d97736",
    metalColor: "#a8906c",
    rimColor: "#5a3a26",
  },
  {
    id: "limon-serrano",
    name: "Limón Serrano",
    era: "circa 1990",
    description:
      "Traded for a River Plate pennant by a sailor passing through on his last night in port.",
    labelColor: "#7a7a3c",
    metalColor: "#95927a",
    rimColor: "#e8b64a",
  },
  {
    id: "agua-tonica-real",
    name: "Agua Tónica Real",
    era: "circa 1994",
    description:
      "Kept for the one regular who still takes his vermouth with a proper mixer, no substitutions.",
    labelColor: "#9ca3a8",
    metalColor: "#aab0ae",
    rimColor: "#2e4a4a",
  },
  {
    id: "pomelo-bravo",
    name: "Pomelo Bravo",
    era: "circa 2001",
    description:
      "The newest addition, still argued over. Some regulars insist it doesn't belong on the shelf yet.",
    labelColor: "#c45b6b",
    metalColor: "#a8988e",
    rimColor: "#e8b64a",
  },
];

export const CAN_CENTER_INDEX = 4;
