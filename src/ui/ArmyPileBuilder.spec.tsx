// @vitest-environment jsdom
import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ArmyPileBuilder } from "./ArmyPileBuilder.js";
import type { ArmyCard } from "../domain/army-pile-scores.js";

describe("ArmyPileBuilder", () => {
  const sevenCards: ArmyCard[] = [
    "zombie",
    "cyclops",
    "chimera",
    "undead-warrior-1",
    "undead-warrior-2",
    "undead-warrior-3",
    "zombie",
  ];

  function renderArmyPileBuilder(
    stubCardGenerator: () => ArmyCard[] = () => []
  ) {
    render(<ArmyPileBuilder randomCardGenerator={stubCardGenerator} />);
  }

  async function clickFirstCard() {
    const user = userEvent.setup();
    const selection = within(screen.getByTestId("card-selection"));
    const firstCard = selection.getAllByRole("img")[0];
    await user.click(firstCard);
  }

  // Initial state
  it("should show an empty pile placeholder when no card has been selected", () => {
    renderArmyPileBuilder();
    expect(screen.getByText(/No cards yet/)).toBeInTheDocument();
  });
  it("should show pile count as 0 at the start", () => {
    renderArmyPileBuilder();
    expect(screen.getByTestId("pile-count")).toHaveTextContent("Cards: 0");
  });
  it("should show score as 0 at the start", () => {
    renderArmyPileBuilder();
    expect(screen.getByTestId("score")).toHaveTextContent("Score: 0");
  });
  it("should show round 1 of 7 at the start", () => {
    renderArmyPileBuilder();
    expect(screen.getByTestId("round-info")).toHaveTextContent("Round 1 of 7");
  });
  it("should display 7 cards to choose from", () => {
    renderArmyPileBuilder(() => sevenCards);
    const selection = within(screen.getByTestId("card-selection"));
    expect(selection.getAllByRole("img")).toHaveLength(7);
  });

  // Card selection (single round)
  it("should add clicked card to the pile", async () => {
    renderArmyPileBuilder(() => sevenCards);

    await clickFirstCard();

    expect(screen.queryByText(/No cards yet/)).not.toBeInTheDocument();
  });
  it("should show the selected card image in the pile", async () => {
    renderArmyPileBuilder(() => sevenCards);

    await clickFirstCard();

    const pileSection = screen.getByTestId("pile");
    const pileImages = within(pileSection).getAllByRole("img");
    expect(pileImages[0]).toHaveAttribute("src", "/cards/zombie.png");
  });
  it("should show pile count as 1 after selecting a card", async () => {
    renderArmyPileBuilder(() => sevenCards);

    await clickFirstCard();

    expect(screen.getByTestId("pile-count")).toHaveTextContent("Cards: 1");
  });
  it("should show the current score after selecting a card", async () => {
    renderArmyPileBuilder(() => sevenCards);

    await clickFirstCard();

    expect(screen.getByTestId("score")).toHaveTextContent("Score: 1");
  });
  it("should show round 2 of 7 after selecting a card", async () => {
    renderArmyPileBuilder(() => sevenCards);

    await clickFirstCard();

    expect(screen.getByTestId("round-info")).toHaveTextContent("Round 2 of 7");
  });
  it("should display 7 new cards after selecting a card", async () => {
    const secondRoundCards: ArmyCard[] = [
      "chimera",
      "chimera",
      "cyclops",
      "cyclops",
      "undead-warrior-1",
      "undead-warrior-1",
      "undead-warrior-2",
    ];
    let callCount = 0;
    const generatorWithTwoCalls = () => {
      callCount++;
      return callCount === 1 ? sevenCards : secondRoundCards;
    };

    renderArmyPileBuilder(generatorWithTwoCalls);
    await clickFirstCard();

    const selection = within(screen.getByTestId("card-selection"));
    const selectionImages = selection.getAllByRole("img");
    expect(selectionImages).toHaveLength(7);
    expect(selectionImages[0]).toHaveAttribute("src", "/cards/chimera.png");
  });

  // Multiple rounds
  it("should update the pile display with the last selected card image", async () => {
    const secondRoundCards: ArmyCard[] = [
      "chimera",
      "chimera",
      "cyclops",
      "cyclops",
      "undead-warrior-1",
      "undead-warrior-1",
      "undead-warrior-2",
    ];
    let callCount = 0;
    const generatorWithMultipleCalls = () => {
      callCount++;
      return callCount === 1 ? sevenCards : secondRoundCards;
    };

    renderArmyPileBuilder(generatorWithMultipleCalls);

    // Round 1: click zombie (first card of sevenCards)
    await clickFirstCard();
    const pileSection = screen.getByTestId("pile");
    const pileImages = within(pileSection).getAllByRole("img");
    expect(pileImages[0]).toHaveAttribute("src", "/cards/zombie.png");

    // Round 2: click chimera (first card of secondRoundCards)
    const user = userEvent.setup();
    const selection = within(screen.getByTestId("card-selection"));
    await user.click(selection.getAllByRole("img")[0]);
    const updatedPileImages = within(pileSection).getAllByRole("img");
    expect(updatedPileImages).toHaveLength(2);
    expect(updatedPileImages[1]).toHaveAttribute("src", "/cards/chimera.png");
  });
  it("should update pile count after each selection", async () => {
    let callCount = 0;
    const countingGenerator = () => {
      callCount++;
      return sevenCards;
    };

    renderArmyPileBuilder(countingGenerator);

    // Round 1: click first card
    await clickFirstCard();
    expect(screen.getByTestId("pile-count")).toHaveTextContent("Cards: 1");

    // Round 2: click first card
    const user = userEvent.setup();
    const selection = within(screen.getByTestId("card-selection"));
    await user.click(selection.getAllByRole("img")[0]);
    expect(screen.getByTestId("pile-count")).toHaveTextContent("Cards: 2");
  });
  it("should update score based on all collected cards", async () => {
    const zombieCards: ArmyCard[] = [
      "zombie",
      "zombie",
      "zombie",
      "cyclops",
      "chimera",
      "undead-warrior-1",
      "undead-warrior-2",
    ];
    renderArmyPileBuilder(() => zombieCards);

    // Round 1: click zombie -> pile = [zombie], score = 1
    await clickFirstCard();
    expect(screen.getByTestId("score")).toHaveTextContent("Score: 1");

    // Round 2: click zombie -> pile = [zombie, zombie], score = 4 (non-linear)
    const user = userEvent.setup();
    const selection = within(screen.getByTestId("card-selection"));
    await user.click(selection.getAllByRole("img")[0]);
    expect(screen.getByTestId("score")).toHaveTextContent("Score: 4");
  });
  it("should advance the round counter after each selection", async () => {
    renderArmyPileBuilder(() => sevenCards);

    expect(screen.getByTestId("round-info")).toHaveTextContent("Round 1 of 7");

    // Round 1: click first card -> advance to round 2
    await clickFirstCard();
    expect(screen.getByTestId("round-info")).toHaveTextContent("Round 2 of 7");

    // Round 2: click first card -> advance to round 3
    const user = userEvent.setup();
    const selection = within(screen.getByTestId("card-selection"));
    await user.click(selection.getAllByRole("img")[0]);
    expect(screen.getByTestId("round-info")).toHaveTextContent("Round 3 of 7");
  });

  // Game end
  it("should end the game after 7 cards have been selected", async () => {
    renderArmyPileBuilder(() => sevenCards);
    const user = userEvent.setup();

    // Click 7 cards (rounds 1-7)
    for (let i = 0; i < 7; i++) {
      const selection = within(screen.getByTestId("card-selection"));
      await user.click(selection.getAllByRole("img")[0]);
    }

    expect(screen.queryByTestId("round-info")).not.toBeInTheDocument();
    expect(screen.getByText("Game Over")).toBeInTheDocument();
  });
  it("should hide the card selection after the game ends", async () => {
    renderArmyPileBuilder(() => sevenCards);
    const user = userEvent.setup();

    // Click 7 cards (rounds 1-7)
    for (let i = 0; i < 7; i++) {
      const selection = within(screen.getByTestId("card-selection"));
      await user.click(selection.getAllByRole("img")[0]);
    }

    expect(screen.queryByTestId("card-selection")).not.toBeInTheDocument();
  });
  it("should show the total score when the game ends", async () => {
    renderArmyPileBuilder(() => sevenCards);
    const user = userEvent.setup();

    // Click 7 cards (rounds 1-7), always selecting first card = "zombie"
    for (let i = 0; i < 7; i++) {
      const selection = within(screen.getByTestId("card-selection"));
      await user.click(selection.getAllByRole("img")[0]);
    }

    // Pile = 7x zombie, score = 24
    expect(screen.getByTestId("total-score")).toHaveTextContent("24 Points");
  });
});
