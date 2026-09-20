import { describe, it, expect } from "vitest";
import { add } from "./example.js";

describe("add", () => {
  it("should add two numbers", () => {
    expect(add(1, 2)).toBe(3);
  });
});
