import { GetCommand } from "@aws-sdk/lib-dynamodb";
import { ddb, TABLES } from "../lib/dynamo";
import { getPairings as computePairings } from "../lib/pairingRules";
import type { HandlerEvent, HandlerResult } from "../lib/handlerTypes";
import type { Cheese } from "../../../shared/types";

export async function getPairingsHandler(event: HandlerEvent): Promise<HandlerResult> {
  const { Item } = await ddb.send(new GetCommand({
    TableName: TABLES.CHEESES,
    Key: { cheeseId: event.pathParams.id },
  }));

  if (!Item) return { statusCode: 404, body: { error: "Cheese not found" } };
  return { statusCode: 200, body: computePairings(Item as Cheese) };
}