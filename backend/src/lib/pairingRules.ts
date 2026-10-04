import type { Cheese, Moisture, ProcessTag, PairingSuggestion } from "../../../shared/types";

/**
 * A static lookup table, keyed on moisture, of pairing suggestions.
 */
const MOISTURE_PAIRINGS: Record<Moisture, PairingSuggestion[]> = {
  fresh: [{ label: "Sparkling wine", reason: "cuts through fresh cheese's mild creaminess" }],
  soft: [{ label: "Light-bodied red or sparkling wine", reason: "won't overpower a delicate cheese" }],
  "semi-soft": [{ label: "Fruity white wine", reason: "balances semi-soft cheese's mild tang" }],
  "semi-hard": [{ label: "Medium-bodied red wine", reason: "matches semi-hard cheese's firmer texture" }],
  "semi-firm": [{ label: "Medium-bodied red wine", reason: "matches a firmer texture and stronger flavor" }],
  firm: [{ label: "Full-bodied red wine", reason: "stands up to a firm, concentrated flavor" }],
  hard: [{ label: "Full-bodied red wine or aged spirits", reason: "matches hard cheese's intensity" }],
};

const PROCESS_TAG_PAIRINGS: Partial<Record<ProcessTag, PairingSuggestion>> = {
  "blue-veined": { label: "Sweet dessert wine (e.g. Port)", reason: "sweetness balances blue cheese's sharpness" },
  brined: { label: "Crisp, dry white wine", reason: "cuts through brined cheese's saltiness" },
  "soft-ripened": { label: "Champagne or dry sparkling wine", reason: "complements a bloomy, buttery rind" },
};

export function getPairings(cheese: Cheese): PairingSuggestion[] {
  const suggestions: PairingSuggestion[] = [];

  if (cheese.moisture) {
    suggestions.push(...MOISTURE_PAIRINGS[cheese.moisture]);
  }

  for (const tag of cheese.processTags) {
    const tagPairing = PROCESS_TAG_PAIRINGS[tag];
    if (tagPairing) suggestions.push(tagPairing);
  }

  if (suggestions.length === 0) {
    suggestions.push({ label: "Crackers and bread", reason: "a safe pairing when specific data is unavailable" });
  }

  return suggestions;
}