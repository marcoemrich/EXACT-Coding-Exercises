const POINTS_PER_CARD = 2;
const POINTS_PER_SET_OF_2 = 7;

export function scoreOrthrusCards(cardCount: number): number {
  if (cardCount <= 0) return 0;
  const setsOf2 = Math.floor(cardCount / 2);
  const remaining = cardCount % 2;
  return setsOf2 * POINTS_PER_SET_OF_2 + remaining * POINTS_PER_CARD;
}
