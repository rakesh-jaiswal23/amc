import ASSET_TYPE from "./assets";

const UPLOAD_URL = {
  CANDIDATE_RESUME_UPLOAD_URL: "/file/candidate/resume/upload",
  CANDIDATE_PHOTO_UPLOAD_URL: "/file/candidate/photo/upload",
  CANDIDATE_IDPROOF_UPLOAD_URL: "/file/candidate/idproof/upload",
  CANDIDATE_AUDIO_UPLOAD_URL: "/file/candidate/audio/upload",
  CANDIDATE_VIDEO_UPLOAD_URL: "/file/candidate/video/upload",
  EMPLOYER_LOGO_UPLOAD_URL: "/file/employer/logo/upload",
  CANDIDATE_ICARDPROOF_UPLOAD_URL: "/file/candidate/icard/upload",
};

export const API_URL = {
  LOGIN: "/api/v1/login",
  JOB_COUNT: "/search/jobcount",
  CANDIDATE_COUNT: "/search/candidatecount",
  CANDIDATE_REGISTER: "/candidate",
  EMPLOYER_PROFILE: "/employer/self/profile",
  DELETE_FILE: "/file/delete?file=",
  PHOTO_PRE: "/api/v1/file/download?file=",
  RESUME_PRE: "/api/v1/file/candidate/resume/download?file=",
  ID_PROOF_PRE: "/api/v1/file/candidate/idproof/download?file=",
  ICARD_PROOF_PRE: "/api/v1/file/candidate/icard/download?file=",
  INTRO_AUDIO_PRE: "/file/candidate/audio/download?file=",
  INTRO_AUDIO_ANSWER: `/file/answer/download?file=`,
  INTRO_VIDEO_PRE: "/file/candidate/video/download?file=",
  CANDIDATE_SELF_PROFILE: "/candidate/self/profile",
  ASSESSMENT_START: "/assessment/start",
  AVAILABLE_ASSESSMENT: "/common/assessments",
  COMPLETE_ASSESSMENT: "/candidate/assessments",
  GUIDELINE: "/assessment/guideline",
  INTERVIEW_GUIDELINE: "/assessment/interviewguideline",
  CREDENTIAL: "/credential",
  USER_CREDENTIAL: "/api/v1/credential",
  PROJECT: "/project",
  PROFILE_PROJECTS: "/project/profile",
  PROJECT_LOAD: "/project/load",
  PROJECT_CREATE: "/project/create",
  PROJECT_JOIN: "/project/join",
  PROJECT_RESEND: "/project/resendjoinrequest",
  PROJECT_LEAVE: "/project/leave",
  TRANSFER_OWNERSHIP: "/project/ownershiptransfer",
  COMPANY_ACCOUNT_TRANSFER_OWNERSHIP: "/company/ownershiptransfer",
  COMPANY_ACCOUNT_REQUEST_OWNERSHIP: "/company/requestownership",
  MARK_DELETE_PROJECT: "/project/markdelete",
  MARK_REVERT_PROJECT: "/project/revertdelete",
  ACCOUNT_MARK_DELETE: "/account/markdelete",
  ACCOUNT_REVERT_DELETE: "/account/revertdelete",
  AUTOCOMPLETE_COMPANY: "/company",
  DELETE_PROJECT: "/delete/project",
  REQUEST_OWNERSHIP: "/project/requestownership",
  PROJECT_ADD_USER: "/project/adduser",
  PROJECT_UPDATE_USER: "/project/updateuser",
  PROJECT_REMOVE_USER: "/project/removeuser",
  PROJECT_REJECT_USER: "/project/rejectuser",
  PROJECT_ACCEPT_USER: "/project/acceptuser",
  PRE_ASSESSMENT_CHECK: "/candidate/preassessmentcheck",
  POINTS: "/txn/points",
  HISTORY: "/txn/history",
  COUPON: "/txn/coupon/apply",
  PAYMENT_UPDATE: "/txn/payment/update",
  FEEDBACK: "/common/feedback",
  INVOICE_DWLD: "/api/v1/txn/invoice/download?orderid=",
  SETTINGS_API: "/common/settings",
  UNIVERSITY_EMAILS_API: "/common/settings/updateemailids",
  DELETE_ACCOUNT_API: "/delete/account",
  LOGOUT: "/logout",
  SEND_REPORT: "/common/report",
  ACCOUNT_CHECK: "/account/check",
  ACCOUNT_CHECKDELETE: "/account/checkdelete",
  LAST_ASSESSMENT: "/candidate/lastassessment",
  REFERRAL_LINK: "/referrallink",
  PROMOTION_APPLY_LINK: "/applyoffer/",
  OFFERS_LINK: "/offers",
  NOTIFICATION_TURN: "/notification/turn/false?type=",
  UNSUBSCRIBE_EMAIL: "/notification/unsubscribe",
  NOTIFICATION_COUNT: "/notification/count",
  GET_BANNERS: "/notification/banner",
  GET_NOTIFICATIONS: "/notification/list",
  BANNER_READ: "/notification/markread",
  SWITCH_GLOBAL_NOTIFICATION: "/notification/global/turn",
  SWITCH_LOCAL_NOTIFICATION: "/notification/turn",
  NOTIFICATION_SETTINGS_API: "/notification/settings",
  SUGGEST_NAME: "/company/suggestname",
  GENERATE_SITE_MAP: `/admin/gensitemap`,
  UPDATE_JOB_CANDIDATE_SKILLS: `/admin/updateVerifiedSkills`,
  GENERATE_NON_VERIFIED_SKILLS: `/admin/genNonVerifiedSkills`,
  GENERATE_NON_VERIFIED_COLLEGES: `/admin/genNonVerifiedColleges`,
  GENERATE_NON_VERIFIED_COMPANIES: `/admin/genNonVerifiedCompanies`,
  UPDATE_DOMAIN: `/admin/updateDomain`,
  CASHBACK_DISBURSAL: `/admin/disburse`,
  ADMIN_NOTIFICATION: `/notification/raise`,
  UPLOAD_ROLE_AND_SKILL: `/admin/uploadmiskill`,
  NOTIFICATION_UPDATE: "/notification/update/template",
  NOTIFICATION_CREATE: "/notification/create/template",
  UPLOAD_COLLEGES: `/admin/uploadColleges`,
  RELOAD_CONFIGURATION: `/admin/configuration/update`,
  UPLOAD_QUESTIONS: `/admin/uploadQuestions`,
  UPLOAD_AI_QUESTIONS: `/admin/uploadAIQuestions`,
  UPDATE_VERIFIED_COLLEGES: `/admin/updateVerifiedColleges`,
  UPDATE_VERIFIED_COMPANIES: `/admin/updateVerifiedCompanies`,
  UPLOAD_WL_DOMAINS: `/admin/uploadWLDomains`,
  UPLOAD_BL_DOMAINS: `/admin/uploadBLDomains`,
  EMPLOYER_ACCOUNT_UPDATE: `/admin/update/employer`,
  WARRANTY_UPDATE: `/admin/warranty/action`,
  UNIVERSITY_REGISTER: `/register/college`,
  UPDATE_SKILL: "/admin/updateVerifiedSkills",
  UPLOAD_INDUSTRIES: "/admin/uploadIndustries",
  UPLOAD_JOB_TITLES: "/admin/uploadJobTitles",
  UPLOAD_TAGS: "/admin/uploadTags",
  UPLOAD_CERTIFICATES: "/admin/uploadCertificates",
  UPDATE_VERIFIED_INDUSTRIES: "/admin/updateVerifiedIndustries",
  UPDATE_VERIFIED_TITLES: "/admin/updateVerifiedTitles",
  UPDATE_VERIFIED_TAGS: "/admin/updateVerifiedTags",
  UPDATE_VERIFIED_CERTIFICATES: "/admin/updateVerifiedCertificates",
  GENERATE_NON_VERIFIED_INDUSTRIES: "/admin/generateNonVerifiedIndustries",
  GENERATE_NON_VERTFIED_JOB_TITLES: "/admin/generateNonVerifiedJobTitles",
  GENERATE_NON_VERIFIED_TAGS: "/admin/generateNonVerifiedTags",
  GENERATE_NON_VERIFIED_CERTIFICATES: "/admin/generateNonVerifiedCertificates",
  UPDATE_INDUSTRY: "/admin/updateIndustry",
  UPDATE_JOB_TITLES: "/admin/updateTitle",
  UPDATE_TAG: "/admin/updateTag",
  UPDATE_CERTIFICATE: "/admin/updateCertificate",
  RELOAD_UI: "/admin/readindexhtml",
  APPROVE_INTRO: "/admin/approveIntro",
  TURNOFF_NOTIFICATION: "/admin/notification/turnoff",
  FAQS: "/common/faqs",
  PROCTOR_GUIDELINES: "/assessment/proctorguidelines",
  SEARCH_CANDIDATE: "/search/candidate?similar=true",
  SEARCH_JOB: "/search/job?similar=true",
  DOWNLOAD_CANDIDATE_RESUME: "/api/v1/candidate/download/resume",
  HOME_PAGE_GET_BLOGS: "content/recentblogs",
  GET_DETAILS_OF_BLOG: "content/blog",
  COMMON_LOG_UI_ERROR: "common/loguierror",
  DOMAIN: "domain",
  DELETE_CAREER_PATH: "candidate/careerpath/remove",
  SET_CAREER_PATH: "/candidate/careerpath/set",
  MOCK_HISTROY: "/candidate/mockhistory",
  CAREER_PATH_PROGRESS: "/candidate/careerpath/progress",
  CAREER_PATH_ACHIEVED: "candidate/careerpath/achieved",
};

