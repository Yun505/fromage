import type {
  Cheese,
  Tasting,
  TastingInput,
  PairingSuggestion,
} from "../../../shared/types";

const API_BASE = "http://localhost:3001";

// Turns a failed response into a thrown Error, using the
// server's { error: "..." } message when there is one.
async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = (await res.json().catch(() => ({}))) as { error?: string };
    throw new Error(body.error ?? `Request failed (${res.status})`);
  }
  return res.json() as Promise<T>;
}

export async function getCheeses(
  filters: {
    moisture?: string | undefined;
    milk?: string | undefined;
    search?: string | undefined;
  } = {}
): Promise<Cheese[]> {
  // Build the query string by hand: passing undefined values to
  // URLSearchParams would send the literal text "undefined".
  const params = new URLSearchParams();
  if (filters.moisture) params.set("moisture", filters.moisture);
  if (filters.milk) params.set("milk", filters.milk);
  if (filters.search) params.set("search", filters.search);

  const query = params.toString();
  const res = await fetch(`${API_BASE}/cheeses${query ? `?${query}` : ""}`);
  return handle<Cheese[]>(res);
}

export async function getCheeseById(id: string): Promise<Cheese | undefined> {
  const res = await fetch(`${API_BASE}/cheeses/${encodeURIComponent(id)}`);
  if (res.status === 404) return undefined;
  return handle<Cheese>(res);
}

export async function getPairings(cheeseId: string): Promise<PairingSuggestion[]> {
  const res = await fetch(
    `${API_BASE}/cheeses/${encodeURIComponent(cheeseId)}/pairings`
  );
  if (res.status === 404) return [];
  return handle<PairingSuggestion[]>(res);
}

export async function createTasting(input: TastingInput): Promise<Tasting> {
  const res = await fetch(`${API_BASE}/tastings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  return handle<Tasting>(res);
}

export async function getMyTastings(): Promise<Tasting[]> {
  const res = await fetch(`${API_BASE}/tastings/me`);
  return handle<Tasting[]>(res);
}