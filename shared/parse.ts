import {Moisture, MilkType, ProcessTag, MOISTURE_WORDS, PROCESS_WORDS}  from "./types";

/**
 * Splits the raw cheese.com `type` field into a moisture level
 * and a list of process tags.
 *
 * Example:
 *   parseType("semi-soft, artisan, brined")
 *   -> { moisture: "semi-soft", processTags: ["artisan", "brined"] }
 *
 *   parseType("NA")
 *   -> { moisture: null, processTags: [] }
 */
export function parseType(raw: string): {
    moisture: Moisture | null, 
    processTags: ProcessTag[]} {
    if (!raw || raw.trim().toUpperCase() === "NA"){
        return {moisture: null, processTags: []}
    }
    const parts = raw.split(",").map((p) => p.trim().toLowerCase());

    let moisture: Moisture | null = null;
    const processTags: ProcessTag[] = [];

    for (const part of parts) {
        if(!moisture && MOISTURE_WORDS.includes(part as Moisture)){
            moisture = part as Moisture;
        } else if(PROCESS_WORDS.includes(part as ProcessTag)){
            processTags.push(part as ProcessTag);
        }
        // any part matching neither list is dropped
        // ex: "hard, smear-ripened" match but a typo or unrecognized tag would fall through here. 
    }
    return {moisture, processTags};
}

/**
 * "cow, goat, sheep" -> ["cow", "goat", "sheep"]
 * "NA" or "" -> []
 */
export function parseMilk(raw: string): MilkType[] {
  if (!raw || raw.trim().toUpperCase() === "NA") {
    return [];
  }
  return raw.split(",").map((m) => m.trim().toLowerCase()) as MilkType[];
}

/**
 * The source uses TRUE / FALSE / NA as text. We want real
 * booleans, but NA must stay "unknown" — NOT false. Silently
 * treating "unknown" as "not vegetarian" would misinform anyone
 * relying on this field for a dietary restriction.
 */
export function parseBoolean(raw: string): boolean | null {
  const normalized = raw.trim().toUpperCase();
  if (normalized === "TRUE") return true;
  if (normalized === "FALSE") return false;
  return null; // covers "NA" and anything unexpected
}

/**
 * "creamy, dense, firm" -> ["creamy", "dense", "firm"]
 * Used for texture, flavor, and aroma — same comma-separated
 * shape in the source data.
 */
export function parseList(raw: string): string[] {
  if (!raw || raw.trim().toUpperCase() === "NA") {
    return [];
  }
  return raw.split(",").map((s) => s.trim().toLowerCase());
}