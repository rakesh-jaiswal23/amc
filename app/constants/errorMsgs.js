const ERROR_MESSAGE = {
  MIN_ERROR_MSG: 'Minimum characters required: ', // 'Minimum characters allowed limit is: ',
  MIN_SHOULD_MSG: 'Minimum value required: ',
  MIN_VALUE_MSG: 'Minimum value allowed: ',
  MAX_ERROR_MSG: 'Maximum number of characters allowed: ', // 'Maximum characters allowed limit is: ',
  MAX_AMOUNT_ERROR_MSG: 'You can enter an amount upto: ', // 'You can enter an amount upto 2147483647: ',
  MAX_VALUE_MSG: 'Maximum value allowed: ',
  MAX_INPUT_VALUE_MSG:
    'The input has exceeded the maximum number of characters: ',
  MAX_SALARY_MSG: 'Maximum salary limit is: ',
  USER_HAVE_TO_LOGIN: 'User not logged in',
  MAX_PCT_MSG: 'Maximum percentage allowed: ',
  REQ_ERROR_MSG: 'This field is mandatory',
  PLEASE_SELECT_SKILL: 'Please select skill from drop down',
  PLEASE_SELECT_ALL_CATEGORIES: 'Please select all categories ratings',
  ENTER_EMAIL: 'Please enter email ID first',
  EMAIL_VALIDATION: 'Please enter a valid email ID',
  INVALID_DATE_MSG: 'Invalid date format. Please use the "DD/MMM/YYYY" format.',
  EMAIL_PART_OF_PROJECT:
    'Please enter an email ID already part of this project',
  UPI_VALIDATION: 'Please enter a valid UPI ID including @',
  VALID_EMAIL: 'Please enter a valid email ID',
  MAX: 'Max',
  MAX_USERS_PROJECT:
    'This operation is not allowed as the number of users present in the project is more than the number of users allowed as per your plan. Please make sure you have only %s number of user(s) as per your current plan.',
  MAX_USERS_ADD_PROJECT:
    'This operation is not allowed as the number of users will become more than the number of users allowed (%s) as per your plan.',
  MAX_ASSESSMENT_PROJECT:
    'This operation is not allowed as the number of assessments created in the project is more than the number of assessments allowed as per your plan. Please make sure you have only %s assessment(s) as per your current plan.',
  MAX_ASSESSMENT_ADD_PROJECT:
    'This operation is not allowed as the number of assessments will become more than the number of assessments allowed (%s) as per your plan.',
  MULTIPLE_VALUES_MESSAGE: 'Use comma (,) to separate multiple values', // "Add multiple use ',' to separate",
  SKILL_PLACEHOLDER: 'Enter a skill',
  ROLE_PLACEHOLDER: 'Enter a Role',
  COMPANY_PLACEHOLDER: 'Enter a company specific interview',
  SKILL_LIMIT: 'Only five skills can be added',
  SKILL_PREREQUISITES:
    'Please select atleast one skill in Prerequisites section',
  SKILL_REQ_ERROR_MSG: 'Skills are mandatory',
  NAME_VALIDATION_MESSAGE: 'Please use letters only',
  NUMBER_VALIDATION_MESSAGE: 'Please use Number only',
  DUPLICATE_SKILL_ERROR_MESSAGE: 'Skill already entered',
  DUPLICATE_TOOLS_ERROR_MESSAGE: 'Tool already entered',
  DUPLICATE_EMAIL_ERROR_MESSAGE: 'Email already entered',
  JOB_DELETED_SUCCESSFULLY: 'Job Deleted Successfully',
  DUPLICATE_WONT_ALLOWED: `Skill already added`,
  DONT_YOUR_EMAIL: `Don't enter your own email Id`,
  PHONE_VALIDATION_MESSAGE: 'Please use valid phone number',
  NUMERIC_VALIDATION_MESSAGE: 'Please use numeric values',
  FILE_SIZE_MESSAGE: 'File size should not exceed ', // Unit is a must to specify, so it should be - File size should not exceed 10 KB
  PASSWORD_MESSAGE: 'Please enter a valid password',
  PASSWORD_INFO:
    'Password must contain at least \n one capital letter, one special character, one digit, and the length should be between 8 to 16 characters',
  FILE_SIZE_EXT: 'KB',
  CITY_SELECTING_ERROR:
    'Please select the same from the dropdown, for efficient location-based suggestions', // 'For better visibility in search results use suggested cities.',
  // We should use the same message for other location based searches also e.g. job & candidate search, not sure from where those messages are picked...
  AMOUNT_IN_100_MULTIPLE_ERROR_MSG:
    'Please enter an amount in multiples of 100',
  INVALID_DATE: 'Please enter a valid Date',
  FUTURE_DATE: 'Future date not allowed',
  TO_DATE_GREATER_THAN_FROM: 'To Date must be greater than From Date',
  MAX_SALARY_LESS_MSG:
    'Maximum salary must be more than or equal to minimum salary',
  JOB_DEADLINE_START_DATE_MESSAGE:
    'Job Deadline Date should be greater than or Equal To Start Date',
  JOB_EXPIRY_JOB_DEADLINE_MESSAGE:
    'Job Expiry Date should be greater than or Equal To Job Deadline Date',
  COMPANY_ID_VALIDATION: 'Company ID should be greater than 0',
  CSV_VALIDATION: '.csv file required',
  SPACE_WARNING:
    'Please select the skill from dropdown, for better search appearances. If you want to give multiple skills, use comma (,) as separator',
  INTEGER_MSG: 'Please enter a non-decimal value',

  OTP_ERROR_MESSAGE: 'OTP must be between 100000 and 999999',
  FILL_ALL_FIELDS: 'Please fill all the fields',
  FILL_QUESTION_DETAILS:
    'Fill Question Statement and Options to preview the question.',
  SELECT_ATLEAST_ONE_ASSESSMENT:
    'Select atleast one assessment as prerequisite from the dropdown',
  SELECT_ATLEAST_ONE_CERTIFICATION:
    'Add atleast one certification as prerequisite',
  FIRST_SAVE_THE_ASSESSMENT: 'Save the assessment first',
  SELECT_ATLEAST_ONE_SKILL:
    'Select atleast one skill as prerequisite from the dropdown',
  PLEASE_SELECT_CHECKBOX: 'Please select the check box',
  PLEASE_ENTER_QUESTION_AND_SKILL: 'Please Enter Question and Skill',
  AI_JD_ERROR_MSG:
    'Please first fill Job title, Skills and Job Experience to generate Job description',
  AI_CANDIDATE_DESC:
    'Please first fill Skills and Job Experience to generate Profile',
  PLEASE_ENTER_DESCRIPTION:
    'Please fill the description field as it is mandatory',
  YOU_CANT_PERFROM:
    'This feature is not available for logged-in user. Redirecting to homepage.',
  INVALID_JSON_ERROR_MSG: 'Please enter a valid json.',
};
export default ERROR_MESSAGE;
