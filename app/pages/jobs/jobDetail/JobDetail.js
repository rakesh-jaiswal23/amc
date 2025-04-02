import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ShareIcon from '@mui/icons-material/Share';
import {
  CircularProgress,
  Dialog,
  DialogContent,
  IconButton,
  Link,
  Rating,
} from '@mui/material';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import { noop } from 'lodash';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { BsDot } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { NavLink, useSearchParams } from 'react-router-dom';
import URL from '../../../constants/urls';
// import { BsBookmarkStar, BsDot } from 'react-icons/bs';
import { showSnackBar } from '../../../../redux/snackBarSlice';
import ActionMenu from '../../../components/actionMenu';
import SkillRatingExpTestDateView from '../../../components/candidateComponent/SkillRatingExpTestDateView';
import Content from '../../../components/content';
import DropDownButton from '../../../components/dropDownButton/dropDownButton';
import HeadingLabelValueView from '../../../components/headingLabelValueView';
import LabelValueView from '../../../components/labelValueView';
import Remark from '../../../components/remark';
import ReportAbuseDialog from '../../../components/reportAbuseDialog/reportAbuseDialog';
import CustomizedTimeline from '../../../components/timeline/CustomizedTimeline';
import {
  EMPTY_ARRAY,
  EMPTY_OBJECT,
  EMPTY_TAG_ID,
  EXP_FRESHER_ID,
  INTERNSHIP_ID,
  OTHER_SALARY_ID,
  REMOTE_100_ID,
  REMOTE_ID,
} from '../../../constants';
import { API_URL, getCandidateAssessment } from '../../../constants/apiUrls';
import UI from '../../../constants/ui';
import { getPrimaryActions } from '../../../formatter/base.bootstrap';
import {
  getJobType,
  getSalary,
  getShift,
  getWorkLocation,
} from '../../../formatter/candidateBootstrap';
import {
  getEducation,
  getExperience,
  getOtherBenifit,
  getPayBenifit,
  getProjectRoles,
} from '../../../formatter/commonBootstrap';
import { getFormattedDate } from '../../../formatter/date';
import { getFormattedCurrencyRangePerAnnum } from '../../../formatter/number';
import getPrefixAndUpperName from '../../../helpers/ prefixAndUpperName';
import DynamicTitle from '../../../helpers/DynamicTitle';
import getPluralize from '../../../helpers/plural';
import { getLoginDetailFromSession } from '../../../helpers/sessionDetails';
import useMobileDevice from '../../../hooks/useMobileDevice';
import '../../../styles/styles.css';
import JobTypeStatusAndTime from '../JobTypeStatusAndTime';
import PostedJobTypeStatusAndTime from '../PostedJobTypeStatusAndTime';
import { getJobActions } from '../jobs.helper';
import { getJobTimeline } from '../jobs.service';
import { PROJECT_ROLES_TYPE } from '../../../constants/projectroles.constants';
import { getRequest } from '../../../services';
import ErrorSnackBar from '../../../components/snackBar/ErrorSnackBar';
import AssessmentDetailsDialog from '../../assessment/AssessmentDetailsDialog';
import LOGIN_TYPE from '../../../constants/loginType';
import getStarColor from '../employer/Employer.helper';
import STORAGE_KEY from '../../../constants/storageKey';

