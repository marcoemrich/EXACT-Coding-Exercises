const SET_CARD_VALUES = [1, 2, 3] as const;
const BONUS_PER_SET = 6;

export function scoreUndeadWarriorCards(cards: number[]): number {
  const counts = new Map<number, number>();
  let baseSum = 0;

  for (const card of cards) {
    baseSum += card;
    counts.set(card, (counts.get(card) ?? 0) + 1);
  }

  const completeSets = Math.min(
    ...SET_CARD_VALUES.map((value) => counts.get(value) ?? 0)
  );

  return baseSum + completeSets * BONUS_PER_SET;
}
