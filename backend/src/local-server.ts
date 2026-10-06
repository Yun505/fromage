import express from "express";
import cors from "cors";
import { getCheeses } from "./handlers/getCheeses";
import { getCheeseById } from "./handlers/getCheeseById";
import { getPairingsHandler } from "./handlers/getPairings";
import { createTasting } from "./handlers/createTasting";
import { getMyTastings } from "./handlers/getMyTastings";
import type { HandlerEvent, HandlerResult } from "./lib/handlerTypes";

const app = express();
app.use(cors()); 
app.use(express.json());

// Stub auth: every request is "logged in" as this fake user
function fakeAuth(): string {
  return "local-dev-user";
}

function toExpress(handler: (e: HandlerEvent) => Promise<HandlerResult>) {
  return async (req: express.Request, res: express.Response) => {
    const event: HandlerEvent = {
      pathParams: req.params as Record<string, string>,
      queryParams: req.query as Record<string, string | undefined>,
      body: req.body,
      userId: fakeAuth(),
    };
    const result = await handler(event);
    res.status(result.statusCode).json(result.body);
  };
}

app.get("/cheeses", toExpress(getCheeses));
app.get("/cheeses/:id", toExpress(getCheeseById));
app.get("/cheeses/:id/pairings", toExpress(getPairingsHandler));
app.post("/tastings", toExpress(createTasting));
app.get("/tastings/me", toExpress(getMyTastings));

const PORT = 3001;
app.listen(PORT, () => console.log(`Local API running on http://localhost:${PORT}`));