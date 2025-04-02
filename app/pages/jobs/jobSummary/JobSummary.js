import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';

// import { BsBookmarkStar } from 'react-icons/bs';
import Tooltip from '@mui/material/Tooltip';
import { EMPTY_ARRAY, EMPTY_OBJECT } from '../../../constants';
import Content from '../../../components/content';
import { getJobActions } from '../jobs.helper';
import getPrefixAndUpperName from '../../../helpers/ prefixAndUpperName';
import ActionMenu from '../../../components/actionMenu';
import { API_URL } from '../../../constants/apiUrls';
import JobCommonSummaryDetail from '../JobCommonSummaryDetail';
import JobTypeStatusAndTime from '../JobTypeStatusAndTime';
import UI from '../../../constants/ui';
import SkillRatingView from '../../../components/candidateComponent/SkillRatingView';
import Remark from '../../../components/remark';

function JobSummary(props) {
  const {
    onAction,
    item: job,
    isMyProfileActivity,
    setSelectedId,
    shouldShowMenu,
  } = props;

  const [jobActions, setJobActions] = useState(EMPTY_ARRAY);

  useEffect(() => {
    const updatedJobActions = getJobActions(job, isMyProfileActivity);
    setJobActions(updatedJobActions);
  }, [job]);
  return (
    <>
      <div className="d-flex">
        <div className="me-1 me-md-3 col-2">
          {job?.logo ? (
            <img
              src={`${API_URL.PHOTO_PRE}${job.logo}`}
              alt={UI.ALT_JOB_LOGO}
              className="logo-summary-size logo"
            />
          ) : (
            <span className="justify-content-center d-flex logo-summary-size logo-text logo">
              {getPrefixAndUpperName(job?.employer)}
            </span>
          )}
        </div>

        <div className="col-8 text-truncate">
          <Content condition={job?.title}>
            <Tooltip title={job?.title}>
              <h2 className="ps-4 ps-md-0 mb-0 text-truncate headline-5-bold">
                {job.title}
              </h2>
            </Tooltip>
          </Content>
          <Content condition={job?.employer}>
            <div className="ps-4 ps-md-0 subtitle-1 color-5B5B5B d-flex flex-wrap">
              {job.employer}&nbsp;
              <Content
                condition={job?.project && job?.project !== job?.employer}
              >
                <span>({job.project})</span>
              </Content>
            </div>
          </Content>
        </div>

        {isMyProfileActivity ||
          (shouldShowMenu && (
            <div className="col-2">
              <ActionMenu
                actions={jobActions}
                onAction={onAction}
                setSelectedId={setSelectedId}
                data={job}
              />
            </div>
          ))}
      </div>

      <JobCommonSummaryDetail job={job} />

      <Content condition={job?.skills}>
        <div className="mt-3">
          <SkillRatingView skills={job.skills} />
        </div>
      </Content>

      <JobTypeStatusAndTime
        job={job}
        isMyProfileActivity={isMyProfileActivity}
      />

      <div>
        <Remark state={job} />
      </div>
    </>
  );
}

JobSummary.propTypes = {
  item: PropTypes.object,
  onAction: PropTypes.func,
  isMyProfileActivity: PropTypes.bool,
  setSelectedId: PropTypes.func,
  shouldShowMenu: PropTypes.bool,
};

JobSummary.defaultProps = {
  item: EMPTY_OBJECT,
  onAction: noop,
  isMyProfileActivity: false,
  setSelectedId: noop,
  shouldShowMenu: true,
};

export default JobSummary;
