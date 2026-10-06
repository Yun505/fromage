import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const localEndpoint = process.env.DYNAMODB_ENDPOINT;

// Locally, point at DynamoDB Local with dummy credentials. 
const client = new DynamoDBClient({
  region: process.env.AWS_REGION ?? "us-east-1",
  ...(localEndpoint
    ? {
        endpoint: localEndpoint,
        credentials: { accessKeyId: "local", secretAccessKey: "local" },
      }
    : {}),
});

export const ddb = DynamoDBDocumentClient.from(client);

export const TABLES = {
  CHEESES: "Cheeses",
  TASTINGS: "Tastings",
  USERS: "Users",
} as const;