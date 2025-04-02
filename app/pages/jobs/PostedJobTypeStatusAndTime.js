import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import last from 'lodash/last';
import { EMPTY_OBJECT } from '../../constants';
import UI from '../../constants/ui';
import TypeStatusAndTime from '../../components/typeStatusAndTime';
import { getRelativeTime } from '../../formatter/date';

export default function PostedJobTypeStatusAndTime(props) {
  const { job, isMyProfileActivity } = props;
  const jobLastState = useMemo(() => last(job?.states), [job]);
  return (
    <div className="d-flex justify-content-end mt-1">
      <TypeStatusAndTime
        condition={!isMyProfileActivity && jobLastState?.date}
        label={UI.POSTED}
        value={getRelativeTime(jobLastState?.date)}
      />
    </div>
  );
}

PostedJobTypeStatusAndTime.propTypes = {
  job: PropTypes.object,
  isMyProfileActivity: PropTypes.bool,
};

PostedJobTypeStatusAndTime.defaultProps = {
  job: EMPTY_OBJECT,
  isMyProfileActivity: false,
};
