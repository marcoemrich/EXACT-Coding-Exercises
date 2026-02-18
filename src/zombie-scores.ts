const scores = [0, 1, 4, 9, 12, 18, 24];

export function scoreZombieCards(cardCount: number): number {
  return scores[Math.min(cardCount, scores.length - 1)];
}
