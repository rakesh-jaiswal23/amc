import React, { useState } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import JobDetail from './jobDetail';

import {
  EMPTY_ARRAY,
  DEFAULT_CONTEXT_ID,
  DEFAULT_SELECTED_PAGE,
  DEFAULT_COUNT,
} from '../../constants';

import JobSummary from './jobSummary';
import {
  updateJobsSummary,
  updateCandStateInJobDetail,
  getJob,
} from './jobs.helper';
import SummaryDetail from '../../components/summaryDetail';

import { getJobDetail } from './jobs.service';

import ACTIONS from '../../constants/summaryDetail.actionTypes';

import ErrorSnackBar from '../../components/snackBar/ErrorSnackBar';
import { GAJobEventHandler } from '../../helpers/GAEventHandler';
import STATUS_CODE from '../../constants/statusCode';
import JOB_TYPE from '../../constants/jobType';
import UI from '../../constants/ui';

// import LoginDialog from '../loginDialog';
// import { getUrlAndRedirect } from '../../helpers/getRedirectUrl';
// import STATUS_CODE from '../../constants/statusCode';
// import URL from '../../constants/urls';

function Jobs(props) {
  const {
    selectedPage,
    paginationRequestToServer,
    sortByRequestToServer,
    jobsSummary,
    count,
    updateSearchResponseCards,
    pageType,
    isSummarySkeletonShow,
    isMyProfileActivity,
    isModalShow,
  } = props;
  const [jobDetail, setJobDetail] = useState();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [savedDlgOpen, setSavedDlgOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [dailogAction, setDailogAction] = useState();
  const [selectedJobId, setSelectedJobId] = useState();
  const [opensnackbar, setSnackbarOpen] = useState();

  const [isDetailSkeletonShow, setIsDetailSkeletonShow] = useState();
  // TODO: remove
  // const [isLoginDialogVisible, setIsLoginDialogVisible] = useState(false);

  const handleClose = (_, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen({ setopen: false });
  };

  // const handleCloseLoginDialog = () => {
  //   setIsLoginDialogVisible(false);
  // };

  const jobAction = (selectedId, actionId) => {
    const job = getJob(jobsSummary, selectedId);
    updateJobsSummary(
      jobsSummary,
      actionId,
      job,
      pageType,
      isMyProfileActivity,
      setSnackbarOpen
    )
      .then(([updatedJobs, updatedJobDetail]) => {
        GAJobEventHandler(actionId);
        updateSearchResponseCards(updatedJobs);
        if (updatedJobDetail) {
          setJobDetail(updatedJobDetail);
        }
      })
      .catch((error) => {
        if (
          error.code === STATUS_CODE.PREREQUISITE_FAILED_SAVE &&
          JOB_TYPE.APPLIED === actionId
        ) {
          setDialogOpen(true);
          setDailogAction(JOB_TYPE.SHORTLISTED);
          setSelectedJobId(selectedId);
          setErrorMessage(error.msg);
        } else if (
          error.code === STATUS_CODE.PREREQUISITE_FAILED &&
          JOB_TYPE.APPLIED === actionId
        ) {
          setSavedDlgOpen(true);
          setErrorMessage(error.msg);
        }
      });
  };

  const onAction = ({ type, payload }) => {
    if (type === ACTIONS.ON_ACTION) {
      const { action, selectedId } = payload;
      jobAction(selectedId, action.id);
    } else if (type === ACTIONS.ON_SELECT) {
      const { selectedId } = payload;

      const job = getJob(jobsSummary, selectedId);

      if (selectedId) {
        setIsDetailSkeletonShow(true);
        getJobDetail(job, pageType).then((jobDetailResponse) => {
          const updatedJobDetail = updateCandStateInJobDetail(
            jobsSummary,
            jobDetailResponse
          );
          setJobDetail(updatedJobDetail);
          setIsDetailSkeletonShow(false);
        });
      } else {
        setJobDetail();
      }
    } else if (type === ACTIONS.ON_PAGE_CHANGE) {
      const { page } = payload;
      paginationRequestToServer(page);
    } else if (type === ACTIONS.ON_SORT_BY) {
      const { sortBy } = payload;
      sortByRequestToServer(sortBy);
    }
  };

  return (
    <>
      <SummaryDetail
        selectedPage={selectedPage}
        list={jobsSummary}
        onAction={onAction}
        count={count}
        detail={jobDetail}
        summaryView={JobSummary}
        detailView={JobDetail}
        pageType={pageType}
        isSummarySkeletonShow={isSummarySkeletonShow}
        isDetailSkeletonShow={isDetailSkeletonShow}
        isMyProfileActivity={isMyProfileActivity}
        isModalShow={isModalShow}
      />
      <Dialog
        open={dialogOpen || savedDlgOpen}
        onClose={() =>
          dialogOpen ? setDialogOpen(false) : setSavedDlgOpen(false)
        }
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <span>{UI.JOB_PRE_REQUISITES}</span>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <span>{errorMessage}</span>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() =>
              dialogOpen ? setDialogOpen(false) : setSavedDlgOpen(false)
            }
            variant="contained"
          >
            {UI.CLOSE}
          </Button>
          {dialogOpen && (
            <Button
              variant="contained"
              onClick={() => {
                setDialogOpen(false);
                jobAction(selectedJobId, dailogAction);
              }}
            >
              {UI.SAVE_AND_CLOSE}
            </Button>
          )}
        </DialogActions>
      </Dialog>

      <ErrorSnackBar opensnackbar={opensnackbar} handleClose={handleClose} />
      {/* <LoginDialog
        setLoggedInUserRole={setLoggedInUserRole}
        isDialogOpen={isLoginDialogVisible}
        onDialogClose={handleCloseLoginDialog}
      /> */}
    </>
  );
}

Jobs.propTypes = {
  paginationRequestToServer: PropTypes.func,
  sortByRequestToServer: PropTypes.func,
  selectedPage: PropTypes.number,
  jobsSummary: PropTypes.array,
  updateSearchResponseCards: PropTypes.func,
  count: PropTypes.number,
  pageType: PropTypes.number,
  isMyProfileActivity: PropTypes.bool,
  isSummarySkeletonShow: PropTypes.bool,
  isModalShow: PropTypes.bool,
};

Jobs.defaultProps = {
  paginationRequestToServer: noop,
  sortByRequestToServer: noop,
  selectedPage: DEFAULT_SELECTED_PAGE,
  jobsSummary: EMPTY_ARRAY,
  updateSearchResponseCards: noop,
  count: DEFAULT_COUNT,
  pageType: DEFAULT_CONTEXT_ID,
  isMyProfileActivity: false,
  isSummarySkeletonShow: false,
  isModalShow: false,
};

export default Jobs;
