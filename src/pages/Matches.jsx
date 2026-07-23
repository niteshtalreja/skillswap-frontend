import { useEffect, useState } from "react";
import { getMyMatches } from "../services/matchService";

export default function Matches() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getMyMatches()
      .then((res) => setMatches(res.data))
      .catch(() => setError("Failed to load matches"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p style={{ textAlign: "center" }}>Loading matches...</p>;
  if (error) return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;

  return (
    <div style={{ maxWidth: "500px", margin: "50px auto" }}>
      <h2>Your Matches</h2>

      {matches.length === 0 ? (
        <p>No matches yet. Add more skills to your "Want" list!</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {matches.map((m, index) => (
            <li
              key={index}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "12px",
                marginBottom: "10px",
              }}
            >
              <strong>{m.matchedUserName}</strong> ({m.matchedUserCity})
              <br />
              Can teach you: <strong>{m.skillName}</strong>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}