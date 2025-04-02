import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Rating,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { noop } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import PropTypes from 'prop-types';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import useMobileDevice from '../../../hooks/useMobileDevice';
import UI from '../../../constants/ui';
import ERROR_MESSAGE from '../../../constants/errorMsgs';
import VALIDATION_VALUES from '../../../constants/validationValues';
import { getJobTypeList } from '../../../formatter/candidateBootstrap';
import Select from '../../../components/select';
import PortalDatePicker from '../../../components/portalDatePicker';
import {
  DISABLED_FUTURE_DATE_AND_MONTH_FORMAT,
  YEAR_MONTH,
} from '../../../constants/datepicker';
import EMPLOYER_REVIEW_FORM_SCHEMA from './EmployerReviewFormSchema';
import { getRequest, postRequest } from '../../../services';
import { showSnackBar } from '../../../../redux/snackBarSlice';
import AutoSuggestion from '../../../components/autoSuggestion';
import { DEFAULT_COMPANY_ID, EMPTY_OBJECT } from '../../../constants';
import GeoAutoLocation from '../../../components/geoLocation';
import { getAspectRating } from '../../../formatter/commonBootstrap';
import getSanitizedValues from '../../../helpers/emptyFieldsValidation';
import { getDateInYYMMDD, validateDates } from '../../../formatter/date';

