import api from "./api";

export const getAllSkills = () => api.get("/skills");
export const addOfferSkill = (skillName) => api.post("/skills/offer", { skillName });
export const addWantSkill = (skillName) => api.post("/skills/want", { skillName });
export const getMyOffers = () => api.get("/skills/my-offers");
export const getMyWants = () => api.get("/skills/my-wants");

export const removeOfferSkill = (skillId) => {
  return api.delete(`/skills/offer/${skillId}`);
}

export const removeWantSkill = (skillId) => {
  return api.delete(`/skills/want/${skillId}`);
}