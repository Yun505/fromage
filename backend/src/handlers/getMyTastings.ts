import { QueryCommand } from "@aws-sdk/lib-dynamodb";
import { ddb, TABLES } from "../lib/dynamo";
import type { HandlerEvent, HandlerResult } from "../lib/handlerTypes";

export async function getMyTastings(event: HandlerEvent): Promise<HandlerResult> {
  if (!event.userId) return { statusCode: 401, body: { error: "Unauthorized" } };

  const { Items } = await ddb.send(new QueryCommand({
    TableName: TABLES.TASTINGS,
    IndexName: "byUser",
    KeyConditionExpression: "userId = :uid",
    ExpressionAttributeValues: { ":uid": event.userId },
  }));

  return { statusCode: 200, body: Items ?? [] };
}