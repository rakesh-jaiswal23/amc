import { noop } from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import Jobs from '../Jobs';
import JOB_TYPE from '../../../constants/jobType';
import { DEFAULT_SELECTED_PAGE, EMPTY_ARRAY } from '../../../constants';

function EmployerJobs(props) {
  const {
    paginationRequestToServer,
    sortByRequestToServer,
    count,
    selectedPage,
    jobs,
    isSummarySkeletonShow,
  } = props;

  return (
    <div>
      {count > 0 ? (
        <Jobs
          selectedPage={selectedPage}
          paginationRequestToServer={paginationRequestToServer}
          sortByRequestToServer={sortByRequestToServer}
          jobsSummary={jobs}
          count={count}
          pageType={JOB_TYPE.NEW}
          isSummarySkeletonShow={isSummarySkeletonShow}
        />
      ) : (
        <div className="d-flex flex-column align-items-center my-2">
          <span className="headline-6-bold">No Jobs posted by the company</span>
          {/* <Button
            variant="contained"
            onClick={() => dispatch(setShowLoginDialog())}
            className="my-2"
          >
            Login
          </Button> */}
        </div>
      )}
    </div>
  );
}

EmployerJobs.propTypes = {
  paginationRequestToServer: PropTypes.func,
  sortByRequestToServer: PropTypes.func,
  count: PropTypes.number,
  selectedPage: PropTypes.number,
  jobs: PropTypes.array,
  isSummarySkeletonShow: PropTypes.bool,
};

EmployerJobs.defaultProps = {
  paginationRequestToServer: noop,
  sortByRequestToServer: noop,
  count: 0,
  selectedPage: DEFAULT_SELECTED_PAGE,
  jobs: EMPTY_ARRAY,
  isSummarySkeletonShow: false,
};

export default EmployerJobs;
