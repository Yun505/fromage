import { describe, it, expect } from "vitest";
import { transformCheeseRow } from "./transform";

describe("transformCheeseRow", () => {
  it("transforms a real messy row correctly", () => {
    // This is an actual row from the dataset (Abbaye de Belloc)
    const raw = {
      cheese: "Abbaye de Belloc",
      milk: "sheep",
      country: "France",
      region: "Pays Basque",
      type: "semi-hard, artisan",
      texture: "creamy, dense, firm",
      flavor: "burnt caramel",
      aroma: "lanoline",
      vegetarian: "TRUE",
    };

    const cheese = transformCheeseRow(raw);

    expect(cheese.name).toBe("Abbaye de Belloc");
    expect(cheese.milk).toEqual(["sheep"]);
    expect(cheese.moisture).toBe("semi-hard");
    expect(cheese.processTags).toEqual(["artisan"]);
    expect(cheese.texture).toEqual(["creamy", "dense", "firm"]);
    expect(cheese.vegetarian).toBe(true);
    expect(cheese.cheeseId).toBeTruthy(); // just needs to exist
  });

  it("handles a row full of NA values without crashing", () => {
    const raw = {
      cheese: "Cypress Grove Chevre",
      milk: "goat",
      country: "United States",
      region: "California",
      type: "NA",
      texture: "NA",
      flavor: "NA",
      aroma: "NA",
      vegetarian: "NA",
    };

    const cheese = transformCheeseRow(raw);

    expect(cheese.moisture).toBeNull();
    expect(cheese.texture).toEqual([]);
    expect(cheese.vegetarian).toBeNull();
  });
});