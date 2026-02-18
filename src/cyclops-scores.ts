const POINTS_PER_CARD = 2;
const SOLO_BONUS = 6;

export function scoreCyclopsCards(cardCount: number): number {
  if (cardCount === 1) return SOLO_BONUS;
  if (cardCount >= 2) return cardCount * POINTS_PER_CARD;
  return 0;
}
