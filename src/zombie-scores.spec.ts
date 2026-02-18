import { describe, it, expect } from "vitest";
import { scoreZombieCards } from "./zombie-scores.js";

describe("Score Card: Zombie", () => {
  it("should return 0 points for 0 Zombies", () => {
    expect(scoreZombieCards(0)).toBe(0);
  });
  it("should return 1 point for 1 Zombie", () => {
    expect(scoreZombieCards(1)).toBe(1);
  });
  it("should return 4 points for 2 Zombies", () => {
    expect(scoreZombieCards(2)).toBe(4);
  });
  it("should return 9 points for 3 Zombies", () => {
    expect(scoreZombieCards(3)).toBe(9);
  });
  it("should return 12 points for 4 Zombies", () => {
    expect(scoreZombieCards(4)).toBe(12);
  });
  it("should return 18 points for 5 Zombies", () => {
    expect(scoreZombieCards(5)).toBe(18);
  });
  it("should return 24 points for 6 Zombies", () => {
    expect(scoreZombieCards(6)).toBe(24);
  });
  it("should return 24 points for more than 6 Zombies (score capped at 6)", () => {
    expect(scoreZombieCards(7)).toBe(24);
  });
});
