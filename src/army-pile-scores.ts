import { scoreChimeraCards } from "./chimera-scores.js";
import { scoreCyclopsCards } from "./cyclops-scores.js";
import { scoreUndeadWarriorCards } from "./undead-warrior-scores.js";
import { scoreZombieCards } from "./zombie-scores.js";

const countCards = (cards: string[], type: string): number =>
  cards.filter((card) => card === type).length;

const UNDEAD_WARRIOR_PREFIX = "undead-warrior-";

const extractUndeadWarriorValues = (cards: string[]): number[] =>
  cards
    .filter((card) => card.startsWith(UNDEAD_WARRIOR_PREFIX))
    .map((card) => Number(card.slice(UNDEAD_WARRIOR_PREFIX.length)));

export function scoreArmyPile(cards: string[]): number {
  return (
    scoreChimeraCards(countCards(cards, "chimera")) +
    scoreCyclopsCards(countCards(cards, "cyclops")) +
    scoreUndeadWarriorCards(extractUndeadWarriorValues(cards)) +
    scoreZombieCards(countCards(cards, "zombie"))
  );
}
