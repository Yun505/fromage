/** 
 * A cheese
 */
export interface Cheese {
    cheeseId: string;
    name: string;
    milk: MilkType[];
    moisture: Moisture | null;
    processTags: ProcessTag[];
    region: string | null;
    country: string | null;
    texture: string[];
    flavorProfile: string[];
    aroma: string[];
    pairingTags: string[];
    vegetarian: boolean | null;
}
export type MilkType =
  | "cow" | "goat" | "sheep" | "buffalo" | "water buffalo"
  | "camel" | "yak" | "plant-based";

export type Moisture =
  | "fresh" | "soft" | "semi-soft" | "semi-hard" | "semi-firm"
  | "firm" | "hard";

export type ProcessTag =
  | "artisan" | "brined" | "blue-veined" | "soft-ripened"
  | "smear-ripened" | "whey" | "processed" | "organic";

  /** The list of words we recognize as a moisture level, in the
 *  order we check them — order matters because we take the
 *  FIRST match in a comma-separated string. */
export const MOISTURE_WORDS: Moisture[] = [
  "semi-soft", "semi-hard", "semi-firm", // check compound words first
  "fresh", "soft", "firm", "hard",
];

export const PROCESS_WORDS: ProcessTag[] = [
  "artisan", "brined", "blue-veined", "soft-ripened",
  "smear-ripened", "whey", "processed", "organic",
];