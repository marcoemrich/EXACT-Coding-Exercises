import type { ArmyCard } from "../domain/army-pile-scores.js";
import { ArmyPileBuilder } from "./ArmyPileBuilder.js";

const ALL_CARDS: ArmyCard[] = [
  "zombie",
  "cyclops",
  "chimera",
  "undead-warrior-1",
  "undead-warrior-2",
  "undead-warrior-3",
];

function generateRandomCards(): ArmyCard[] {
  return Array.from({ length: 7 }, () =>
    ALL_CARDS[Math.floor(Math.random() * ALL_CARDS.length)]
  );
}

export function App() {
  return (
    <div>
      <h1>Overlords Card Game</h1>
      <ArmyPileBuilder randomCardGenerator={generateRandomCards} />
    </div>
  );
}
