
import STORAGE_KEY from '../constants/storageKey';

export const getLoginDetailFromSession = () => {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem(STORAGE_KEY.SESSION_DETAILS));
  }
  return null;
};

export const setLoginDetailInSession = (sessionDetails) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY.SESSION_DETAILS, JSON.stringify(sessionDetails));
  }
};

export const setPlanDetails = (details) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY.PRICE_PLAN_DETAILS, JSON.stringify(details));
  }
};

export const getPlanDetails = () => {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem(STORAGE_KEY.PRICE_PLAN_DETAILS));
  }
  return null;
};

export const setCareerPath = (careerpath) => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(STORAGE_KEY.CAREER_PATH, JSON.stringify(careerpath));
  }
};

export const getCareerPath = () => {
  if (typeof window !== "undefined") {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY.CAREER_PATH));
  }
  return null;
};
