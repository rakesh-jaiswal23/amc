import * as yup from 'yup';
import ERROR_MESSAGE from '../../../constants/errorMsgs';
import VALIDATION_VALUES from '../../../constants/validationValues';

const step1Schema = yup.object().shape({
  companyName: yup
    .string()
    .required(ERROR_MESSAGE.REQ_ERROR_MSG)
    .min(
      VALIDATION_VALUES.MIN_VALUE,
      ERROR_MESSAGE.MIN_ERROR_MSG + VALIDATION_VALUES.MIN_VALUE
    )
    .max(
      VALIDATION_VALUES.MAX_VALUE_64,
      ERROR_MESSAGE.MAX_ERROR_MSG + VALIDATION_VALUES.MAX_VALUE_64
    ),
  rating: yup
    .number()
    .min(0, 'Company rating must be at least 0')
    .max(500, 'Company rating must be at most 5')
    .required('Company rating is required'),
  title: yup
    .string()
    .required(ERROR_MESSAGE.REQ_ERROR_MSG)
    .min(
      VALIDATION_VALUES.MIN_VALUE,
      ERROR_MESSAGE.MIN_ERROR_MSG + VALIDATION_VALUES.MIN_VALUE
    )
    .max(
      VALIDATION_VALUES.MAX_VALUE_64,
      ERROR_MESSAGE.MAX_ERROR_MSG + VALIDATION_VALUES.MAX_VALUE_64
    ),
  from: yup
    .date()
    .typeError(ERROR_MESSAGE.INVALID_DATE)
    .nullable()
    .transform((curr, orig) => (orig === '' ? null : curr))
    .required(ERROR_MESSAGE.REQ_ERROR_MSG),
  to: yup
    .date()
    .typeError(ERROR_MESSAGE.INVALID_DATE)
    .nullable()
    .transform((curr, orig) => (orig === '' ? null : curr))
    .when('currentlyWorking', {
      is: (currentStatus) => currentStatus === false,
      then: yup
        .date()
        .required(ERROR_MESSAGE.REQ_ERROR_MSG)
        .typeError(ERROR_MESSAGE.INVALID_DATE),
    }),

  jobType: yup.string().required(ERROR_MESSAGE.REQ_ERROR_MSG).nullable(),
  department: yup.string().required(ERROR_MESSAGE.REQ_ERROR_MSG).nullable(),
  currentLocation: yup.object().shape({
    shortname: yup.string().required(ERROR_MESSAGE.REQ_ERROR_MSG),
  }),
});

const step2Schema = yup.object().shape({
  recommendFriend: yup.boolean(),
  likes: yup
    .string()
    .max(
      VALIDATION_VALUES.MAX_VALUE_1000,
      ERROR_MESSAGE.MAX_ERROR_MSG + VALIDATION_VALUES.MAX_VALUE_1000
    ),
  dislikes: yup
    .string()
    .max(
      VALIDATION_VALUES.MAX_VALUE_1000,
      ERROR_MESSAGE.MAX_ERROR_MSG + VALIDATION_VALUES.MAX_VALUE_1000
    ),
});

const EMPLOYER_REVIEW_FORM_SCHEMA = (currentStep) =>
  currentStep === 1
    ? step1Schema
    : currentStep === 2
    ? step2Schema
    : yup.object().shape({});

export default EMPLOYER_REVIEW_FORM_SCHEMA;
