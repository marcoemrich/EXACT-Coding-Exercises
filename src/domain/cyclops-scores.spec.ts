import { describe, it, expect } from "vitest";
import { scoreCyclopsCards } from "./cyclops-scores.js";

describe("Score Card: Cyclops", () => {
  it("should return 0 points for negative card counts", () => {
    expect(scoreCyclopsCards(-1)).toBe(0);
    expect(scoreCyclopsCards(-5)).toBe(0);
  });
  it("should return 0 points for 0 Cyclops", () => {
    expect(scoreCyclopsCards(0)).toBe(0);
  });
  it("should return 6 points for 1 Cyclops (Bonus)", () => {
    expect(scoreCyclopsCards(1)).toBe(6);
  });
  it("should return 4 points for 2 Cyclops (2 points each)", () => {
    expect(scoreCyclopsCards(2)).toBe(4);
  });
  it("should return 6 points for 3 Cyclops (2 points each)", () => {
    expect(scoreCyclopsCards(3)).toBe(6);
  });
  it("should return 10 points for 5 Cyclops (2 points each)", () => {
    expect(scoreCyclopsCards(5)).toBe(10);
  });
});
