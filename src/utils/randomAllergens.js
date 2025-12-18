export const commonAllergens = [
  "Milk",
  "Eggs",
  "Fish",
  "Shellfish",
  "Tree Nuts",
  "Peanuts",
  "Wheat",
  "Soy"
];

export function getRandomAllergens() {
  const shuffled = commonAllergens.sort(() => 0.5 - Math.random());
  const count = Math.floor(Math.random() * 3) + 1; // 1 to 3 allergens
  return shuffled.slice(0, count);
}