export const IMAGE_URL = {
  TICK: "/images/tick.svg",
  REMOVE: "/images/remove.svg",
  RESULT_NOT_FOUND: "/images/resultNotFound.png",
  OTHER_ROUTES: "/images/otherRoutes.svg",
  CONGRATULATIONS: "/images/congratulations.png",
  DISABLED_REATTEMPT: "/images/disabledReattempt.svg",
  LESS_RATING: "/images/lessRating.png",
  REATTEMPT: "/images/reattempt.svg",
  FILTER: "/images/filterLogo.svg",
  ALIGNMYCAREER: "/images/alignmycareer.svg",
};

export const ASSESSMENT_API_URL = {
  TOTAL_ASSESSMENT: "/employer/assessments",
  DELETE_ASSESSMENT: `/employer/assessment/`,
  GET_ASSESSMENT: `/employer/assessment/`,
  CREATE_ASSESSMENT: "/employer/assessment/create",
  UPDATE_ASSESSMENT: "/employer/assessment/update",
  ADD_QUESTION: "/employer/assessment/question",
  UPDATE_QUESTION: "/employer/assessment/question",
};

export const AI_ASSESSMENT_API_URL = {
  TOTAL_ASSESSMENT: "/employer/aiassessments",
  DELETE_ASSESSMENT: `/employer/aiassessment/`,
  GET_ASSESSMENT: `/employer/aiassessment/`,
  CREATE_ASSESSMENT: "/employer/aiassessment/create",
  UPDATE_ASSESSMENT: "/employer/aiassessment/update",
  ADD_QUESTION: "/employer/aiassessment/question",
  UPDATE_QUESTION: "/employer/aiassessment/question",
  CONFIG_AI_ASSESSMENT: "employer/aiassessment/configure",
  GENERATE_AI_ANSWER: "ai/generateanswer",
  VERIFY_AI_ANSWER: "ai/verifyanswer",
  AI_FEEDBACK: "/common/aifeedback",
  AI_JOB_DESCRIPTION: "ai/generatejd",
  AI_CANDIDATE_DESCRIPTION: "ai/generateprofile",
};

