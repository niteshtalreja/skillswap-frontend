import api from "./api";

export const getMyMatches = () => api.get("/matches");