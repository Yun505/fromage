import type { Cheese, Tasting, TastingInput, PairingSuggestion } from "../../../shared/types";
import mockCheeses from "../mocks/cheeses.json";

// In-memory store standing in for a real backend. Replaced by
// real fetch() calls in Phase 2 — this file is the ONLY thing
// that changes when that happens.
let tastings: Tasting[] = [];

export async function getCheeses(filters?: {
  moisture?: string;
  milk?: string;
  search?: string;
}): Promise<Cheese[]> {
  let results = mockCheeses as Cheese[];

  if (filters?.moisture) {
    results = results.filter((c) => c.moisture === filters.moisture);
  }
  if (filters?.milk) {
    results = results.filter((c) => c.milk.includes(filters.milk as any));
  }
  if (filters?.search) {
    const q = filters.search.toLowerCase();
    results = results.filter((c) => c.name.toLowerCase().includes(q));
  }

  return results;
}

export async function getCheeseById(id: string): Promise<Cheese | undefined> {
  return (mockCheeses as Cheese[]).find((c) => c.cheeseId === id);
}

export async function getPairings(cheeseId: string): Promise<PairingSuggestion[]> {
  const cheese = await getCheeseById(cheeseId);
  if (!cheese) return [];
  // Placeholder
  return cheese.pairingTags.map((tag) => ({
    label: tag.replace("-", " "),
    reason: `Pairs well with ${cheese.moisture ?? "this"} cheeses like ${cheese.name}.`,
  }));
}

export async function createTasting(input: TastingInput): Promise<Tasting> {
  const tasting: Tasting = {
    tastingId: crypto.randomUUID(),
    userId: "local-dev-user", // stub
    cheeseId: input.cheeseId,
    rating: input.rating,
    notes: input.notes,
    date: new Date().toISOString(),
  };
  tastings = [...tastings, tasting];
  return tasting;
}

export async function getMyTastings(): Promise<Tasting[]> {
  return tastings;
}