function JobDetail(props) {
  const { detail: jobDetail, onAction, isMyProfileActivity, jobPage } = props;
  const isMobileDevice = useMobileDevice();
  const [jobActions, setJobActions] = useState(EMPTY_ARRAY);
  const [assessmentDetailsLoading, setAssessmentDetailsLoading] =
    useState(false);
  const [finalTitle, setFinalTitle] = useState('');
  const [finalDescription, setFinalDescription] = useState('');

  const [opensnackbar, setSnackbarOpen] = useState();
  const [isClickedOnAIInterview, setIsClickedOnAIInterview] = useState(false);
  const [searchParams] = useSearchParams();
  const employerIdParam = searchParams.get('employerId');
  const [openReportDialog, setOpenReportDialog] = useState(false);
  const dispatch = useDispatch();
  const [showTimeline, setShowTimeline] = useState(false);
  const [timelineStates, setTimelineStates] = useState(EMPTY_ARRAY);
  const [isAssessmentModalOpen, setIsAssessmentModalOpen] = useState(false);
  const [assessmentDetails, setAssessmentDetails] = useState();

  const makeTitle = () => {
    // extracting skills
    let skill = '';
    jobDetail?.skills?.forEach((skillDetails, index) => {
      if (index === 0) skill = `${skillDetails.name}`;
      else skill = `${skill}, ${skillDetails.name}`;
    });

    // company name
    const employer = jobDetail?.employer;

    // extracting experience for title and description
    let experience = getExperience(jobDetail?.exp) || '';
    let descExperience = '';
    if (jobDetail?.exp === EXP_FRESHER_ID) {
      experience = ` - ${UI.FRESHER}`;
      descExperience = `${UI.FRESHER}`;
    } else if (experience && typeof experience === 'string') {
      descExperience = `${experience.replace(/-/g, ' to ')} of experience`;
      experience = ` - ${experience.replace(/-/g, ' to ')} of experience`;
    }

    // extrating location
    let location = '';
    jobDetail?.joblocations?.forEach((joblocation, index) => {
      if (index === 0) location = `${joblocation.shortname}`;
      else location = `${location}, ${joblocation.shortname}`;
    });

    // extracting job title
    const jobTitle = jobDetail.title;

    // creating title
    setFinalTitle(
      `${jobTitle === '' ? '' : `${jobTitle}`} - ${employer}${
        jobDetail.worklocation === REMOTE_ID ||
        jobDetail.worklocation === REMOTE_100_ID
          ? ` - ${UI.REMOTE_JOB}`
          : ''
      }${skill === '' ? '' : ` - ${skill}`}${
        jobDetail.jobtype === INTERNSHIP_ID ? ` - ${UI.INTERNSHIP}` : ''
      }${location === '' ? '' : ` - ${location}`}${
        experience === '' ? '' : experience
      }`
    );

    // creating description
    setFinalDescription(
      `Job Description for ${jobTitle}${
        jobDetail.worklocation === REMOTE_ID ||
        jobDetail.worklocation === REMOTE_100_ID
          ? ` (${UI.REMOTE_JOB})`
          : ''
      } in ${employer}${skill !== '' ? ` in ${skill}` : ''}${
        location !== '' ? ` in ${location}` : ''
      }${jobDetail.jobtype === INTERNSHIP_ID ? ` for ${UI.INTERNSHIP}` : ''}${
        descExperience !== '' ? ` for ${descExperience}` : ''
      }. ${UI.APPLYNOW}.`
    );
  };

  useEffect(() => {
    const updatedJobActions = getJobActions(jobDetail, isMyProfileActivity);
    setJobActions(updatedJobActions);
    // creating title
    makeTitle();
  }, [jobDetail]);
  const handleTimelineButton = () => {
    getJobTimeline(getLoginDetailFromSession()?.entityId, jobDetail.projectid)
      .then((res) => {
        setShowTimeline(true);
        setTimelineStates(res);
      })
      .catch((err) => {
        dispatch(
          showSnackBar({
            setopen: true,
            message: err?.msg,
            severity: 'error',
          })
        );
      });
  };

  const onPrerequisitesClick = (value, clicked) => {
    setAssessmentDetailsLoading(true);
    setIsClickedOnAIInterview(clicked);
    getRequest(getCandidateAssessment(value))
      .then((res) => {
        setIsAssessmentModalOpen(true);
        setAssessmentDetails(res);
        localStorage.setItem(
          STORAGE_KEY.SELECTED_ASSESSMENT,
          JSON.stringify(res)
        );
      })
      .catch((error) => {
        setSnackbarOpen({
          setopen: true,
          message: error.msg,
          severity: 'error',
        });
      })
      .finally(() => setAssessmentDetailsLoading(false));
  };

  const onClickOnCloseIcon = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsAssessmentModalOpen(false);
  };
  const showExtraItems = () => {
    if (
      getLoginDetailFromSession() &&
      getLoginDetailFromSession()?.role === LOGIN_TYPE.CANDIDATE
    ) {
      return true;
    }
    return false;
  };
  const renderAssessementDailog = () => (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={isAssessmentModalOpen}
      onClose={onClickOnCloseIcon}
      sx={{ overflow: 'visible' }}
    >
      {isAssessmentModalOpen && (
        <DialogContent dividers component="div" style={{ padding: 18 }}>
          <IconButton
            aria-label="close"
            onClick={onClickOnCloseIcon}
            sx={{
              position: 'absolute',
              right: 18,
              top: 20,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CancelOutlinedIcon />
          </IconButton>
          {!assessmentDetailsLoading ? (
            <AssessmentDetailsDialog
              assessmentDetails={assessmentDetails}
              showAsCard
              shouldShowExtraItems={showExtraItems()}
              setIsAssessmentModalOpen={setIsAssessmentModalOpen}
              isClickedOnAIInterview={isClickedOnAIInterview}
            />
          ) : (
            <div className="d-flex justify-content-center">
              <CircularProgress size="2rem" />
            </div>
          )}
        </DialogContent>
      )}
    </Dialog>
  );
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen({ setopen: false });
  };

  const currentUrl = window.location.href;

  return (
    <>
      {searchParams.get('jobId') !== null && (
        // TODO DynamicTitle to be removed
        <DynamicTitle
          title={finalTitle}
          description={finalDescription}
          url={currentUrl}
        />
      )}
      <ReportAbuseDialog
        entityId={jobDetail.id}
        reportAboutId={3}
        openReportDialog={openReportDialog}
        setOpenReportDialog={setOpenReportDialog}
      />

      <div className="px-4 pt-3 pb-2">
        <div className="d-flex justify-content-between">
          <div className="d-flex align-items-center">
            {jobDetail?.logo ? (
              <img
                src={`${API_URL.PHOTO_PRE}${jobDetail?.logo}`}
                alt={UI.ALT_JOB_LOGO}
                className="logo-detail-size logo"
              />
            ) : (
              <span className="justify-content-center d-flex logo-detail-size logo-text logo">
                {getPrefixAndUpperName(jobDetail?.employer)}
              </span>
            )}
            {jobDetail.rating > 0 && (
              <div className="ms-1">
                <Rating
                  name="custom-rating"
                  value={jobDetail.rating}
                  precision={0.5}
                  readOnly
                  sx={{
                    color: getStarColor(jobDetail.rating),
                  }}
                />
              </div>
            )}
          </div>
          <div>
            <ActionMenu actions={jobActions} onAction={onAction} />
          </div>
        </div>

        <div className="row-12 mt-2">
          <Content condition={jobDetail?.title}>
            <h1 className="col-12 mb-0 headline-5-bold">{jobDetail.title}</h1>
          </Content>
          <Content condition={jobDetail?.employer}>
            {employerIdParam ? (
              <div className="col-12 subtitle-1 color-5B5B5B d-flex flex-wrap">
                {jobDetail.employer}&nbsp;
                <Content
                  condition={
                    jobDetail?.project &&
                    jobDetail?.project !== jobDetail?.employer
                  }
                >
                  <span>({jobDetail.project})</span>
                </Content>
              </div>
            ) : (
              <h6 className="col-12 subtitle-1 color-5B5B5B d-flex flex-wrap">
                <Link
                  as={NavLink}
                  to={`${URL.EMPLOYER_META}${jobDetail.employerid}`}
                  target="_blank"
                >
                  {jobDetail.employer}
                </Link>

                <Content
                  condition={
                    jobDetail?.project &&
                    jobDetail?.project !== jobDetail?.employer
                  }
                >
                  <span>({jobDetail.project})</span>
                </Content>
              </h6>
            )}
          </Content>
        </div>

        <div className="row">
          {/* <Button variant="contained" size="large" fullWidth>
            Apply
          </Button> */}
          {/* <span className={`button color-F25C05 p-1`}>
            <BsBookmarkStar /> Save
          </span> */}
          <div className="text-end my-md-0 my-1">
            <Content condition={jobDetail?.jobtype}>
              <span className="subtitle-1 color-1F2830">
                {getJobType(jobDetail.jobtype)}
              </span>
            </Content>

            <Content condition={jobDetail.worklocation}>
              <span className="subtitle-1 color-1F2830">
                <BsDot /> {getWorkLocation(jobDetail.worklocation)}
              </span>
            </Content>
          </div>

          <div className="d-flex">
            <JobTypeStatusAndTime
              job={jobDetail}
              isMyProfileActivity={isMyProfileActivity}
              detailsPage
            />
            {jobActions && getPrimaryActions(jobActions).length > 0 && (
              <DropDownButton
                actions={getPrimaryActions(jobActions)}
                onAction={onAction}
              />
            )}
            {jobDetail?.empstate && (
              <div className="mt-1 ms-2 me-1">
                <Button onClick={handleTimelineButton} variant="contained">
                  {UI.SHOW_TIMELINE}
                </Button>

                <CustomizedTimeline
                  states={timelineStates}
                  showTimeline={showTimeline}
                  setShowTimeline={setShowTimeline}
                />
              </div>
            )}

            <div className="flex-grow-1 text-end mt-2">
              <Tooltip title={UI.COPY_LINK_TOOLTIP}>
                <ShareIcon
                  className={!jobPage ? `mx-2` : ''}
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `${window.location.origin}${URL.JOB_META}${jobDetail.id}`
                    );
                    dispatch(
                      showSnackBar({
                        setopen: true,
                        message: `${UI.LINK_COPIED}`,
                        severity: 'info',
                      })
                    );
                  }}
                  style={{ cursor: 'pointer' }}
                />
              </Tooltip>
              {!jobPage && (
                <Link
                  as={NavLink}
                  to={`${URL.JOB_META}${jobDetail.id}?myProfileActivity=${isMyProfileActivity}`}
                  target="_blank"
                  aria-label="Job Detail"
                >
                  <Tooltip title={UI.OPEN_TAB_TOOLTIP}>
                    <OpenInNewIcon style={{ color: 'black' }} />
                  </Tooltip>
                </Link>
              )}
            </div>
          </div>

          <div>
            <Remark state={jobDetail} />
          </div>
          <PostedJobTypeStatusAndTime
            job={jobDetail}
            isMyProfileActivity={isMyProfileActivity}
            detailsPage
          />
        </div>
      </div>
      <Divider />

      <div
        className={
          isMobileDevice
            ? 'row-12 px-4 pb-4'
            : `px-4 pb-4 ${!jobPage && 'detailview'}`
        }
      >
        <HeadingLabelValueView label={UI.JOB_DESCRIPTION}>
          <LabelValueView
            condition={jobDetail.description}
            value={jobDetail.description}
            isValueHTML
          />
        </HeadingLabelValueView>
        <LabelValueView
          condition={
            jobDetail?.prerequisites &&
            (jobDetail?.prerequisites[0]?.enabled ||
              jobDetail?.prerequisites[1]?.enabled ||
              jobDetail?.prerequisites[3]?.enabled ||
              jobDetail?.prerequisites[4]?.enabled)
          }
          label={UI.PRE_REQUISITES}
          value={jobDetail?.prerequisites}
          onPrerequisitesClick={onPrerequisitesClick}
        />
        <LabelValueView
          condition={
            jobDetail?.tag?.length && jobDetail.tag[0].tagid !== EMPTY_TAG_ID
          }
          label={UI.TAGS}
          value={jobDetail?.tag?.map((tag, index, arr) => (
            <span key={index} className="body-1 color-1F2830">
              #{tag.name}
              {index < arr.length - 1 && ' '}
            </span>
          ))}
        />
        <HeadingLabelValueView label={UI.SKILLS_AND_EXPERIENCE}>
          <LabelValueView
            condition={jobDetail?.exp}
            label={UI.OVERALL_EXPERIENCE}
            value={getExperience(jobDetail?.exp)}
          />

          <LabelValueView
            condition={jobDetail?.skills?.length}
            label={getPluralize(UI.SKILL, jobDetail.skills.length)}
          >
            <SkillRatingExpTestDateView skills={jobDetail.skills} isAll />
          </LabelValueView>
        </HeadingLabelValueView>

        <HeadingLabelValueView label={UI.JOB_DETAILS}>
          <LabelValueView
            condition={jobDetail.worklocation}
            label={UI.WORK_LOCATION}
            value={getWorkLocation(jobDetail.worklocation)}
          />

          <LabelValueView
            condition={jobDetail.jobtype}
            label={UI.JOB_TYPE}
            value={getJobType(jobDetail.jobtype)}
          />

          <LabelValueView
            condition={jobDetail?.joblocations?.length}
            label={getPluralize(UI.LOCATION, jobDetail?.joblocations?.length)}
            value={jobDetail?.joblocations?.map((location, index, arr) => (
              <span key={index} className="body-1 color-1F2830">
                {location.shortname}
                {index < arr.length - 1 && ', '}
              </span>
            ))}
          />

          <LabelValueView
            condition={jobDetail?.salary}
            label={UI.SALARY}
            value={
              jobDetail?.salary?.id !== OTHER_SALARY_ID
                ? getSalary(jobDetail?.salary?.id)
                : getFormattedCurrencyRangePerAnnum(
                    jobDetail?.salary?.min,
                    jobDetail?.salary?.max
                  )
            }
          />

          <LabelValueView
            condition={jobDetail?.education}
            label={UI.MINIMUM_QUALIFICATION}
            value={getEducation(jobDetail?.education)}
          />
        </HeadingLabelValueView>

        <HeadingLabelValueView
          label={UI.OTHER_DETAILS}
          condition={
            !!(
              jobDetail?.shift ||
              jobDetail?.openings > 0 ||
              jobDetail?.alwaysopen ||
              jobDetail?.startdate ||
              jobDetail?.jobdeadline ||
              jobDetail?.jobexpires ||
              jobDetail?.paybenefits?.length ||
              jobDetail?.otherbenefits?.length ||
              jobDetail?.prerequisites?.length
            )
          }
        >
          <LabelValueView
            condition={jobDetail?.shift}
            label={UI.SHIFT}
            value={getShift(jobDetail.shift)}
          />

          <LabelValueView
            condition={jobDetail?.openings > 0}
            label={getPluralize(UI.NUMBER_OF_OPENING, jobDetail.openings)}
            value={jobDetail.openings}
          />
          <LabelValueView
            condition={jobDetail?.alwaysopen}
            label={UI.ALWAYS_HIRING}
            value={UI.YES}
          />

          <LabelValueView
            condition={jobDetail?.startdate}
            label={UI.START_DATE}
            value={getFormattedDate(jobDetail.startdate)}
          />

          <LabelValueView
            condition={jobDetail?.jobdeadline}
            label={UI.JOB_DEADLINE}
            value={getFormattedDate(jobDetail.jobdeadline)}
          />

          <LabelValueView
            condition={jobDetail?.jobexpires}
            label={UI.JOB_EXPIRES_ON}
            value={getFormattedDate(jobDetail.jobexpires)}
          />

          <LabelValueView
            condition={jobDetail?.paybenefits?.length}
            label={UI.PAY_BENEFITS}
            value={jobDetail?.paybenefits?.map(getPayBenifit).join(', ')}
          />

          <LabelValueView
            condition={jobDetail?.otherbenefits?.length}
            label={UI.OTHER_BENEFITS}
            value={jobDetail?.otherbenefits?.map(getOtherBenifit)?.join(', ')}
          />
        </HeadingLabelValueView>

        <HeadingLabelValueView
          condition={!!jobDetail?.contactperson}
          label={UI.CONTACT_DETAILS}
        >
          <LabelValueView
            condition={jobDetail?.contactperson}
            label={UI.CONTACT_PERSON}
            value={jobDetail?.contactperson}
          />

          <LabelValueView
            condition={jobDetail?.hrole}
            label={UI.ROLE}
            value={
              getProjectRoles(PROJECT_ROLES_TYPE.HROLE).find(
                (obj) => obj.id === jobDetail?.hrole
              )?.value
            }
          />
        </HeadingLabelValueView>
        <hr />
        {getLoginDetailFromSession() != null && (
          <div className="d-flex justify-content-end">
            <Button
              variant="outlined"
              onClick={() => {
                setOpenReportDialog(true);
              }}
            >
              Report Job
            </Button>
          </div>
        )}
      </div>
      {renderAssessementDailog()}

      <ErrorSnackBar opensnackbar={opensnackbar} handleClose={handleClose} />
    </>
  );
}
JobDetail.propTypes = {
  detail: PropTypes.object,
  onAction: PropTypes.func,
  isMyProfileActivity: PropTypes.bool,
  jobPage: PropTypes.bool,
  title: PropTypes.string,
};

JobDetail.defaultProps = {
  detail: EMPTY_OBJECT,
  onAction: noop,
  isMyProfileActivity: false,
  jobPage: false,
  title: null,
};

export default JobDetail;
