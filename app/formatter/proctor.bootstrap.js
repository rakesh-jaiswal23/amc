import ENUM_TYPE from '../constants/enumType';
import { getFilter } from './base.bootstrap';
import { getAnomalyTypeList } from './candidateBootstrap';

export const PROCTOR_CONSTANTS = {
  ANOMALY_DETECTION_FREQ: 'anomalydetectionfreq',
  DATA_SEND_FREQ: 'datasendfreq',
  MAX_FREQ_COUNT: 'maxfreqcount',
  MAX_SAMPLES_SENT: 'maxsamplessent',
  MAX_THRESHOLD: 'maxthreshold',
  MED_FREQ_COUNT: 'medfreqcount',
  MED_THRESHOLD: 'medthreshold',
  MIN_FREQ_COUNT: 'minfreqcount',
  MIN_THRESHOLD: 'minthreshold',
  SUCCESS_THRESHOLD: 'successthreshold',
  SHOW_WARNING: 'showwarning',
  IMAGE_QUALITY: 'imagequality',
};

export const getProctorConstants = (key) => {
  const filter = getFilter(ENUM_TYPE.PROCTOR);
  return filter[key];
};

export const getWarningFlag = () =>
  getProctorConstants(PROCTOR_CONSTANTS.SHOW_WARNING);

export const getSeverity = (id) => {
  const proctorMapping = getAnomalyTypeList();
  const anomalyType = proctorMapping.find((anomaly) => anomaly.id === id);
  return anomalyType.severity;
};