function EmployerReviewForm(props) {
  const {
    isOpen,
    onClose,
    companyAndJobTitle,
    companyId,
    setShouldReloadAfterReview,
  } = props;
  const isMobileDevice = useMobileDevice();
  const dispatch = useDispatch();
  const myRef = useRef(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [locations, setLocations] = useState();
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const categoryRatings = getAspectRating();
  const jobTypeList = getJobTypeList();

  const methods = useForm({
    resolver: yupResolver(EMPLOYER_REVIEW_FORM_SCHEMA(currentStep)),
    mode: 'onChange',
    defaultValues: {
      currentlyWorking: false,
    },
  });

  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
    reset,
    getValues,
    setError,
  } = methods;
  const currentEmployer = watch('currentlyWorking');

  useEffect(() => {
    setValue('currentLocation', locations);
  }, [locations]);

  useEffect(() => {
    if (companyId !== DEFAULT_COMPANY_ID) {
      getRequest(`review/lastreview?companyId=${companyId}`)
        .then((res) => {
          if (res) {
            reset(res);
            setLocations(res?.currentLocation);
          }
          if (companyAndJobTitle) {
            setValue('companyName', companyAndJobTitle?.name);
            setValue('companyId', companyAndJobTitle?.id);
            setValue('title', companyAndJobTitle?.title || res?.title);
            setValue('titleid', companyAndJobTitle?.titleid || res?.titleid);
          }
        })
        .catch((error) => {
          dispatch(
            showSnackBar({
              setopen: true,
              message: error?.msg,
              severity: 'error',
            })
          );
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [companyId]);

  useEffect(() => {
    if (currentStep === 2 && myRef.current) {
      myRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentStep]);

  const onClickSubmit = () => {
    const formOne = getValues();
    let payload;
    delete formOne.aspectRatings;
    delete formOne.dislikes;
    delete formOne.likes;
    delete formOne.recommendFriend;
    if (currentEmployer) {
      delete formOne.to;
    }

    if (formOne.to) {
      if (!validateDates(formOne.from, formOne.to)) {
        setError('to', {
          type: 'custom',
          message: ERROR_MESSAGE.TO_DATE_GREATER_THAN_FROM,
        });
        return;
      }
    }

    const toDate = formOne.to;
    if (toDate) {
      formOne.to = getDateInYYMMDD(toDate);
    }

    if (currentStep === 2) {
      const updatedAspectRatings = getValues('aspectRatings')?.map(
        (item, index) => ({
          id: categoryRatings[index].id,
          ...item,
        })
      );
      const aspectRatingsLength = updatedAspectRatings?.filter(
        (eachItem) => eachItem.rating !== undefined
      ).length;

      const formTwo = {
        dislikes: getValues('dislikes'),
        likes: getValues('likes'),
        recommendFriend: getValues('recommendFriend'),
        companyId: getValues('companyId'),
        aspectRatings: updatedAspectRatings,
      };

      payload = getSanitizedValues(formTwo);

      if (aspectRatingsLength !== categoryRatings.length) {
        setError('aspectRatings', {
          type: 'manual',
          message: ERROR_MESSAGE.PLEASE_SELECT_ALL_CATEGORIES,
        });
        setSubmitLoading(false);
        return;
      }
    }

    if (currentStep === 2) {
      setSubmitLoading(true);
      postRequest(`/review/createreview2`, {
        ...payload,
      })
        .then((res) => {
          dispatch(
            showSnackBar({
              setopen: true,
              message: res?.msg,
              severity: 'success',
            })
          );
          onClose();
          setShouldReloadAfterReview(true);
        })
        .catch((error) => {
          dispatch(
            showSnackBar({
              setopen: true,
              message: error?.msg,
              severity: 'error',
            })
          );
        })
        .finally(() => {
          setSubmitLoading(false);
        });
    } else {
      setSubmitLoading(true);
      postRequest(`/review/createreview1`, {
        ...formOne,
      })
        .then((res) => {
          dispatch(
            showSnackBar({
              setopen: true,
              message: res?.msg,
              severity: 'success',
            })
          );
          setCurrentStep(2);
        })
        .catch((error) => {
          dispatch(
            showSnackBar({
              setopen: true,
              message: error?.msg,
              severity: 'error',
            })
          );
        })
        .finally(() => {
          setSubmitLoading(false);
        });
    }
  };

  const handleToggleChange = (e) => {
    const isChecked = e.target.checked;
    setValue('currentlyWorking', isChecked);
  };

  const handleRecommedFriendToggle = (e) => {
    const isChecked = e.target.checked;
    setValue('recommendFriend', isChecked);
  };

  const setCompanyWithId = (object) => {
    setValue('companyName', object?.label || object?.name || object);
    setValue('companyId', object?.id || DEFAULT_COMPANY_ID);
  };

  const setRoleWithId = (object) => {
    setValue('title', object?.label || object?.name || object);
    setValue('titleid', object?.id || DEFAULT_COMPANY_ID);
  };

  return (
    <FormProvider {...methods}>
      <Dialog
        fullWidth
        fullScreen={isMobileDevice}
        open={isOpen}
        onClose={onClose}
        sx={{ overflow: 'visible' }}
        PaperProps={{ style: { borderRadius: 15 } }}
      >
        <DialogTitle id="alert-dialog-title">
          <Typography component="span" sx={{ fontSize: '1.25rem' }}>
            {UI.WRITE_REVIEW}
          </Typography>
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 12,
              top: 14,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CancelOutlinedIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers component="div">
          {loading ? (
            <div className="d-flex justify-content-center">
              <CircularProgress size="2rem" />
            </div>
          ) : (
            <div ref={myRef}>
              {currentStep === 1 && (
                <>
                  <div className="d-flex flex-column  mt-2 ms-2 me-2">
                    <label htmlFor="companyName" className="span-together">
                      {UI.COMPANY_NAME}
                      <Box component="span" sx={{ color: '#d32f2f' }}>
                        *
                      </Box>
                      <span className="m-0">:</span>
                    </label>
                    <AutoSuggestion
                      id="company"
                      name="company"
                      values={getValues('companyName')}
                      setValues={setCompanyWithId}
                      placeholder={UI.COMPANY}
                      control={control}
                      isRequired
                    />
                  </div>
                  <div
                    className="field_space"
                    style={{ textAlign: 'right', paddingRight: '2%' }}
                  >
                    {errors.companyName && (
                      <span className="mandatory">
                        {errors.companyName.message}
                      </span>
                    )}
                  </div>
                  <div className="d-flex  mt-2 ms-2 me-2">
                    <label htmlFor="rating" className="span-together">
                      {UI.RATING_YOUR_COMPANY}
                      <Box component="span" sx={{ color: '#d32f2f' }}>
                        *
                      </Box>
                      <span className="me-1">:</span>
                    </label>
                    <div className="d-flex  w-100">
                      <Controller
                        name="rating"
                        control={control}
                        render={({ field }) => (
                          <Rating
                            name="custom-rating"
                            value={field.value / 100}
                            precision={1}
                            onChange={(event, value) =>
                              field.onChange(value * 100)
                            }
                          />
                        )}
                      />
                    </div>
                  </div>
                  <div
                    className="field_space"
                    style={{ textAlign: 'right', paddingRight: '2%' }}
                  >
                    {errors.rating && (
                      <span className="mandatory">{errors.rating.message}</span>
                    )}
                  </div>
                  <div className="d-flex flex-column  mt-2 ms-2 me-2">
                    <label htmlFor="title" className="span-together">
                      {UI.JOB_TITLE}
                      <Box component="span" sx={{ color: '#d32f2f' }}>
                        *
                      </Box>
                      <span className="m-0">:</span>
                    </label>
                    <AutoSuggestion
                      id="title"
                      name="title"
                      values={getValues('title')}
                      setValues={setRoleWithId}
                      placeholder={UI.JOB_TITLE}
                      control={control}
                      isRequired
                    />
                  </div>
                  <div
                    className="field_space"
                    style={{ textAlign: 'right', paddingRight: '2%' }}
                  >
                    {errors.title && (
                      <span className="mandatory">{errors.title.message}</span>
                    )}
                  </div>
                  <div className="d-flex flex-row align-items-center mt-2 ms-2 me-2">
                    <label htmlFor="currentlyWorking" className="span-together">
                      {UI.CURRENT_EMPLOYE}
                      <span className="m-0">:</span>
                    </label>
                    <div className="d-flex  w-100">
                      <Controller
                        name="currentlyWorking"
                        control={control}
                        render={({ field }) => (
                          <Switch
                            id="currentlyWorking"
                            name="currentlyWorking"
                            checked={field.value}
                            onChange={handleToggleChange}
                          />
                        )}
                      />
                    </div>
                  </div>
                  <div
                    className="field_space"
                    style={{ textAlign: 'right', paddingRight: '2%' }}
                  >
                    {errors.currentlyWorking && (
                      <span className="mandatory">
                        {errors.currentlyWorking.message}
                      </span>
                    )}
                  </div>
                  <div className="d-flex flex-row align-items-center justify-content-between">
                    <div className="col-md-5 mt-2 ms-2 me-2">
                      <label htmlFor="from" className="form-label col-12">
                        {UI.FROM}
                        <Box component="span" sx={{ color: '#d32f2f' }}>
                          *
                        </Box>
                        <br />
                        <PortalDatePicker
                          control={control}
                          fields={YEAR_MONTH}
                          name="from"
                          id="from"
                          error={errors.from}
                          config={DISABLED_FUTURE_DATE_AND_MONTH_FORMAT}
                          shouldShowErrorMsg={false}
                        />
                        <div
                          className="field_space"
                          style={{ textAlign: 'right', paddingRight: '2%' }}
                        >
                          {errors?.from && (
                            <span className="mandatory">
                              {errors?.from?.message}
                            </span>
                          )}
                        </div>
                      </label>
                    </div>

                    {/* To */}
                    {!currentEmployer && (
                      <div className="col-md-5 mt-2 ms-2 me-2">
                        <label
                          htmlFor="to"
                          className="form-label col-12 color-AAAAAA"
                        >
                          {UI.TO}
                          <Box component="span" sx={{ color: '#d32f2f' }}>
                            *
                          </Box>
                          <br />
                          <PortalDatePicker
                            control={control}
                            fields={YEAR_MONTH}
                            name="to"
                            id="to"
                            error={errors.to}
                            config={DISABLED_FUTURE_DATE_AND_MONTH_FORMAT}
                            isDisabled={currentEmployer}
                            shouldShowErrorMsg={false}
                          />
                          <div
                            className="field_space"
                            style={{ textAlign: 'right', paddingRight: '2%' }}
                          >
                            {errors?.to && (
                              <span className="mandatory">
                                {errors?.to?.message}
                              </span>
                            )}
                          </div>
                        </label>
                      </div>
                    )}
                  </div>

                  <div className="d-flex flex-column  mt-2 ms-2 me-2">
                    <label htmlFor="currentLocation" className="span-together">
                      {UI.LOCATION}
                      <Box component="span" sx={{ color: '#d32f2f' }}>
                        *
                      </Box>
                      <span className="m-0">:</span>
                    </label>
                    <div className="form-label col-12">
                      {/* <TextField
                      id="currentLocation"
                      type="text"
                      placeholder={`${UI.CURRENT_LOCATION}`}
                      variant="outlined"
                      size="small"
                      className="form-control"
                      error={!!errors.currentLocation}
                      {...register('currentLocation', {
                        minLength: {
                          value: VALIDATION_VALUES.MIN_VALUE,
                          message:
                            ERROR_MESSAGE.MIN_ERROR_MSG +
                            VALIDATION_VALUES.MIN_VALUE,
                        },
                        maxLength: {
                          value: VALIDATION_VALUES.MAX_VALUE_64,
                          message:
                            ERROR_MESSAGE.MAX_ERROR_MSG +
                            VALIDATION_VALUES.MAX_VALUE_64,
                        },
                      })}
                    /> */}
                      <GeoAutoLocation
                        setLocations={setLocations}
                        locations={locations}
                        inputId="currentLocation"
                        error={errors?.currentLocation?.shortname}
                        autoreqd
                        isDifferentAllowed
                      />
                    </div>
                  </div>
                  <div
                    className="field_space"
                    style={{ textAlign: 'right', paddingRight: '2%' }}
                  >
                    {errors.currentLocation && (
                      <span className="mandatory">
                        {errors.currentLocation.message}
                      </span>
                    )}
                  </div>

                  <div className="d-flex flex-column  mt-2 ms-2 me-2">
                    <label htmlFor="jobType" className="span-together">
                      {UI.EMPLOYMENT_TYPE}
                      <Box component="span" sx={{ color: '#d32f2f' }}>
                        *
                      </Box>
                      <span className="m-0">:</span>
                    </label>
                    <div className="d-flex justify-content-center w-100">
                      <Select
                        id="jobType"
                        name="jobType"
                        control={control}
                        options={jobTypeList.slice(1)}
                        className="w-100"
                        isRequired
                      />
                    </div>
                  </div>
                  <div
                    className="field_space"
                    style={{ textAlign: 'right', paddingRight: '2%' }}
                  >
                    {errors.jobType && (
                      <span className="mandatory">
                        {errors.jobType.message}
                      </span>
                    )}
                  </div>

                  <div className="d-flex flex-column  mt-2 ms-2 me-2">
                    <label htmlFor="department" className="span-together">
                      {UI.DEPARTMENT}
                      <Box component="span" sx={{ color: '#d32f2f' }}>
                        *
                      </Box>
                      <span className="m-0">:</span>
                    </label>
                    <div className="d-flex justify-content-center w-100">
                      <TextField
                        id="department"
                        type="text"
                        placeholder={`${UI.DEPARTMENT_NAME}`}
                        variant="outlined"
                        size="small"
                        className="form-control"
                        error={!!errors.department}
                        {...register('department', {
                          minLength: {
                            value: VALIDATION_VALUES.MIN_VALUE,
                            message:
                              ERROR_MESSAGE.MIN_ERROR_MSG +
                              VALIDATION_VALUES.MIN_VALUE,
                          },
                          maxLength: {
                            value: VALIDATION_VALUES.MAX_VALUE_64,
                            message:
                              ERROR_MESSAGE.MAX_ERROR_MSG +
                              VALIDATION_VALUES.MAX_VALUE_64,
                          },
                        })}
                      />
                    </div>
                  </div>
                  <div
                    className="field_space"
                    style={{ textAlign: 'right', paddingRight: '2%' }}
                  >
                    {errors.department && (
                      <span className="mandatory">
                        {errors.department.message}
                      </span>
                    )}
                  </div>
                </>
              )}
              {currentStep === 2 && (
                <>
                  <div className="d-flex flex-row align-items-center mt-2 ms-2 me-2">
                    <label htmlFor="recommendFriend" className="span-together">
                      {UI.RECOMMEND_YOUR_FIREND}
                      <span className="m-0">:</span>
                    </label>
                    <div className="d-flex  w-100">
                      <Controller
                        name="recommendFriend"
                        control={control}
                        render={({ field }) => (
                          <Switch
                            id="recommendFriend"
                            name="recommendFriend"
                            checked={field.value}
                            onChange={handleRecommedFriendToggle}
                          />
                        )}
                      />
                    </div>
                  </div>
                  <div className="d-flex flex-column mt-2 ms-2 me-2">
                    <label htmlFor="aspectRatings" className="span-together">
                      {UI.RATINGAS}
                      <Box component="span" sx={{ color: '#d32f2f' }}>
                        *
                      </Box>
                      <span className="m-0">:</span>
                    </label>
                    <div>
                      {categoryRatings.map((eachItem, index) => (
                        <div
                          key={index}
                          className="d-flex align-items-center justify-content-between my-2"
                          style={{ width: '70%' }}
                        >
                          <span>{eachItem.value}:&nbsp;</span>

                          <Controller
                            name={`aspectRatings.${index}.rating`}
                            control={control}
                            render={({ field }) => (
                              <Rating
                                name={eachItem.id}
                                size="large"
                                value={field.value / 100}
                                precision={1}
                                onChange={(event) =>
                                  field.onChange(event.target.value * 100)
                                }
                                sx={{
                                  '.MuiRating-icon': {
                                    marginRight: '4px',
                                  },
                                }}
                              />
                            )}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div
                    className="field_space"
                    style={{ textAlign: 'right', paddingRight: '2%' }}
                  >
                    {errors.aspectRatings && (
                      <span className="mandatory">
                        {errors.aspectRatings.message}
                      </span>
                    )}
                  </div>
                  <div className="d-flex flex-column  mt-4 ms-2 me-2">
                    <label htmlFor="likes" className="form-label col-12">
                      {UI.WHAT_YOU_LIKE_IN_YOUR_COMPANY}
                      {/* <Box component="span" sx={{ color: '#d32f2f' }}>
                        *
                      </Box> */}
                      <span className="m-0">:</span>
                    </label>
                    <textarea
                      rows="7"
                      id="likes"
                      placeholder={UI.WHAT_YOU_LIKE_IN_YOUR_COMPANY}
                      className="form-control"
                      {...register('likes', {
                        minLength: {
                          value: VALIDATION_VALUES.MIN_VALUE,
                          message:
                            ERROR_MESSAGE.MIN_ERROR_MSG +
                            VALIDATION_VALUES.MIN_VALUE,
                        },
                        maxLength: {
                          value: VALIDATION_VALUES.MAX_VALUE_128,
                          message:
                            ERROR_MESSAGE.MAX_ERROR_MSG +
                            VALIDATION_VALUES.MAX_VALUE_128,
                        },
                      })}
                      style={{ resize: 'none' }}
                    />
                  </div>
                  <div
                    className="field_space"
                    style={{ textAlign: 'right', paddingRight: '2%' }}
                  >
                    {errors.likes && (
                      <span className="mandatory">{errors.likes.message}</span>
                    )}
                  </div>
                  <div
                    className="d-flex flex-column  mt-4 ms-2 me-2"
                    style={{ paddingBottom: 10 }}
                  >
                    <label htmlFor="dislikes" className="form-label col-12">
                      {UI.WHAT_YOU_DOESNT_LIKE_IN_YOUR_COMPANY}
                      {/* <Box component="span" sx={{ color: '#d32f2f' }}>
                        *
                      </Box> */}
                      <span className="m-0">:</span>
                    </label>

                    <textarea
                      rows="7"
                      id="dislikes"
                      placeholder={UI.WHAT_YOU_DOESNT_LIKE_IN_YOUR_COMPANY}
                      className="form-control"
                      {...register('dislikes', {
                        minLength: {
                          value: VALIDATION_VALUES.MIN_VALUE,
                          message:
                            ERROR_MESSAGE.MIN_ERROR_MSG +
                            VALIDATION_VALUES.MIN_VALUE,
                        },
                        maxLength: {
                          value: VALIDATION_VALUES.MAX_VALUE_128,
                          message:
                            ERROR_MESSAGE.MAX_ERROR_MSG +
                            VALIDATION_VALUES.MAX_VALUE_128,
                        },
                      })}
                      style={{ resize: 'none' }}
                    />
                  </div>
                  <div
                    className="field_space"
                    style={{ textAlign: 'right', paddingRight: '2%' }}
                  >
                    {errors.dislikes && (
                      <span className="mandatory">
                        {errors.dislikes.message}
                      </span>
                    )}
                  </div>
                </>
              )}
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button size="large" onClick={onClose}>
            {UI.CANCEL}
          </Button>

          <Button
            type="submit"
            size="large"
            onClick={handleSubmit(onClickSubmit)}
            variant="contained"
            startIcon={
              submitLoading && <CircularProgress size="1rem" color="inherit" />
            }
          >
            {UI.SUBMIT}
          </Button>
        </DialogActions>
      </Dialog>
    </FormProvider>
  );
}

EmployerReviewForm.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  companyAndJobTitle: PropTypes.object,
  title: PropTypes.object,
  companyId: PropTypes.number,
  setShouldReloadAfterReview: PropTypes.func,
};

EmployerReviewForm.defaultProps = {
  isOpen: false,
  onClose: noop,
  companyAndJobTitle: EMPTY_OBJECT,
  title: EMPTY_OBJECT,
  companyId: undefined,
  setShouldReloadAfterReview: noop,
};
export default EmployerReviewForm;
