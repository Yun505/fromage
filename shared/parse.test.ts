import {describe, it, expect} from "vitest";
import {parseMilk, parseBoolean, parseList, parseType} from "./parse";

describe("parseType", () => {
  it("splits moisture and process tags", () => {
    const result = parseType("semi-soft, artisan, brined");
    expect(result.moisture).toBe("semi-soft");
    expect(result.processTags).toEqual(["artisan", "brined"]);
  });

  it("handles a single moisture word with no process tags", () => {
    const result = parseType("hard");
    expect(result.moisture).toBe("hard");
    expect(result.processTags).toEqual([]);
  });

  it("does not confuse 'soft' with 'semi-soft'", () => {
    const result = parseType("semi-soft");
    expect(result.moisture).toBe("semi-soft");
  });

  it("returns nulls for NA", () => {
    const result = parseType("NA");
    expect(result.moisture).toBeNull();
    expect(result.processTags).toEqual([]);
  });

  it("drops unrecognized tags without crashing", () => {
    const result = parseType("hard, madeupwordlikeidkpineconian");
    expect(result.moisture).toBe("hard");
    expect(result.processTags).toEqual([]);
  });
});

describe("parseMilk", () => {
  it("splits a milk blend", () => {
    expect(parseMilk("cow, goat, sheep")).toEqual(["cow", "goat", "sheep"]);
  });
  it("handles a single milk type", () => {
    expect(parseMilk("cow")).toEqual(["cow"]);
  });
  it("returns empty array for NA", () => {
    expect(parseMilk("NA")).toEqual([]);
  });
});

describe("parseBoolean", () => {
  it("parses TRUE and FALSE", () => {
    expect(parseBoolean("TRUE")).toBe(true);
    expect(parseBoolean("FALSE")).toBe(false);
  });
  it("returns null for NA, not false", () => {
    expect(parseBoolean("NA")).toBeNull();
  });
});

describe("parseList", () => {
  it("splits a comma list and lowercases it", () => {
    expect(parseList("Creamy, Dense, Firm")).toEqual(["creamy", "dense", "firm"]);
  });
  it("returns empty array for NA", () => {
    expect(parseList("NA")).toEqual([]);
  });
});