export const getQuestion = (techId, questionId) =>
  `/employer/assessment/${techId}/question/${questionId}`;
export const getAIQuestion = (techId, questionId) =>
  `/employer/aiassessment/${techId}/question/${questionId}`;
export const deleteQuestion = (techId, questionId) =>
  `/employer/assessment/${techId}/question/${questionId}`;
export const deleteAIQuestion = (techId, questionId) =>
  `/employer/aiassessment/${techId}/question/${questionId}`;
export const getAssessmentQuestions = (techId, pageNo) =>
  `/employer/assessment/${techId}/questions?page=${pageNo}`;
export const getAIAssessmentQuestions = (techId, pageNo) =>
  `/employer/aiassessment/${techId}/questions?page=${pageNo}`;
export const enableQuestion = (techId, questionId, enabled) =>
  `/employer/assessment/${techId}/question/${questionId}/enable/${enabled}`;
export const enableAssessment = (techId, enabled) =>
  `/employer/assessment/${techId}/enable/${enabled}`;
export const aiEnableAssessment = (techId, enabled) =>
  `/employer/aiassessment/${techId}/enable/${enabled}`;
export const getPrerequisites = () => `/employer/prerequisite/assessments`;
export const getAIPrerequisites = () => `/employer/prerequisite/aiassessments`;
export const getCandidateAssessment = (techId) => `common/assessment/${techId}`;

