import { useState } from "react";
import { createTasting } from "../api/client";

export function TastingForm({ cheeseId }: { cheeseId: string }) {
  const [rating, setRating] = useState(3);
  const [notes, setNotes] = useState("");
  const [saved, setSaved] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await createTasting({ cheeseId, rating, notes });
    setSaved(true);
    setNotes("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Rating:
        <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
          {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n}</option>)}
        </select>
      </label>
      <textarea
        placeholder="Notes..."
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      <button type="submit">Save Tasting</button>
      {saved && <p>Saved!</p>}
    </form>
  );
}