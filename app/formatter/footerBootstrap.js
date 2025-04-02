import keyBy from 'lodash/keyBy';

import ENUM_TYPE from '../constants/enumType';
import { getBootstrap } from './base.bootstrap';

const getFooterFromBootstrapById = () => {
  const bootstrap = getBootstrap();
  const footerById = keyBy(bootstrap?.[ENUM_TYPE.FOOTER], 'id');
  return footerById;
};

export const getFooterByIdFromBootstrap = (id) => {
  const footerData = getFooterFromBootstrapById();
  return footerData[id];
};

export default getFooterFromBootstrapById;
