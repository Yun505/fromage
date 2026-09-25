import { Link } from "react-router-dom";
import type { Cheese } from "../../../shared/types";

export function CheeseCard({ cheese }: { cheese: Cheese }) {
  return (
    <Link to={`/cheese/${cheese.cheeseId}`} className="cheese-card">
      <h3>{cheese.name}</h3>
      <p>{cheese.moisture ?? "unknown moisture"} · {cheese.milk.join(", ") || "unknown milk"}</p>
      {cheese.processTags.length > 0 && (
        <p className="tags">{cheese.processTags.join(", ")}</p>
      )}
    </Link>
  );
}