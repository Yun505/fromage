import { describe, it, expect } from "vitest";
import { getPairings } from "./pairingRules";
import type { Cheese } from "../../../shared/types";

function makeCheese(overrides: Partial<Cheese>): Cheese {
  return {
    cheeseId: "test-id", name: "Test Cheese", milk: ["cow"],
    moisture: "hard", processTags: [], region: null, country: null,
    texture: [], flavorProfile: [], aroma: [], pairingTags: [],
    vegetarian: null, ...overrides,
  };
}

describe("getPairings", () => {
  it("returns a moisture-based pairing for hard cheese", () => {
    const result = getPairings(makeCheese({ moisture: "hard" }));
    expect(result.some((p) => p.label.includes("red wine"))).toBe(true);
  });

  it("adds a blue-veined-specific pairing", () => {
    const result = getPairings(makeCheese({ moisture: "soft", processTags: ["blue-veined"] }));
    expect(result.some((p) => p.label.includes("Port"))).toBe(true);
  });

  it("falls back to a safe default when moisture is unknown", () => {
    const result = getPairings(makeCheese({ moisture: null, processTags: [] }));
    expect(result.map((p) => p.label)).toEqual(["Crackers and bread"]);
  });
});