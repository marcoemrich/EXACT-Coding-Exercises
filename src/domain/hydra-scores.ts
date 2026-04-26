const SCORE_BY_COUNT = [0, 3, 7, 12, 18, 25] as const;

export function scoreHydraCards(cardCount: number): number {
  if (cardCount <= 0) return 0;
  const maxIndex = SCORE_BY_COUNT.length - 1;
  return SCORE_BY_COUNT[Math.min(cardCount, maxIndex)];
}
