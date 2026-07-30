import api from './api';

// Send exchange request
export const sendExchangeRequest = (data) => {
    return api.post('/exchange/request', data);
};

// Accept exchange request
export const acceptExchangeRequest = (requestId) => {
    return api.put(`/exchange/request/${requestId}/accept`);
};

// Reject exchange request
export const rejectExchangeRequest = (requestId) => {
    return api.put(`/exchange/request/${requestId}/reject`);
};

// Cancel exchange request
export const cancelExchangeRequest = (requestId) => {
    return api.put(`/exchange/request/${requestId}/cancel`);
};

// Get my sent requests
export const getMySentRequests = () => {
    return api.get('/exchange/my-requests/sent');
};

// Get my received requests
export const getMyReceivedRequests = () => {
    return api.get('/exchange/my-requests/received');
};