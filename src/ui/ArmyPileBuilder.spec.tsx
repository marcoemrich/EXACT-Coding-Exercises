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
    expect(screen.getByText("Empty Pile")).toBeInTheDocument();
  });
  it("should show pile count as 0 at the start", () => {
    renderArmyPileBuilder();
    expect(screen.getByText(/Pile: 0/)).toBeInTheDocument();
  });
  it("should show score as 0 at the start", () => {
    renderArmyPileBuilder();
    expect(screen.getByText(/Score: 0/)).toBeInTheDocument();
  });
  it("should show 'Runde 1 von 7' at the start", () => {
    renderArmyPileBuilder();
    expect(screen.getByText("Runde 1 von 7")).toBeInTheDocument();
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

    expect(screen.queryByText("Empty Pile")).not.toBeInTheDocument();
  });
  it("should show the selected card image in the pile", async () => {
    renderArmyPileBuilder(() => sevenCards);

    await clickFirstCard();

    const pileSection = screen.getByTestId("pile");
    const pileImage = within(pileSection).getByRole("img");
    expect(pileImage).toHaveAttribute("src", "/cards/zombie.png");
  });
  it("should show pile count as 1 after selecting a card", async () => {
    renderArmyPileBuilder(() => sevenCards);

    await clickFirstCard();

    expect(screen.getByText(/Pile: 1/)).toBeInTheDocument();
  });
  it("should show the current score after selecting a card", async () => {
    renderArmyPileBuilder(() => sevenCards);

    await clickFirstCard();

    expect(screen.getByText(/Score: 1/)).toBeInTheDocument();
  });
  it("should show 'Runde 2 von 7' after selecting a card", async () => {
    renderArmyPileBuilder(() => sevenCards);

    await clickFirstCard();

    expect(screen.getByText("Runde 2 von 7")).toBeInTheDocument();
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
    const pileImage = within(pileSection).getByRole("img");
    expect(pileImage).toHaveAttribute("src", "/cards/zombie.png");

    // Round 2: click chimera (first card of secondRoundCards)
    const user = userEvent.setup();
    const selection = within(screen.getByTestId("card-selection"));
    await user.click(selection.getAllByRole("img")[0]);
    const updatedPileImage = within(pileSection).getByRole("img");
    expect(updatedPileImage).toHaveAttribute("src", "/cards/chimera.png");
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
    expect(screen.getByText(/Pile: 1/)).toBeInTheDocument();

    // Round 2: click first card
    const user = userEvent.setup();
    const selection = within(screen.getByTestId("card-selection"));
    await user.click(selection.getAllByRole("img")[0]);
    expect(screen.getByText(/Pile: 2/)).toBeInTheDocument();
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
    expect(screen.getByText(/Score: 1/)).toBeInTheDocument();

    // Round 2: click zombie -> pile = [zombie, zombie], score = 4 (non-linear)
    const user = userEvent.setup();
    const selection = within(screen.getByTestId("card-selection"));
    await user.click(selection.getAllByRole("img")[0]);
    expect(screen.getByText(/Score: 4/)).toBeInTheDocument();
  });
  it("should advance the round counter after each selection", async () => {
    renderArmyPileBuilder(() => sevenCards);

    expect(screen.getByText("Runde 1 von 7")).toBeInTheDocument();

    // Round 1: click first card -> advance to round 2
    await clickFirstCard();
    expect(screen.getByText("Runde 2 von 7")).toBeInTheDocument();

    // Round 2: click first card -> advance to round 3
    const user = userEvent.setup();
    const selection = within(screen.getByTestId("card-selection"));
    await user.click(selection.getAllByRole("img")[0]);
    expect(screen.getByText("Runde 3 von 7")).toBeInTheDocument();
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

    // Game should have ended - no "Runde 6 von 7"
    expect(screen.queryByText("Runde 8 von 7")).not.toBeInTheDocument();
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
    expect(screen.getByText(/Total Score: 24/)).toBeInTheDocument();
  });
});
