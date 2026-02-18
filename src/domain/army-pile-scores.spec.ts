import { describe, it, expect } from "vitest";
import { scoreArmyPile } from "./army-pile-scores.js";

describe("Army Pile Scores", () => {
  it("should return 0 points for an empty army pile", () => {
    expect(scoreArmyPile([])).toBe(0);
  });
  it("should return 1 point for a single zombie card", () => {
    expect(scoreArmyPile(["zombie"])).toBe(1);
  });
  it("should return 6 points for a single cyclops card (solo bonus)", () => {
    expect(scoreArmyPile(["cyclops"])).toBe(6);
  });
  it("should return 12 points for three chimera cards (set of 3)", () => {
    expect(scoreArmyPile(["chimera", "chimera", "chimera"])).toBe(12);
  });
  it("should return 12 points for a complete undead warrior set", () => {
    expect(
      scoreArmyPile(["undead-warrior-1", "undead-warrior-2", "undead-warrior-3"])
    ).toBe(12);
  });
  it("should sum individual card type scores for a mixed pile", () => {
    expect(scoreArmyPile(["zombie", "zombie", "cyclops"])).toBe(10);
  });
  it("should correctly score a pile with all card types", () => {
    expect(
      scoreArmyPile([
        "zombie", "zombie",
        "cyclops",
        "chimera", "chimera", "chimera",
        "undead-warrior-1", "undead-warrior-2", "undead-warrior-3",
      ])
    ).toBe(4 + 6 + 12 + 12);
  });
});