export const getPricePlanDetails = (id) => `common/priceplan/${id}`;
export const getAllPricePlans = `/common/priceplans`;
export const getAssessmentResult = (id) => `assessment/${id}/result`;

export const MAINPAGE_API_URL = {
  MAINPAGE_DEMO: "mainpage/demo?role=",
  MAINPAGE_BLOGS: "mainpage/blogs?role=",
  MAINPAGE_CASE_STUDY: "mainpage/casestudy?role=",
  MAINPAGE_REASONS: "mainpage/reasons?role=",
  MAINPAGE_FEATURE_1: "mainpage/feature1?role=",
  MAINPAGE_FEATURE_2: "mainpage/feature2?role=",
  MAINPAGE_COMPANIES: "mainpage/companies?role=",
  MAINPAGE_SKILLS: "mainpage/skills?role=",
  MAINPAGE_STATS: "mainpage/stats?role=",
  MAINPAGE_ASSESSMENT_STATS: "mainpage/assessment?role=",
  MAINPAGE_WHY_AMC: "mainpage/whyamc?role=",
  MAINPAGE_USP: "mainpage/usp?role=",
  MAINPAGE_TESTIMONIAL: "mainpage/testimonial?role=",
  MAINPAGE_ABOUT: "mainpage/about?role=",
  MAINPAGE_VIDEOS: "mainpage/videos?role=",
  MAINPAGE_BENEFITS: "mainpage/benefits?role=",
  MAINPAGE_PROUD_USERS: "mainpage/proudusers?role=",
};

export const getReportStatUrl = (stat) => `/report/${stat}/candidatestat`;

export const updateSwitch = (checked) =>
  `/candidate/self/autoapply?apply=${checked}`;

export const validateAssessment = (techId) =>
  `/assessment/validate?techId=${techId}`;

export const validateinterview = (skillId) =>
  `/assessment/validateinterview?skillId=${skillId}`;

export const getAssessmentHistory = (techId) =>
  `/candidate/${techId}/assessments`;

export const getCompleteAssessment = (state, domainId, subdomainId, groupid) =>
  `/candidate/assessments?state=${state}&domain=${domainId}&subdomain=${subdomainId}&group=${groupid}`;

