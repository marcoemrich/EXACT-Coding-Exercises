import { useState } from "react";
import { scoreArmyPile, type ArmyCard } from "../domain/army-pile-scores.js";

const MAX_ROUNDS = 7;

const CARD_IMAGE: Record<ArmyCard, string> = {
  zombie: "/cards/zombie.png",
  cyclops: "/cards/cyclops.png",
  chimera: "/cards/chimera.png",
  "undead-warrior-1": "/cards/undead-warrior-1pt.png",
  "undead-warrior-2": "/cards/undead-warrior-2pt.png",
  "undead-warrior-3": "/cards/undead-warrior-3pt.png",
};

const CARD_LABEL: Record<ArmyCard, string> = {
  zombie: "Zombie",
  cyclops: "Cyclops",
  chimera: "Chimera",
  "undead-warrior-1": "Undead Warrior",
  "undead-warrior-2": "Undead Warrior",
  "undead-warrior-3": "Undead Warrior",
};

type ArmyPileBuilderProps = {
  randomCardGenerator: () => ArmyCard[];
};

export function ArmyPileBuilder({ randomCardGenerator }: ArmyPileBuilderProps) {
  const cards = randomCardGenerator();
  const [pile, setPile] = useState<ArmyCard[]>([]);

  function handleCardClick(card: ArmyCard) {
    setPile([...pile, card]);
  }

  const currentRound = pile.length + 1;
  const isGameOver = pile.length >= MAX_ROUNDS;
  const score = scoreArmyPile(pile);

  return (
    <div className="space-y-6">
      {/* Pile Display */}
      <div className="rounded-xl border border-gray-700 bg-gray-800/60 p-6 shadow-lg">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-300">
            Your Army Pile
          </h2>
          <div className="flex gap-4 text-sm">
            <span
              data-testid="pile-count"
              className="rounded-full bg-gray-700 px-3 py-1"
            >
              Cards:{" "}
              <span className="font-bold text-amber-400">{pile.length}</span>
            </span>
            <span
              data-testid="score"
              className="rounded-full bg-gray-700 px-3 py-1"
            >
              Score: <span className="font-bold text-emerald-400">{score}</span>
            </span>
          </div>
        </div>

        {pile.length === 0 ? (
          <div className="flex h-36 items-center justify-center rounded-lg border-2 border-dashed border-gray-600 text-gray-500">
            No cards yet — pick one below!
          </div>
        ) : (
          <div data-testid="pile" className="flex items-end py-2">
            {pile.map((card, index) => (
              <div
                key={index}
                className="transition-all duration-300"
                style={{
                  marginLeft: index === 0 ? 0 : -40,
                  zIndex: index,
                }}
              >
                <img
                  src={CARD_IMAGE[card]}
                  alt={card}
                  title={CARD_LABEL[card]}
                  className="h-36 w-auto rounded-lg shadow-md ring-1 ring-gray-600"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Game Status & Card Selection */}
      {isGameOver ? (
        <div className="rounded-xl border border-amber-500/40 bg-linear-to-r from-amber-900/30 to-yellow-900/30 p-8 text-center shadow-lg">
          <h2 className="mb-2 text-2xl font-bold text-amber-400">Game Over</h2>
          <p
            data-testid="total-score"
            className="text-4xl font-extrabold text-emerald-400"
          >
            {score} Points
          </p>
        </div>
      ) : (
        <div className="rounded-xl border border-gray-700 bg-gray-800/60 p-6 shadow-lg">
          <div className="mb-4 text-center">
            <span data-testid="round-info" className="text-sm text-gray-400">
              Round{" "}
              <span className="font-bold text-gray-200">{currentRound}</span> of{" "}
              {MAX_ROUNDS}
            </span>
            <div className="mx-auto mt-2 flex max-w-xs justify-center gap-1">
              {Array.from({ length: MAX_ROUNDS }, (_, i) => (
                <div
                  key={i}
                  className={`h-1.5 flex-1 rounded-full ${
                    i < pile.length ? "bg-amber-400" : "bg-gray-600"
                  }`}
                />
              ))}
            </div>
          </div>

          <h2 className="mb-3 text-center text-sm font-semibold text-gray-400 uppercase tracking-wider">
            Choose a card
          </h2>
          <div
            data-testid="card-selection"
            className="flex flex-wrap justify-center gap-3"
          >
            {cards.map((card, index) => (
              <button
                key={index}
                onClick={() => handleCardClick(card)}
                className="group cursor-pointer rounded-lg transition-all duration-200 hover:-translate-y-2 hover:shadow-xl hover:shadow-amber-500/20 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-gray-800 active:scale-95"
              >
                <img
                  src={CARD_IMAGE[card]}
                  alt={card}
                  title={CARD_LABEL[card]}
                  className="h-40 w-auto rounded-lg ring-1 ring-gray-600 group-hover:ring-amber-400"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
