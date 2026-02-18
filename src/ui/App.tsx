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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      <div className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="mb-8 text-center text-4xl font-bold tracking-wide text-amber-400 drop-shadow-lg">
          Overlords Card Game
        </h1>
        <ArmyPileBuilder randomCardGenerator={generateRandomCards} />
      </div>
    </div>
  );
}
