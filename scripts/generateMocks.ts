import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { transformCheeseRow, RawCheeseRow } from "../shared/transform";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "../frontend/src/mocks");
const outFile = join(outDir, "cheeses.json");
// A small, real sample pulled directly from the TidyTuesday CSV —
// enough variety to exercise filtering (different moisture levels,
// milk types, and one row with NA values).
const sampleRows: RawCheeseRow[] = [
  {
    cheese: "Abbaye de Belloc",
    milk: "sheep",
    country: "France",
    region: "Pays Basque",
    type: "semi-hard, artisan",
    texture: "creamy, dense, firm",
    flavor: "burnt caramel",
    aroma: "lanoline",
    vegetarian: "TRUE",
  },
  {
    cheese: "Cypress Grove Chevre",
    milk: "goat",
    country: "United States",
    region: "California",
    type: "NA",
    texture: "NA",
    flavor: "NA",
    aroma: "NA",
    vegetarian: "NA",
  },
  {
    cheese: "Roquefort",
    milk: "sheep",
    country: "France",
    region: "Roquefort-sur-Soulzon",
    type: "soft, blue-veined",
    texture: "crumbly, moist",
    flavor: "salty, sharp, tangy",
    aroma: "pungent",
    vegetarian: "FALSE",
  },
  {
    cheese: "Cheddar",
    milk: "cow",
    country: "United Kingdom",
    region: "Somerset",
    type: "hard, artisan",
    texture: "firm, smooth",
    flavor: "sharp, nutty",
    aroma: "mild",
    vegetarian: "TRUE",
  },
];

const mocks = sampleRows.map(transformCheeseRow);
mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, JSON.stringify(mocks, null, 2));
console.log(`Wrote ${mocks.length} cheeses to ${outFile}`);