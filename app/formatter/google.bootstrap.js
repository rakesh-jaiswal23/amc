import ENUM_TYPE from '../constants/enumType';
import { getFilter } from './base.bootstrap';

export const GOOGLE_CONSTANTS = {
  LOCATION: 'location',
  ANALYTICS: 'analytics',
  RECAPTCHA: 'recaptcha',
};

export const getGoogleConstants = (key) => {
  const filter = getFilter(ENUM_TYPE.GOOGLE);
  return filter[key];
};

export const getRecaptchaKey = () =>
  getGoogleConstants(GOOGLE_CONSTANTS.RECAPTCHA);
