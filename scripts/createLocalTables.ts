import { CreateTableCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({
  endpoint: "http://localhost:8000",
  region: "us-east-1",
  credentials: { accessKeyId: "local", secretAccessKey: "local" },
});

async function main() {
  await client.send(new CreateTableCommand({
    TableName: "Cheeses",
    KeySchema: [{ AttributeName: "cheeseId", KeyType: "HASH" }],
    AttributeDefinitions: [{ AttributeName: "cheeseId", AttributeType: "S" }],
    BillingMode: "PAY_PER_REQUEST",
  }));

  await client.send(new CreateTableCommand({
    TableName: "Tastings",
    KeySchema: [{ AttributeName: "tastingId", KeyType: "HASH" }],
    AttributeDefinitions: [
      { AttributeName: "tastingId", AttributeType: "S" },
      { AttributeName: "userId", AttributeType: "S" },
    ],
    GlobalSecondaryIndexes: [{
      IndexName: "byUser",
      KeySchema: [{ AttributeName: "userId", KeyType: "HASH" }],
      Projection: { ProjectionType: "ALL" },
    }],
    BillingMode: "PAY_PER_REQUEST",
  }));

  await client.send(new CreateTableCommand({
    TableName: "Users",
    KeySchema: [{ AttributeName: "userId", KeyType: "HASH" }],
    AttributeDefinitions: [{ AttributeName: "userId", AttributeType: "S" }],
    BillingMode: "PAY_PER_REQUEST",
  }));

  console.log("Local tables created.");
}

main().catch(console.error);