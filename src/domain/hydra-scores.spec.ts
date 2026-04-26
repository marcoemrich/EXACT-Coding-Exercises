import { describe, it, expect } from "vitest";
import { scoreHydraCards } from "./hydra-scores.js";

describe("Score Card: Hydra", () => {
  it("should return 0 points for negative card counts", () => {
    expect(scoreHydraCards(-1)).toBe(0);
    expect(scoreHydraCards(-5)).toBe(0);
  });
  it("should return 0 points for 0 Hydras", () => {
    expect(scoreHydraCards(0)).toBe(0);
  });
  it("should return 3 points for 1 Hydra", () => {
    expect(scoreHydraCards(1)).toBe(3);
  });
  it("should return 7 points for 2 Hydras", () => {
    expect(scoreHydraCards(2)).toBe(7);
  });
  it("should return 12 points for 3 Hydras", () => {
    expect(scoreHydraCards(3)).toBe(12);
  });
  it("should return 18 points for 4 Hydras", () => {
    expect(scoreHydraCards(4)).toBe(18);
  });
  it("should return 25 points for 5 Hydras", () => {
    expect(scoreHydraCards(5)).toBe(25);
  });
  it("should return 25 points for more than 5 Hydras (score capped at 5)", () => {
    expect(scoreHydraCards(6)).toBe(25);
  });
});
