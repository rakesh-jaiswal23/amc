import ENUM_TYPE from '../constants/enumType';
import { getFilter } from './base.bootstrap';

const getAIModelFromBootStrap = () => {
  const filterByName = getFilter(ENUM_TYPE.AI_MODEL);
  const filter = filterByName;
  return filter;
};

export default getAIModelFromBootStrap;
