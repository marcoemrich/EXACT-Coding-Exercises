import { scoreChimeraCards } from "./chimera-scores.js";
import { scoreCyclopsCards } from "./cyclops-scores.js";
import { scoreUndeadWarriorCards } from "./undead-warrior-scores.js";
import { scoreZombieCards } from "./zombie-scores.js";

export type ArmyCard =
  | "zombie"
  | "cyclops"
  | "chimera"
  | "undead-warrior-1"
  | "undead-warrior-2"
  | "undead-warrior-3";

const countCards = (cards: ArmyCard[], type: ArmyCard): number =>
  cards.filter((card) => card === type).length;

const UNDEAD_WARRIOR_VALUES: Record<string, number> = {
  "undead-warrior-1": 1,
  "undead-warrior-2": 2,
  "undead-warrior-3": 3,
};

const extractUndeadWarriorValues = (cards: ArmyCard[]): number[] =>
  cards
    .filter((card) => card in UNDEAD_WARRIOR_VALUES)
    .map((card) => UNDEAD_WARRIOR_VALUES[card]);

export function scoreArmyPile(cards: ArmyCard[]): number {
  return (
    scoreChimeraCards(countCards(cards, "chimera")) +
    scoreCyclopsCards(countCards(cards, "cyclops")) +
    scoreUndeadWarriorCards(extractUndeadWarriorValues(cards)) +
    scoreZombieCards(countCards(cards, "zombie"))
  );
}
