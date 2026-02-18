const POINTS_PER_CARD = 2;
const POINTS_PER_SET_OF_3 = 12;

export function scoreChimeraCards(numberOfCards: number): number {
  const setsOf3 = Math.floor(numberOfCards / 3);
  const remaining = numberOfCards % 3;
  return setsOf3 * POINTS_PER_SET_OF_3 + remaining * POINTS_PER_CARD;
}
