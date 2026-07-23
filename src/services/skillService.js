import api from "./api";

export const getAllSkills = () => api.get("/skills");
export const addOfferSkill = (skillName) => api.post("/skills/offer", { skillName });
export const addWantSkill = (skillName) => api.post("/skills/want", { skillName });
export const removeOfferSkill = (skillId) => api.delete(`/skills/offer/${skillId}`);
export const removeWantSkill = (skillId) => api.delete(`/skills/want/${skillId}`);
export const getMyOffers = () => api.get("/skills/my-offers");
export const getMyWants = () => api.get("/skills/my-wants");