export const getPostJobUrl = (currentJobId, jobPostMode) =>
  `/employer/job/${currentJobId}/action/${jobPostMode}`;

export const getEmployerJobData = (jobId) => `/employer/job/${jobId}`;

export const getFileUploadUrl = (requestMaker) => {
  switch (requestMaker) {
    case ASSET_TYPE.RESUME:
      return UPLOAD_URL.CANDIDATE_RESUME_UPLOAD_URL;
    case ASSET_TYPE.PHOTO:
      return UPLOAD_URL.CANDIDATE_PHOTO_UPLOAD_URL;
    case ASSET_TYPE.ID_PROOF:
      return UPLOAD_URL.CANDIDATE_IDPROOF_UPLOAD_URL;
    case ASSET_TYPE.ICARD_PROOF:
      return UPLOAD_URL.CANDIDATE_ICARDPROOF_UPLOAD_URL;
    case ASSET_TYPE.AUDIO:
      return UPLOAD_URL.CANDIDATE_AUDIO_UPLOAD_URL;
    case ASSET_TYPE.VIDEO:
      return UPLOAD_URL.CANDIDATE_VIDEO_UPLOAD_URL;
    case ASSET_TYPE.LOGO:
      return UPLOAD_URL.EMPLOYER_LOGO_UPLOAD_URL;
    case ASSET_TYPE.ASSESSMENT_QUESTIONS:
      return API_URL.UPLOAD_QUESTIONS;
    case ASSET_TYPE.AI_ASSESSMENT_QUESTIONS:
      return API_URL.UPLOAD_AI_QUESTIONS;
    case ASSET_TYPE.NEW_COLLEGE:
      return API_URL.UPLOAD_COLLEGES;
    case ASSET_TYPE.UPDATE_VERIFIED_COLLEGES:
      return API_URL.UPDATE_VERIFIED_COLLEGES;
    case ASSET_TYPE.UPDATE_VERIFIED_COMPANIES:
      return API_URL.UPDATE_VERIFIED_COMPANIES;
    case ASSET_TYPE.UPLOAD_WL_DOMAINS:
      return API_URL.UPLOAD_WL_DOMAINS;
    case ASSET_TYPE.UPLOAD_BL_DOMAINS:
      return API_URL.UPLOAD_BL_DOMAINS;
    case ASSET_TYPE.UPLOAD_INDUSTRIES:
      return API_URL.UPLOAD_INDUSTRIES;
    case ASSET_TYPE.UPLOAD_TITLES:
      return API_URL.UPLOAD_JOB_TITLES;
    case ASSET_TYPE.UPLOAD_TAGS:
      return API_URL.UPLOAD_TAGS;
    case ASSET_TYPE.UPLOAD_CERTIFICATES:
      return API_URL.UPLOAD_CERTIFICATES;
    case ASSET_TYPE.UPDATE_VERIFIED_INDUSTRIES:
      return API_URL.UPDATE_VERIFIED_INDUSTRIES;
    case ASSET_TYPE.UPDATE_VERIFIED_TITLES:
      return API_URL.UPDATE_VERIFIED_TITLES;
    case ASSET_TYPE.UPDATE_VERIFIED_TAGS:
      return API_URL.UPDATE_VERIFIED_TAGS;
    case ASSET_TYPE.UPDATE_VERIFIED_CERTIFICATES:
      return API_URL.UPDATE_VERIFIED_CERTIFICATES;
    default:
      return undefined;
  }
};

export const getCouponUrl = (couponCode) =>
  `${API_URL.COUPON}?code=${couponCode}`;

export const getAvailableAssessment = (domain, subdomain, page, skillId) =>
  `${API_URL.AVAILABLE_ASSESSMENT}?domain=${domain}&subdomain=${subdomain}&page=${page}&skillId=${skillId}`;

export const getAccept = (assessmentId, isVisible) =>
  `/candidate/assessment/${assessmentId}/accept?accept=${isVisible}`;

