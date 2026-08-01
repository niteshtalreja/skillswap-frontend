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
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";

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
    try {
      await removeOfferSkill(skillId);
      const offersRes = await getMyOffers();
      setOffers(offersRes.data);
    } catch (error) {
      console.error("Error removing offer skill:", error);
      alert("Failed to remove skill. Please try again.");
    }
  };

  const handleRemoveWant = async (skillId) => {
    try {
      await removeWantSkill(skillId);
      const wantsRes = await getMyWants();
      setWants(wantsRes.data);
    } catch (error) {
      console.error("Error removing want skill:", error);
      alert("Failed to remove skill. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card variant="dark">
        <h2 className="text-2xl font-heading font-bold text-white">Welcome, {user?.name}!</h2>
        <Link to="/matches" className="text-primary hover:text-primary/80 transition-colors mt-2 inline-block">
          View My Matches →
        </Link>
        <p className="text-gray-400 mt-2">Email: {user?.email}</p>
        <p className="text-gray-400">City: {user?.city}</p>

        {error && <p className="text-red-500 mt-4">{error}</p>}

        <hr className="my-6 border-border" />

        <h3 className="text-lg font-heading font-bold text-white">Skills I Can Teach (Offer)</h3>
        <form onSubmit={handleAddOffer} className="flex gap-2 mt-2">
          <input
            type="text"
            placeholder="e.g. Excel"
            value={offerInput}
            onChange={(e) => setOfferInput(e.target.value)}
            className="flex-1 p-2 bg-dark border border-border rounded-lg text-white focus:ring-2 focus:ring-primary"
            required
          />
          <Button type="submit" variant="success" size="sm">Add</Button>
        </form>
        <ul className="mt-4 space-y-2">
          {offers.map((o) => (
            <li key={o.id} className="flex justify-between items-center bg-dark p-3 rounded-lg border border-border">
              <span className="text-white">{o.skill.name}</span>
              <Button variant="danger" size="sm" onClick={() => handleRemoveOffer(o.skill.id)}>Remove</Button>
            </li>
          ))}
        </ul>

        <hr className="my-6 border-border" />

        <h3 className="text-lg font-heading font-bold text-white">Skills I Want to Learn (Want)</h3>
        <form onSubmit={handleAddWant} className="flex gap-2 mt-2">
          <input
            type="text"
            placeholder="e.g. Guitar"
            value={wantInput}
            onChange={(e) => setWantInput(e.target.value)}
            className="flex-1 p-2 bg-dark border border-border rounded-lg text-white focus:ring-2 focus:ring-primary"
            required
          />
          <Button type="submit" variant="success" size="sm">Add</Button>
        </form>
        <ul className="mt-4 space-y-2">
          {wants.map((w) => (
            <li key={w.id} className="flex justify-between items-center bg-dark p-3 rounded-lg border border-border">
              <span className="text-white">{w.skill.name}</span>
              <Button variant="danger" size="sm" onClick={() => handleRemoveWant(w.skill.id)}>Remove</Button>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}