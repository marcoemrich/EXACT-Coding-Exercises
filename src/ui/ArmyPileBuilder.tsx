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

type ArmyPileBuilderProps = {
  randomCardGenerator: () => ArmyCard[];
};

export function ArmyPileBuilder({ randomCardGenerator }: ArmyPileBuilderProps) {
  const cards = randomCardGenerator();
  const [pile, setPile] = useState<ArmyCard[]>([]);

  function handleCardClick(card: ArmyCard) {
    setPile([...pile, card]);
  }

  const lastPileCard = pile[pile.length - 1];
  const currentRound = pile.length + 1;
  const isGameOver = pile.length >= MAX_ROUNDS;
  const score = scoreArmyPile(pile);

  return (
    <div>
      {pile.length === 0 ? (
        <div>Empty Pile</div>
      ) : (
        <div data-testid="pile">
          <img src={CARD_IMAGE[lastPileCard]} alt={lastPileCard} style={{ width: 120 }} />
        </div>
      )}
      <div>Pile: {pile.length}</div>
      <div>Score: {score}</div>
      {isGameOver ? (
        <>
          <div>Game Over</div>
          <div>Total Score: {score}</div>
        </>
      ) : (
        <>
          <div>Runde {currentRound} von {MAX_ROUNDS}</div>
          <div data-testid="card-selection">
            {cards.map((card, index) => (
              <img
                key={index}
                src={CARD_IMAGE[card]}
                alt={card}
                onClick={() => handleCardClick(card)}
                style={{ width: 120, cursor: "pointer" }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
