import { describe, it, expect } from "vitest";
import { scoreOrthrusCards } from "./orthrus-scores.js";

describe("Score Card: Orthrus", () => {
  it("should return 0 points for negative card counts", () => {
    expect(scoreOrthrusCards(-1)).toBe(0);
    expect(scoreOrthrusCards(-5)).toBe(0);
  });
  it("should return 0 points for 0 Orthrus", () => {
    expect(scoreOrthrusCards(0)).toBe(0);
  });
  it("should return 2 points for 1 Orthrus", () => {
    expect(scoreOrthrusCards(1)).toBe(2);
  });
  it("should return 7 points for 2 Orthrus (set of 2)", () => {
    expect(scoreOrthrusCards(2)).toBe(7);
  });
  it("should return 9 points for 3 Orthrus (1 set + 1 remaining)", () => {
    expect(scoreOrthrusCards(3)).toBe(9);
  });
  it("should return 14 points for 4 Orthrus (2 sets of 2)", () => {
    expect(scoreOrthrusCards(4)).toBe(14);
  });
  it("should return 16 points for 5 Orthrus (2 sets + 1 remaining)", () => {
    expect(scoreOrthrusCards(5)).toBe(16);
  });
});
