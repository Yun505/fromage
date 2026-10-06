import { BatchWriteCommand } from "@aws-sdk/lib-dynamodb";
import { ddb, TABLES } from "../backend/src/lib/dynamo";
import { transformCheeseRow, RawCheeseRow } from "../shared/transform";

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

async function main() {
  const cheeses = sampleRows.map(transformCheeseRow);
  await ddb.send(new BatchWriteCommand({
    RequestItems: {
      [TABLES.CHEESES]: cheeses.map((c) => ({ PutRequest: { Item: c } })),
    },
  }));
  console.log(`Seeded ${cheeses.length} cheeses into local DynamoDB.`);
}

main().catch(console.error);