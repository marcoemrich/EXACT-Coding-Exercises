const POINTS_PER_CARD = 2;
const POINTS_PER_SET_OF_3 = 12;

export function scoreChimeraCards(cardCount: number): number {
  if (cardCount <= 0) return 0;
  const setsOf3 = Math.floor(cardCount / 3);
  const remaining = cardCount % 3;
  return setsOf3 * POINTS_PER_SET_OF_3 + remaining * POINTS_PER_CARD;
}
