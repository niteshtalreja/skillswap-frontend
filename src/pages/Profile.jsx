import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  addOfferSkill,
  addWantSkill,
  getMyOffers,
  getMyWants,
  removeOfferSkill,
  removeWantSkill,
} from "../services/skillService";

export default function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [offers, setOffers] = useState([]);
  const [wants, setWants] = useState([]);
  const [offerInput, setOfferInput] = useState("");
  const [wantInput, setWantInput] = useState("");
  const [error, setError] = useState("");

  const loadSkills = async () => {
    try {
      const offersRes = await getMyOffers();
      const wantsRes = await getMyWants();
      setOffers(offersRes.data);
      setWants(wantsRes.data);
    } catch (err) {
      console.error("Failed to load skills", err);
    }
  };

  useEffect(() => {
    loadSkills();
  }, []);

  const handleAddOffer = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await addOfferSkill(offerInput);
      setOfferInput("");
      loadSkills();
    } catch (err) {
      setError(err.response?.data || "Failed to add skill");
    }
  };

  const handleAddWant = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await addWantSkill(wantInput);
      setWantInput("");
      loadSkills();
    } catch (err) {
      setError(err.response?.data || "Failed to add skill");
    }
  };

  const handleRemoveOffer = async (skillId) => {
    await removeOfferSkill(skillId);
    loadSkills();
  };

  const handleRemoveWant = async (skillId) => {
    await removeWantSkill(skillId);
    loadSkills();
  };

  return (
    <div style={{ maxWidth: "500px", margin: "50px auto" }}>
      <h2>Welcome, {user?.name}!</h2>
      <Link to="/matches">View My Matches →</Link>
      <p>Email: {user?.email}</p>
      <p>City: {user?.city}</p>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <hr />

      <h3>Skills I Can Teach (Offer)</h3>
      <form onSubmit={handleAddOffer}>
        <input
          type="text"
          placeholder="e.g. Excel"
          value={offerInput}
          onChange={(e) => setOfferInput(e.target.value)}
          required
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {offers.map((o) => (
          <li key={o.id}>
            {o.skill.name}{" "}
            <button onClick={() => handleRemoveOffer(o.skill.id)}>Remove</button>
          </li>
        ))}
      </ul>

      <hr />

      <h3>Skills I Want to Learn (Want)</h3>
      <form onSubmit={handleAddWant}>
        <input
          type="text"
          placeholder="e.g. Guitar"
          value={wantInput}
          onChange={(e) => setWantInput(e.target.value)}
          required
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {wants.map((w) => (
          <li key={w.id}>
            {w.skill.name}{" "}
            <button onClick={() => handleRemoveWant(w.skill.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}