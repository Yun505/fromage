import { useEffect, useState } from "react";
import { getCheeses } from "../api/client";
import type { Cheese } from "../../../shared/types";
import { CheeseCard } from "./CheeseCard";

export function CheeseList() {
  const [cheeses, setCheeses] = useState<Cheese[]>([]);
  const [search, setSearch] = useState("");
  const [moisture, setMoisture] = useState("");

  useEffect(() => {
    getCheeses({ search: search || undefined, moisture: moisture || undefined })
      .then(setCheeses);
  }, [search, moisture]);

  return (
    <div>
      <input
        placeholder="Search cheeses..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select value={moisture} onChange={(e) => setMoisture(e.target.value)}>
        <option value="">All moisture levels</option>
        <option value="soft">Soft</option>
        <option value="semi-hard">Semi-hard</option>
        <option value="hard">Hard</option>
      </select>
      <div className="cheese-grid">
        {cheeses.map((c) => (
          <CheeseCard key={c.cheeseId} cheese={c} />
        ))}
      </div>
      {cheeses.length === 0 && <p>No cheeses match your filters.</p>}
    </div>
  );
}