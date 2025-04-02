import ENUM_TYPE from '../constants/enumType';
import { getFilter } from './base.bootstrap';

const getIntroFromSettings = () => {
  const filterByName = getFilter(ENUM_TYPE.SETTINGS);
  const filter = filterByName?.intro;
  return filter;
};

export const getAssessmentFromSettings = () => {
  const filterByName = getFilter(ENUM_TYPE.SETTINGS);
  const filter = filterByName?.assessment;
  return filter;
};

export const getLoginTypeFromSetting = () => {
  const filterByName = getFilter(ENUM_TYPE.SETTINGS);
  const filter = filterByName?.login;
  return filter;
};

export const getCandidateFromSetting = () => {
  const filterByName = getFilter(ENUM_TYPE.SETTINGS);
  const filter = filterByName?.candidate;
  return filter;
};

export default getIntroFromSettings;