export const getPreUnlockCheck = (candidateId) =>
  `/employer/candidate/${candidateId}/preunlockcheck`;

export const getPreCandidateCheck = (candidateId, state) =>
  `/employer/candidate/${candidateId}/precheck/${state}`;

export const getAssessmentStart = (techId, entityId) => {
  if (entityId) {
    return `${API_URL.ASSESSMENT_START}?techId=${techId}&entityId=${entityId}`;
  }
  return `${API_URL.ASSESSMENT_START}?techId=${techId}`;
};

export const getGuideline = (techId) => `${API_URL.GUIDELINE}?techId=${techId}`;
export const getInterviewGuideline = (skillId) =>
  `${API_URL.INTERVIEW_GUIDELINE}?skillId=${skillId}`;

export const getTerminateAssessment = (assessmentId) =>
  `/assessment/${assessmentId}/terminate`;

export const getAssessmentSubmit = (assessmentId) =>
  `/assessment/${assessmentId}/submit`;

export const getFlipQuestion = (assessmentId) =>
  `/assessment/${assessmentId}/flip`;

export const getQuestions = (assessmentId, requestQuesNo) =>
  `/assessment/${assessmentId}/ques/${requestQuesNo}`;

export const getTxnTokenUrl = (product, amount, planid, planType) =>
  `txn/token/generate?product=${product}&amount=${amount}&planid=${planid}&plantype=${planType} `;

// export const getPaytmScriptUrl = (mid) =>
//   `https://securegw-stage.paytm.in/merchantpgpui/checkoutjs/merchants/${mid}.js`;

export const getGoogleMapScriptUrl = (KEY) =>
  `https://maps.googleapis.com/maps/api/js?key=${KEY}&libraries=places`;

export const sendAnomalyImage = (assessmentId) =>
  `/assessment/${assessmentId}/proctor`;

export const updateTechnologies = (techId) =>
  `/admin/technology/update/${techId}`;

// export const getTheOutPutOfCode = () => `/employer/assessments`;

export const compileAssessment = () => `assessment/compile`;

export const getAssessmentReport = (assessmentId) =>
  `/assessment/${assessmentId}/report`;

export const adminAssessmentReport = (assessmentId, role) =>
  `/assessment/${assessmentId}/report?role=${role}`;

export const uploadAIAudioFile = (assessmentId, questionId) =>
  `file/assessment/${assessmentId}/question/${questionId}/upload`;

export const requestSkillInMockInterview = (requestSkill, type) =>
  `/assessment/requestmiskill?skill=${requestSkill}&type=${type}`;

export const getBlogsParam = (page) => `content/blog?page=${page}`;

export const likeTheBlog = (id, isLiked) =>
  `content/blog/${id}/like?liked=${isLiked}`;

export const getSubDomianList = (id) => `domain/${id}`;

export const getGroups = (domainId, subdomainId) =>
  `/domain/${domainId}/subdomain/${subdomainId}`;

export const getAssessmentBasedOnDomain = (domainId, page) =>
  `common/assessments?domain=${domainId}&page=${page}`;

export const getAssessmentBasedOnDomainAndSubdomain = (
  domainId,
  subdomainId,
  page
) =>
  `common/assessments?domain=${domainId}&subdomain=${subdomainId}&page=${page}`;

export const getAssessmentsBasedOnCareerPath = (
  domainId,
  subdomainId,
  groupid
) =>
  `common/assessments?domain=${domainId}&subdomain=${subdomainId}&group=${groupid}`;

export const getCompletedAssessmentCareerPath = (
  domainid,
  subdomainid,
  groupid
) => `candidate/assessments?domain=${domainid}&subdomain=${subdomainid}&group=${groupid}
  `;

export const checkInterview = (id) =>
  `employer/meeting/check?candidateId=${id}`;
export const scheduleInterview = (id) =>
  `employer/meeting/schedule?candidateId=${id}`;
