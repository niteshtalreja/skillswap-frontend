import { useEffect, useState } from 'react';
import { getMyMatches } from '../services/matchService';
import { getMyOffers, getMyWants } from '../services/skillService';
import { sendExchangeRequest } from '../services/exchangeRequestService';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

export default function Matches() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [myOffers, setMyOffers] = useState([]);
  const [myWants, setMyWants] = useState([]);
  const [selectedSenderSkill, setSelectedSenderSkill] = useState('');
  const [selectedReceiverSkill, setSelectedReceiverSkill] = useState('');
  const [message, setMessage] = useState('');
  const [requestLoading, setRequestLoading] = useState(false);
  const [requestSuccess, setRequestSuccess] = useState('');

  useEffect(() => {
    loadMatches();
    loadMySkills();
  }, []);

  const loadMatches = async () => {
    try {
      const res = await getMyMatches();
      setMatches(res.data);
    } catch (err) {
      setError('Failed to load matches');
    } finally {
      setLoading(false);
    }
  };

  const loadMySkills = async () => {
    try {
      const [offersRes, wantsRes] = await Promise.all([
        getMyOffers(),
        getMyWants()
      ]);
      setMyOffers(offersRes.data);
      setMyWants(wantsRes.data);
    } catch (err) {
      console.error('Failed to load skills', err);
    }
  };

  const handleSendRequest = async (e) => {
    e.preventDefault();
    setRequestLoading(true);
    setRequestSuccess('');
    setError('');

    try {
      await sendExchangeRequest({
        receiverId: selectedMatch.matchedUserId,
        senderSkillId: parseInt(selectedSenderSkill),
        receiverSkillId: parseInt(selectedReceiverSkill),
        message: message
      });
      setRequestSuccess('✅ Exchange request sent successfully!');
      setTimeout(() => {
        setShowRequestModal(false);
        setRequestSuccess('');
        setSelectedSenderSkill('');
        setSelectedReceiverSkill('');
        setMessage('');
      }, 2000);
    } catch (err) {
      setError(err.response?.data || 'Failed to send request');
    } finally {
      setRequestLoading(false);
    }
  };

  const openRequestModal = (match) => {
    setSelectedMatch(match);
    setShowRequestModal(true);
    setError('');
    setRequestSuccess('');
  };

  if (loading) return <p className="text-center text-gray-400">Loading matches...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-heading font-bold text-white mb-6">Your Matches</h2>

      {matches.length === 0 ? (
        <p className="text-gray-400">No matches yet. Add more skills to your "Want" list!</p>
      ) : (
        <div className="grid gap-4">
          {matches.map((m, index) => (
            <Card key={index} variant="dark" className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-heading font-bold text-white">{m.matchedUserName}</h3>
                <p className="text-gray-400">{m.matchedUserCity}</p>
                <p className="text-sm text-gray-400">
                  Can teach: <strong className="text-primary">{m.skillName}</strong>
                </p>
              </div>
              <Button onClick={() => openRequestModal(m)}>
                Request Exchange
              </Button>
            </Card>
          ))}
        </div>
      )}

      {/* Modal */}
      {showRequestModal && selectedMatch && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card p-6 rounded-2xl max-w-md w-full border border-border">
            <h3 className="text-xl font-heading font-bold text-white">Send Exchange Request</h3>
            <p className="text-gray-400 mt-2">To: <span className="text-white">{selectedMatch.matchedUserName}</span></p>
            <form onSubmit={handleSendRequest} className="mt-4 space-y-4">
              <div>
                <label className="text-sm text-gray-400">Your Skill to Offer</label>
                <select
                  value={selectedSenderSkill}
                  onChange={(e) => setSelectedSenderSkill(e.target.value)}
                  required
                  className="w-full p-2 bg-dark border border-border rounded-lg text-white focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select your skill...</option>
                  {myOffers.map((offer) => (
                    <option key={offer.id} value={offer.skill.id}>
                      {offer.skill.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-400">Skill You Want to Learn</label>
                <select
                  value={selectedReceiverSkill}
                  onChange={(e) => setSelectedReceiverSkill(e.target.value)}
                  required
                  className="w-full p-2 bg-dark border border-border rounded-lg text-white focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select skill...</option>
                  {myWants.map((want) => (
                    <option key={want.id} value={want.skill.id}>
                      {want.skill.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-400">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Optional message..."
                  className="w-full p-2 bg-dark border border-border rounded-lg text-white min-h-[80px] focus:ring-2 focus:ring-primary"
                />
              </div>
              {error && <p className="text-red-500">{error}</p>}
              {requestSuccess && <p className="text-green-500">{requestSuccess}</p>}
              <div className="flex gap-2 justify-end">
                <Button variant="ghost" onClick={() => setShowRequestModal(false)}>Cancel</Button>
                <Button type="submit" disabled={requestLoading}>
                  {requestLoading ? 'Sending...' : 'Send Request'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}