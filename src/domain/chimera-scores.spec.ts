import { describe, it, expect } from "vitest";
import { scoreChimeraCards } from "./chimera-scores.js";

describe("Score Card: Chimera", () => {
  it("should return 0 points for negative card counts", () => {
    expect(scoreChimeraCards(-1)).toBe(0);
    expect(scoreChimeraCards(-5)).toBe(0);
  });
  it("should return 0 points for 0 Chimeras", () => {
    expect(scoreChimeraCards(0)).toBe(0);
  });
  it("should return 2 points for 1 Chimera", () => {
    expect(scoreChimeraCards(1)).toBe(2);
  });
  it("should return 4 points for 2 Chimeras", () => {
    expect(scoreChimeraCards(2)).toBe(4);
  });
  it("should return 12 points for 3 Chimeras (set of 3)", () => {
    expect(scoreChimeraCards(3)).toBe(12);
  });
  it("should return 14 points for 4 Chimeras (1 set + 1 remaining)", () => {
    expect(scoreChimeraCards(4)).toBe(14);
  });
  it("should return 24 points for 6 Chimeras (2 sets of 3)", () => {
    expect(scoreChimeraCards(6)).toBe(24);
  });
});
