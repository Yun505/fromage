import { randomUUID } from "crypto";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { ddb, TABLES } from "../lib/dynamo";
import type { HandlerEvent, HandlerResult } from "../lib/handlerTypes";
import type { TastingInput, Tasting } from "../../../shared/types";

export async function createTasting(event: HandlerEvent): Promise<HandlerResult> {
  if (!event.userId) return { statusCode: 401, body: { error: "Unauthorized" } };

  const input = event.body as TastingInput;
  if (!input.cheeseId || input.rating < 1 || input.rating > 5) {
    return { statusCode: 400, body: { error: "Invalid tasting input" } };
  }

  const tasting: Tasting = {
    tastingId: randomUUID(),
    userId: event.userId, // from auth, NEVER from the request body
    cheeseId: input.cheeseId,
    rating: input.rating,
    notes: input.notes ?? "",
    date: new Date().toISOString(),
  };

  await ddb.send(new PutCommand({ TableName: TABLES.TASTINGS, Item: tasting }));
  return { statusCode: 201, body: tasting };
}