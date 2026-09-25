import { describe, it, expect } from "vitest";
import { getCheeses } from "./client";

describe("getCheeses", () => {
  it("filters by moisture", async () => {
    const results = await getCheeses({ moisture: "hard" });
    expect(results.every((c) => c.moisture === "hard")).toBe(true);
  });

  it("filters by search term, case-insensitive", async () => {
    const results = await getCheeses({ search: "cheddar" });
    expect(results.some((c) => c.name === "Cheddar")).toBe(true);
  });

  it("returns everything with no filters", async () => {
    const results = await getCheeses();
    expect(results.length).toBeGreaterThan(0);
  });
});