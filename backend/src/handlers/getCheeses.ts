import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { ddb, TABLES } from "../lib/dynamo";
import type { HandlerEvent, HandlerResult } from "../lib/handlerTypes";
import type { Cheese } from "../../../shared/types";

export async function getCheeses(event: HandlerEvent): Promise<HandlerResult> {
  const { Items } = await ddb.send(new ScanCommand({ TableName: TABLES.CHEESES }));
  let cheeses = (Items ?? []) as Cheese[];

  const { moisture, milk, search } = event.queryParams;
  if (moisture) cheeses = cheeses.filter((c) => c.moisture === moisture);
  if (milk) cheeses = cheeses.filter((c) => c.milk.includes(milk as any));
  if (search) {
    const q = search.toLowerCase();
    cheeses = cheeses.filter((c) => c.name.toLowerCase().includes(q));
  }

  return { statusCode: 200, body: cheeses };
}