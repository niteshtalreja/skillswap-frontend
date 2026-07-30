import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  getMySentRequests,
  getMyReceivedRequests,
  acceptExchangeRequest,
  rejectExchangeRequest,
  cancelExchangeRequest,
} from '../services/exchangeRequestService';

export default function Requests() {
  const [sentRequests, setSentRequests] = useState([]);
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // ✅ useEffect ke ANDAR loadRequests define karo
  useEffect(() => {
    async function loadRequests() {
      try {
        const [sent, received] = await Promise.all([
          getMySentRequests(),
          getMyReceivedRequests(),
        ]);
        setSentRequests(sent.data);
        setReceivedRequests(received.data);
      } catch (err) {
    console.error('Error loading requests:', err);
        setError('Failed to load requests');
      } finally {
        setLoading(false);
      }
    }

    loadRequests();
  }, []);

  async function handleAccept(id) {
    try {
      await acceptExchangeRequest(id);
      setSuccess('✅ Request accepted!');
      // Reload data
      const [sent, received] = await Promise.all([
        getMySentRequests(),
        getMyReceivedRequests(),
      ]);
      setSentRequests(sent.data);
      setReceivedRequests(received.data);
    } catch (err) {
      setError(err.response?.data || 'Failed to accept');
    }
  }

  async function handleReject(id) {
    try {
      await rejectExchangeRequest(id);
      setSuccess('❌ Request rejected');
      const [sent, received] = await Promise.all([
        getMySentRequests(),
        getMyReceivedRequests(),
      ]);
      setSentRequests(sent.data);
      setReceivedRequests(received.data);
    } catch (err) {
      setError(err.response?.data || 'Failed to reject');
    }
  }

  async function handleCancel(id) {
    try {
      await cancelExchangeRequest(id);
      setSuccess('📌 Request cancelled');
      const [sent, received] = await Promise.all([
        getMySentRequests(),
        getMyReceivedRequests(),
      ]);
      setSentRequests(sent.data);
      setReceivedRequests(received.data);
    } catch (err) {
      setError(err.response?.data || 'Failed to cancel');
    }
  }

  if (loading) return <p style={{ textAlign: 'center' }}>Loading...</p>;

  const statusColor = (s) => {
    if (s === 'PENDING') return '#ffa500';
    if (s === 'ACCEPTED') return '#4CAF50';
    if (s === 'REJECTED') return '#f44336';
    return '#888';
  };

  return (
    <div style={{ maxWidth: '700px', margin: '50px auto', padding: '0 20px' }}>
      <h2>My Exchange Requests</h2>
      <Link to="/profile">← Back to Profile</Link>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      <h3>📩 Received</h3>
      {receivedRequests.length === 0 ? (
        <p>No received requests</p>
      ) : (
        receivedRequests.map((req) => (
          <div key={req.id} style={{ border: '1px solid #ccc', padding: '16px', margin: '10px 0', borderRadius: '8px' }}>
            <strong>{req.sender.name}</strong> wants to learn <strong>{req.receiverSkill.name}</strong>
            <br />
            <small>They offer: {req.senderSkill.name}</small>
            <br />
            <small>Message: {req.message || 'No message'}</small>
            <br />
            <span style={{ color: statusColor(req.status), fontWeight: 'bold' }}>Status: {req.status}</span>
            {req.status === 'PENDING' && (
              <div style={{ marginTop: '10px' }}>
                <button onClick={() => handleAccept(req.id)} style={{ marginRight: '8px', padding: '6px 12px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px' }}>Accept</button>
                <button onClick={() => handleReject(req.id)} style={{ padding: '6px 12px', background: '#f44336', color: 'white', border: 'none', borderRadius: '4px' }}>Reject</button>
              </div>
            )}
          </div>
        ))
      )}

      <h3>📤 Sent</h3>
      {sentRequests.length === 0 ? (
        <p>No sent requests</p>
      ) : (
        sentRequests.map((req) => (
          <div key={req.id} style={{ border: '1px solid #ccc', padding: '16px', margin: '10px 0', borderRadius: '8px' }}>
            <strong>To: {req.receiver.name}</strong>
            <br />
            <small>You offer: {req.senderSkill.name}</small>
            <br />
            <small>You want: {req.receiverSkill.name}</small>
            <br />
            <span style={{ color: statusColor(req.status), fontWeight: 'bold' }}>Status: {req.status}</span>
            {req.status === 'PENDING' && (
              <div style={{ marginTop: '10px' }}>
                <button onClick={() => handleCancel(req.id)} style={{ padding: '6px 12px', background: '#888', color: 'white', border: 'none', borderRadius: '4px' }}>Cancel</button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}