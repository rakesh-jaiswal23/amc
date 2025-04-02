import UI from '../constants/ui';
import CANDIDATE_TYPE from '../constants/candidateType';

export const getMarkedFormatter = (value) =>
  value.startsWith(UI.MARKED) ? value.substring(7) : value;

export const getChipLabel = (item) =>
  item.id === CANDIDATE_TYPE.INTERVIEWED_T1 ? 'Interviewed' : item.value;
