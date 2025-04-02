import { DEFAULT_RATING, DEFAULT_RATING_NAME } from '../constants';
import ENUM_TYPE from '../constants/enumType';
import { PROJECT_ROLES_TYPE } from '../constants/projectroles.constants';
import { getRequest } from '../services';

import {
  getValue,
  getFilterByName,
  getFilter,
  getSkillById,
} from './base.bootstrap';

const COMMON_ENUM = {
  EDUCATION: 'education',
  EXP: 'exp',
  MIEXP: 'miexp',
  RATING: 'rating',
  ASSESSMENT_STATE: 'assessmentstate',
  REPORT_ENUM: 'reporttimefilter',
  JOINING_DATE: 'joiningdate',
  SKILL: 'skill',
  ROLE: 'role',
  WHERE_USED: 'whereused',
  SM_TYPE: 'smtype',
  GENDER: 'gender',
  CANDIDATE_TYPE: 'candidatetype',
  COMPANY_SIZE: 'companysize',
  ENGINEER_SIZE: 'engineersize',
  COMPANY_STAGE: 'companystage',
  FUNDING_SIZE: 'fundingsize',
  ASPECT_RATING: 'reviewaspect',
  PAY_BENEFIT: 'paybenefit',
  OTHER_BENEFIT: 'otherbenefit',
  SCHOOL_CLASS: 'schoolclass',
  TRANSACTION_TYPE: 'transactiontype',
  REPORT_OPTIONS: 'reportoptions',
  REPORT_ENTITY: 'reportentity',
  PROC_TYPE: 'proctorindex',
  ROLES: 'Roles',
  ASSESSEMENT_CATEGORY: 'assessmentcategory',
  ASSESSMENT_QUESTION: 'assessmentquestion',
  AI_FEEDBACK: 'aifeedback',
  INTERVIEW_SKILL: 'InterviewSkill',
  REVIEW_SORT_TYPE: 'reviewsorttype',
  QUESTION_TYPE: 'questiontype',
  FEEDBACK_ASPECT: 'feedbackaspect',
  EXPERIENCE_LEVEL: 'explevel',
};

const getCommonFilterEnum = (filterType, skillId) => {
  const filterByName = getFilterByName(ENUM_TYPE.COMMON_ENUM_MAPPING);
  const filter = filterByName?.[filterType];
  return getValue(filter, skillId);
};

const getCommonEnumList = (filterType) => {
  const filterByName = getFilterByName(ENUM_TYPE.COMMON_ENUM_MAPPING);
  const filter = filterByName?.[filterType];
  return filter?.mapping;
};

export const getGender = (id) => getCommonFilterEnum(COMMON_ENUM.GENDER, id);

export const getEducation = (id) =>
  getCommonFilterEnum(COMMON_ENUM.EDUCATION, id);

export const getAssessmentState = (id) =>
  getCommonFilterEnum(COMMON_ENUM.ASSESSMENT_STATE, id);

export const getReportEnum = (id) =>
  getCommonFilterEnum(COMMON_ENUM.REPORT_ENUM, id);

export const getClass = (id) =>
  getCommonFilterEnum(COMMON_ENUM.SCHOOL_CLASS, id);
export const getExperience = (id) => getCommonFilterEnum(COMMON_ENUM.EXP, id);

export const getRating = (id) =>
  id === DEFAULT_RATING
    ? DEFAULT_RATING_NAME
    : getCommonFilterEnum(COMMON_ENUM.RATING, id);

export const getProcType = (id) =>
  getCommonFilterEnum(COMMON_ENUM.PROC_TYPE, id);

export const getTransactionType = (id) =>
  getCommonFilterEnum(COMMON_ENUM.TRANSACTION_TYPE, id);

export const getJoiningDate = (id) =>
  getCommonFilterEnum(COMMON_ENUM.JOINING_DATE, id);

export const addInCommonEnumList = (filterType, data) => {
  const mapping = getCommonEnumList(filterType);
  mapping.push(data);
};

export const getSkill = async (skillId) => {
  const skill = getCommonFilterEnum(COMMON_ENUM.SKILL, skillId);
  if (skill === skillId) {
    const name = await getRequest(`skill/${skillId}/name`);
    const data = {
      id: skillId,
      value: name,
    };
    addInCommonEnumList(COMMON_ENUM.SKILL, data);
    return name;
  }
  return skill;
};

export const getInterviewSkill = (id) =>
  getCommonFilterEnum(COMMON_ENUM.INTERVIEW_SKILL, id);

export const getWhereUsed = (id) =>
  getCommonFilterEnum(COMMON_ENUM.WHERE_USED, id);
export const getPayBenifit = (id) =>
  getCommonFilterEnum(COMMON_ENUM.PAY_BENEFIT, id);
export const getOtherBenifit = (id) =>
  getCommonFilterEnum(COMMON_ENUM.OTHER_BENEFIT, id);
export const getCompanySize = (id) =>
  getCommonFilterEnum(COMMON_ENUM.COMPANY_SIZE, id);
export const getCompanyStage = (id) =>
  getCommonFilterEnum(COMMON_ENUM.COMPANY_STAGE, id);
export const getEngineerSize = (id) =>
  getCommonFilterEnum(COMMON_ENUM.ENGINEER_SIZE, id);
export const getFunding = (id) =>
  getCommonFilterEnum(COMMON_ENUM.FUNDING_SIZE, id);
export const getRole = (id) => getCommonFilterEnum(COMMON_ENUM.ROLE, id);

