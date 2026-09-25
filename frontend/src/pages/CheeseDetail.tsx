import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCheeseById, getPairings } from "../api/client";
import type { Cheese, PairingSuggestion } from "../../../shared/types";
import { TastingForm } from "../components/TastingForm";

export function CheeseDetail() {
  const { id } = useParams<{ id: string }>();
  const [cheese, setCheese] = useState<Cheese | null>(null);
  const [pairings, setPairings] = useState<PairingSuggestion[]>([]);

  useEffect(() => {
    if (!id) return;
    getCheeseById(id).then((c) => setCheese(c ?? null));
    getPairings(id).then(setPairings);
  }, [id]);

  if (!cheese) return <p>Loading...</p>;

  return (
    <div>
      <h1>{cheese.name}</h1>
      <p>{cheese.country ?? "Unknown origin"} · {cheese.region ?? ""}</p>
      <p><strong>Milk:</strong> {cheese.milk.join(", ") || "unknown"}</p>
      <p><strong>Texture:</strong> {cheese.texture.join(", ") || "unknown"}</p>
      <p><strong>Flavor:</strong> {cheese.flavorProfile.join(", ") || "unknown"}</p>

      <h2>Pairings</h2>
      {pairings.length === 0 && <p>No pairing data yet for this cheese.</p>}
      <ul>
        {pairings.map((p, i) => (
          <li key={i}><strong>{p.label}</strong> — {p.reason}</li>
        ))}
      </ul>

      <h2>Log a Tasting</h2>
      <TastingForm cheeseId={cheese.cheeseId} />
    </div>
  );
}