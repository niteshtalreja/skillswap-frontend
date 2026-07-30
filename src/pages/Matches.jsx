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

  // Load data function
  const loadData = () => {
    Promise.all([getMySentRequests(), getMyReceivedRequests()])
      .then(([sent, received]) => {
        setSentRequests(sent.data);
        setReceivedRequests(received.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load requests');
        setLoading(false);
      });
  };

  // Accept handler
  const handleAccept = (id) => {
    acceptExchangeRequest(id)
      .then(() => {
        setSuccess('✅ Request accepted!');
        loadData();
      })
      .catch(() => setError('Failed to accept'));
  };

  // Reject handler
  const handleReject = (id) => {
    rejectExchangeRequest(id)
      .then(() => {
        setSuccess('❌ Request rejected');
        loadData();
      })
      .catch(() => setError('Failed to reject'));
  };

  // Cancel handler
  const handleCancel = (id) => {
    cancelExchangeRequest(id)
      .then(() => {
        setSuccess('📌 Request cancelled');
        loadData();
      })
      .catch(() => setError('Failed to cancel'));
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) return <p style={{ textAlign: 'center' }}>Loading...</p>;

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING':
        return '#ffa500';
      case 'ACCEPTED':
        return '#4CAF50';
      case 'REJECTED':
        return '#f44336';
      default:
        return '#888';
    }
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
          <div
            key={req.id}
            style={{
              border: '1px solid #ccc',
              padding: '16px',
              margin: '10px 0',
              borderRadius: '8px',
              background: req.status === 'PENDING' ? '#fff8e1' : 'white',
            }}
          >
            <strong>{req.sender.name}</strong> wants to learn{' '}
            <strong>{req.receiverSkill.name}</strong>
            <br />
            <small>They offer: {req.senderSkill.name}</small>
            <br />
            <small>Message: {req.message || 'No message'}</small>
            <br />
            <span style={{ color: getStatusColor(req.status), fontWeight: 'bold' }}>
              Status: {req.status}
            </span>
            {req.status === 'PENDING' && (
              <div style={{ marginTop: '10px' }}>
                <button
                  onClick={() => handleAccept(req.id)}
                  style={{
                    marginRight: '8px',
                    padding: '6px 12px',
                    background: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Accept
                </button>
                <button
                  onClick={() => handleReject(req.id)}
                  style={{
                    padding: '6px 12px',
                    background: '#f44336',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Reject
                </button>
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
          <div
            key={req.id}
            style={{
              border: '1px solid #ccc',
              padding: '16px',
              margin: '10px 0',
              borderRadius: '8px',
            }}
          >
            <strong>To: {req.receiver.name}</strong>
            <br />
            <small>You offer: {req.senderSkill.name}</small>
            <br />
            <small>You want: {req.receiverSkill.name}</small>
            <br />
            <span style={{ color: getStatusColor(req.status), fontWeight: 'bold' }}>
              Status: {req.status}
            </span>
            {req.status === 'PENDING' && (
              <div style={{ marginTop: '10px' }}>
                <button
                  onClick={() => handleCancel(req.id)}
                  style={{
                    padding: '6px 12px',
                    background: '#888',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}