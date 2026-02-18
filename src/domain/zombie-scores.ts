const SCORE_BY_COUNT = [0, 1, 4, 9, 12, 18, 24] as const;

export function scoreZombieCards(cardCount: number): number {
  if (cardCount <= 0) return 0;
  const maxIndex = SCORE_BY_COUNT.length - 1;
  return SCORE_BY_COUNT[Math.min(cardCount, maxIndex)];
}
