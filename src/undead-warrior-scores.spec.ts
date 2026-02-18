import { describe, it, expect } from "vitest";
import { scoreUndeadWarriorCards } from "./undead-warrior-scores.js";

describe("Score Card: Undead Warrior", () => {
  it("should return 0 points for no cards", () => {
    expect(scoreUndeadWarriorCards([])).toBe(0);
  });
  it("should return the card value for a single card", () => {
    expect(scoreUndeadWarriorCards([3])).toBe(3);
  });
  it("should return the sum of card values for multiple cards without a complete set", () => {
    expect(scoreUndeadWarriorCards([1, 2])).toBe(3);
  });
  it("should return base points plus 6 bonus for one complete set (1+2+3)", () => {
    expect(scoreUndeadWarriorCards([1, 2, 3])).toBe(12);
  });
  it("should return base points plus 12 bonus for two complete sets", () => {
    expect(scoreUndeadWarriorCards([1, 1, 2, 2, 3, 3])).toBe(24);
  });
  it("should give bonus only for complete sets when there are leftover cards", () => {
    expect(scoreUndeadWarriorCards([1, 2, 2, 2, 3])).toBe(16);
  });
  it("should return 42 points for maximum cards (3x1 + 6x2 + 3x3)", () => {
    expect(scoreUndeadWarriorCards([1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3])).toBe(42);
  });
});
