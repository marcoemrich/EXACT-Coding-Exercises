const POINTS_PER_CARD = 2;
const SOLO_BONUS = 6;

export function scoreCyclopsCards(cardCount: number): number {
  if (cardCount <= 0) return 0;
  if (cardCount === 1) return SOLO_BONUS;
  return cardCount * POINTS_PER_CARD;
}
