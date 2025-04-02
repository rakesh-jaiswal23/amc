import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import last from 'lodash/last';
import moment from 'moment';
import { EMPTY_OBJECT, EMP_STATE } from '../../constants';
import JOB_STATE from '../../constants/jobState';
import JOB_TYPE from '../../constants/jobType';
import UI from '../../constants/ui';
import {
  getCandidateType,
  getCandidateJobState,
} from '../../formatter/candidateBootstrap';
import { getRelativeTime } from '../../formatter/date';
import { getJobState } from '../../formatter/employerBootstrap';
import TypeStatusAndTime from '../../components/typeStatusAndTime';
import Content from '../../components/content';

function JobTypeStatusAndTime(props) {
  const { job, isMyProfileActivity, detailsPage } = props;
  const lastEmpState = useMemo(() => last(job.empstate), [job]);
  const lastCandState = useMemo(() => last(job.candstate), [job]);
  const jobLastState = useMemo(() => last(job?.states), [job]);
  const candAppliedState = useMemo(
    () =>
      job.candstate?.find((stateObj) => stateObj.state === JOB_TYPE.APPLIED),
    [job]
  );

  const getTime = (timestamp) => {
    const momentTime = moment(timestamp);
    const now = moment();

    const diffInMonths = now.diff(momentTime, 'months');

    if (diffInMonths > 0) {
      if (diffInMonths === 1) {
        return UI.ONE_MONTH_AGO;
      }
      return UI.ONE_MONTH_PULS_AGO;
    }
    return momentTime.fromNow();
  };

  return (
    <div className="d-flex justify-content-between my-1">
      <Content condition={detailsPage}>
        <Content condition={isMyProfileActivity}>
          <Content condition={candAppliedState?.state && !lastEmpState}>
            {/* Candidate state : Applied */}
            <TypeStatusAndTime
              condition
              label={getCandidateJobState(candAppliedState?.state)}
              value={getRelativeTime(candAppliedState?.date)}
              isThreeStatus={
                isMyProfileActivity &&
                lastEmpState?.state &&
                lastEmpState?.state !== EMP_STATE
              }
              detailsPage={detailsPage}
            />
            <span className="text-secondary align-self-center">
              {UI.RESPONSE_AWAITED}
            </span>
          </Content>

          {/* Employer state like Unlocked/Interviewed */}
          <TypeStatusAndTime
            condition={lastEmpState?.state && lastEmpState?.state !== EMP_STATE}
            label={getCandidateType(lastEmpState?.state || EMP_STATE)}
            value={getRelativeTime(lastEmpState?.date)}
            isThreeStatus={
              isMyProfileActivity &&
              lastEmpState?.state &&
              lastEmpState?.state !== EMP_STATE
            }
            detailsPage={detailsPage}
          />
        </Content>

        <Content condition={!isMyProfileActivity}>
          {/* Candidate state : Applied */}
          <TypeStatusAndTime
            condition={candAppliedState?.state}
            label={getCandidateJobState(candAppliedState?.state)}
            value={getRelativeTime(candAppliedState?.date)}
            isThreeStatus={
              isMyProfileActivity &&
              lastEmpState?.state &&
              lastEmpState?.state !== EMP_STATE
            }
            detailsPage={detailsPage}
          />

          {/* Candidate job state: Shortlisted/Not Suitable */}
          <TypeStatusAndTime
            condition={
              lastCandState?.state &&
              lastCandState?.state !== JOB_TYPE.APPLIED &&
              lastCandState?.state !== JOB_TYPE.NEW
            }
            label={getCandidateJobState(lastCandState?.state)}
            value={getRelativeTime(lastCandState?.date)}
            detailsPage={detailsPage}
          />
        </Content>
      </Content>

      <Content condition={!detailsPage}>
        {/* Employer state like Unlocked/Interviewed */}
        <TypeStatusAndTime
          condition={
            isMyProfileActivity &&
            lastEmpState?.state &&
            lastEmpState?.state !== EMP_STATE
          }
          label={getCandidateType(lastEmpState?.state || EMP_STATE)}
          value={getRelativeTime(lastEmpState?.date)}
          isThreeStatus={
            isMyProfileActivity &&
            lastEmpState?.state &&
            lastEmpState?.state !== EMP_STATE
          }
        />

        {/* Candidate state : Applied */}
        <TypeStatusAndTime
          condition={candAppliedState?.state}
          label={getCandidateJobState(candAppliedState?.state)}
          value={getRelativeTime(candAppliedState?.date)}
          isThreeStatus={
            isMyProfileActivity &&
            lastEmpState?.state &&
            lastEmpState?.state !== EMP_STATE
          }
        />

        {/* Job state is not published, could be filled/expired */}
        <TypeStatusAndTime
          condition={
            isMyProfileActivity && jobLastState?.state !== JOB_STATE.PUBLISHED
          }
          label={getJobState(jobLastState?.state)}
          value={getRelativeTime(jobLastState?.date)}
          isThreeStatus={
            isMyProfileActivity &&
            lastEmpState?.state &&
            lastEmpState?.state !== EMP_STATE
          }
        />

        {/* Candidate job state: Shortlisted/Not Suitable */}
        <TypeStatusAndTime
          condition={
            lastCandState?.state &&
            lastCandState?.state !== JOB_TYPE.APPLIED &&
            lastCandState?.state !== JOB_TYPE.NEW
          }
          label={getCandidateJobState(lastCandState?.state)}
          value={getRelativeTime(lastCandState?.date)}
        />

        {/* Job state: Posted (only on LHS card) */}
        <TypeStatusAndTime
          condition={!isMyProfileActivity && jobLastState?.date}
          label={UI.POSTED}
          value={getTime(jobLastState?.date)}
        />
      </Content>
    </div>
  );
}

JobTypeStatusAndTime.propTypes = {
  job: PropTypes.object,

  isMyProfileActivity: PropTypes.bool,
  detailsPage: PropTypes.bool,
};

JobTypeStatusAndTime.defaultProps = {
  job: EMPTY_OBJECT,

  isMyProfileActivity: false,
  detailsPage: false,
};

export default JobTypeStatusAndTime;
