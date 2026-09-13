# API Contract
Source of truth for what the frontend can ask the backend for. 

| Method | Endpoint | Auth? | Request | Response |
|---|---|---|---|---|
| GET | `/cheeses` | No | query: `moisture?`, `milk?`, `region?`, `search?` | `Cheese[]` |
| GET | `/cheeses/{id}` | No | – | `Cheese` |
| GET | `/cheeses/{id}/pairings` | No | – | `PairingSuggestion[]` |
| POST | `/tastings` | Yes | `TastingInput` | `Tasting` |
| GET | `/tastings/me` | Yes | – | `Tasting[]` |
| GET | `/users/me` | Yes | – | `User` |

## Notes
- **Auth-free browsing is intentional:** `/cheeses*` endpoints require no auth so anyone can browse the catalog without creating an account. Only *writing* data (`POST /tastings`) or reading *personal* data (`/tastings/me`, `/users/me`) requires auth.
- **`TastingInput` vs `Tasting`:** see `schema.md` — the client can't set its own `userId` or `tastingId`.
