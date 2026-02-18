const SET_CARD_VALUES = [1, 2, 3];
const BONUS_PER_SET = 6;

const countCompleteSets = (cards: number[]): number =>
  Math.min(...SET_CARD_VALUES.map((value) => cards.filter((card) => card === value).length));

export function scoreUndeadWarriorCards(cards: number[]): number {
  const baseSum = cards.reduce((sum, card) => sum + card, 0);
  const bonus = countCompleteSets(cards) * BONUS_PER_SET;
  return baseSum + bonus;
}