export const getEducationList = () => getCommonEnumList(COMMON_ENUM.EDUCATION);
export const getExperienceList = () => getCommonEnumList(COMMON_ENUM.EXP);
export const getMIExperienceList = () => getCommonEnumList(COMMON_ENUM.MIEXP);

export const getMockInterviewsList = () =>
  getCommonEnumList(COMMON_ENUM.INTERVIEW_SKILL);

export const getMIExperienceById = (id) =>
  getCommonFilterEnum(COMMON_ENUM.MIEXP, id);

export const getExperienceById = (id) =>
  getCommonFilterEnum(COMMON_ENUM.EXP, id);

export const getRatingList = () => getCommonEnumList(COMMON_ENUM.RATING);

export const getAssessmentType = () => {
  getCommonEnumList(COMMON_ENUM.ASSESSMENT_QUESTION);
};

export const getAIFeedbackList = () =>
  getCommonEnumList(COMMON_ENUM.AI_FEEDBACK);

export const getAssessmentTypeByID = (id) =>
  getCommonFilterEnum(COMMON_ENUM.ASSESSMENT_QUESTION, id);

export const getAssessmentStateList = () =>
  getCommonEnumList(COMMON_ENUM.ASSESSMENT_STATE);

export const getReportEnumList = () =>
  getCommonEnumList(COMMON_ENUM.REPORT_ENUM);

export const getJoiningDateList = () =>
  getCommonEnumList(COMMON_ENUM.JOINING_DATE);
export const getSkillList = () => getCommonEnumList(COMMON_ENUM.SKILL);
export const getAssessmentCategoryList = () =>
  getCommonEnumList(COMMON_ENUM.ASSESSEMENT_CATEGORY);
export const getQuestionType = () =>
  getCommonEnumList(COMMON_ENUM.QUESTION_TYPE);
export const getSchoolClassList = () =>
  getCommonEnumList(COMMON_ENUM.SCHOOL_CLASS);
export const getWhereUsedtList = () =>
  getCommonEnumList(COMMON_ENUM.WHERE_USED);
export const getGenderList = () => getCommonEnumList(COMMON_ENUM.GENDER);
export const getPayBenifitList = () =>
  getCommonEnumList(COMMON_ENUM.PAY_BENEFIT);
export const getOtherBenifitList = () =>
  getCommonEnumList(COMMON_ENUM.OTHER_BENEFIT);
export const getCompanySizeList = () =>
  getCommonEnumList(COMMON_ENUM.COMPANY_SIZE);
export const getEngineerSizeList = () =>
  getCommonEnumList(COMMON_ENUM.ENGINEER_SIZE);
export const getCompanyStageList = () =>
  getCommonEnumList(COMMON_ENUM.COMPANY_STAGE);
export const getFundingSizeList = () =>
  getCommonEnumList(COMMON_ENUM.FUNDING_SIZE);
export const getAspectRating = () =>
  getCommonEnumList(COMMON_ENUM.ASPECT_RATING);
export const getInterviewFeedbackAspect = () =>
  getCommonEnumList(COMMON_ENUM.FEEDBACK_ASPECT);
export const getReviewSortType = () =>
  getCommonEnumList(COMMON_ENUM.REVIEW_SORT_TYPE);

export const getAspectRatingNameByID = (id) =>
  getCommonFilterEnum(COMMON_ENUM.ASPECT_RATING, id);
export const getInterviewFeedbackAspectNameByID = (id) =>
  getCommonFilterEnum(COMMON_ENUM.FEEDBACK_ASPECT, id);

export const getRoleList = () => getCommonEnumList(COMMON_ENUM.ROLE);
export const getProjectRoles = (type) => {
  const rolesList = getCommonEnumList(COMMON_ENUM.ROLES);
  const filterTheseIdFromList = [11, 12, 13, 14, 15];

  const filteredList = rolesList
    .filter((role) => filterTheseIdFromList.includes(role.id))
    .map(({ id, value, role }) =>
      type === PROJECT_ROLES_TYPE.HROLE ? { id, value: role } : { id, value }
    );
  return filteredList;
};

const getCommonFilterIdEnum = (filterType, name) => {
  const filterByName = getFilterByName(ENUM_TYPE.COMMON_ENUM_MAPPING);
  const filter = filterByName?.[filterType];
  return getSkillById(filter, name);
};

export const getReportEntity = (id, filterType = COMMON_ENUM.REPORT_ENTITY) =>
  getCommonFilterEnum(filterType, id);

export const getReportOptionsIntersection = (entityId) => {
  const allReportOptions = getCommonEnumList(COMMON_ENUM.REPORT_OPTIONS);
  const reportEntity = getReportEntity(entityId);
  const reportOptionsForAllEntities = getFilter(ENUM_TYPE.REPORT);
  const setAllReportOptions = new Set(allReportOptions);
  const setReportOptionsForEntity = new Set(
    reportOptionsForAllEntities[reportEntity.toLowerCase()]
  );
  const intersection = new Set(
    [...setAllReportOptions].filter((x) => setReportOptionsForEntity.has(x?.id))
  );
  return Array.from(intersection);
};

export const getSkillId = (name) =>
  getCommonFilterIdEnum(COMMON_ENUM.SKILL, name);

export const getReportId = (name) =>
  getCommonFilterIdEnum(COMMON_ENUM.REPORT_ENUM, name);

export const getExperienceLevel = () =>
  getCommonEnumList(COMMON_ENUM.EXPERIENCE_LEVEL);
