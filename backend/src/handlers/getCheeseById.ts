import { GetCommand } from "@aws-sdk/lib-dynamodb";
import { ddb, TABLES } from "../lib/dynamo";
import type { HandlerEvent, HandlerResult } from "../lib/handlerTypes";

export async function getCheeseById(event: HandlerEvent): Promise<HandlerResult> {
  const { Item } = await ddb.send(new GetCommand({
    TableName: TABLES.CHEESES,
    Key: { cheeseId: event.pathParams.id },
  }));

  if (!Item) return { statusCode: 404, body: { error: "Cheese not found" } };
  return { statusCode: 200, body: Item };
}