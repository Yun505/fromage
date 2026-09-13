import {randomUUID} from "crypto";
import {Cheese} from "./types";
import { parseType, parseMilk, parseBoolean, parseList } from "./parse";

// Matches the raw CSV column names exactly.
export interface RawCheeseRow{
    cheese: string;
    milk: string;
    country: string;
    region: string;
    type: string;
    texture: string;
    flavor: string;
    aroma: string;
    vegetarian: string;
}

/**
 * Converts one raw CSV row (all strings) into a clean Cheese
 * object, ready to write to DynamoDB.
 */
export function transformCheeseRow(row: RawCheeseRow): Cheese {
  const { moisture, processTags } = parseType(row.type);

  return {
    cheeseId: randomUUID(),
    name: row.cheese,
    milk: parseMilk(row.milk),
    moisture,
    processTags,
    region: row.region?.trim().toUpperCase() === "NA" ? null : row.region,
    country: row.country?.trim().toUpperCase() === "NA" ? null : row.country,
    texture: parseList(row.texture),
    flavorProfile: parseList(row.flavor),
    aroma: parseList(row.aroma),
    pairingTags: derivePairingTags(moisture, processTags),
    vegetarian: parseBoolean(row.vegetarian),
  };
}

/**
 * Derive a couple of pairing tags directly
 * from moisture, so getPairings() has something real to work with, until I implement this later
 */
function derivePairingTags(
  moisture: ReturnType<typeof parseType>["moisture"],
  processTags: ReturnType<typeof parseType>["processTags"]
): string[] {
  const tags: string[] = [];
  if (moisture === "soft" || moisture === "fresh") tags.push("light-wine");
  if (moisture === "hard" || moisture === "semi-hard") tags.push("full-bodied-wine");
  if (processTags.includes("blue-veined")) tags.push("dessert-wine");
  return tags;
}