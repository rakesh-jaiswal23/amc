import { CircularProgress } from '@mui/material';
import { noop } from 'lodash';
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import React, { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import PropTypes from 'prop-types';
// import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import {
  DEFAULT_SELECTED_PAGE,
  EMPTY_ARRAY,
  EMPTY_OBJECT,
} from '../../../constants';
import { API_URL } from '../../../constants/apiUrls';
import UI from '../../../constants/ui';
import getPrefixAndUpperName from '../../../helpers/ prefixAndUpperName';
import DynamicTitle from '../../../helpers/DynamicTitle';
import { getEmployerDetail } from '../../employers/employers.services';
import EmployerJobs from './EmployerJobs';
import EmployerProfile from './EmployerProfile';
import EmployerReview from './EmployerReview';
import { getRequest } from '../../../services';
import { getReviewSortType } from '../../../formatter/commonBootstrap';
import { showSnackBar } from '../../../../redux/snackBarSlice';
import { getLoginDetailFromSession } from '../../../helpers/sessionDetails';
import LOGIN_TYPE from '../../../constants/loginType';
import SORT_BY from '../../../constants/sortBy';
import { getPostedJob } from '../jobs.service';
import STORAGE_KEY from '../../../constants/storageKey';
import EmployerCompayReviewInputField from './EmployerCompayReviewInputField';
import { getTabs } from './Employer.helper';

function Employer(props) {
  const { setShowNavBar } = props;
  const dispatch = useDispatch();
  const location = useLocation();
  const loginDetails = getLoginDetailFromSession();

  const [tabs, setTabs] = useState(
    !loginDetails
      ? getTabs()
      : loginDetails?.role === LOGIN_TYPE.CANDIDATE
      ? getTabs()
      : getTabs(true)
  );

  const getInitialSelectedTab = () => {
    if (!loginDetails) {
      return location?.state?.isFooterLink ? 3 : 1;
    }
    return loginDetails.role === LOGIN_TYPE.CANDIDATE ? 1 : 3;
  };

  const [selectedTab, setSelectedTab] = useState(getInitialSelectedTab());
  const [company, setCompany] = useState('');
  const [companyId, setCompanyId] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [employderDetailLoading, setEmployerDetailLoading] = useState(false);
  const [employerDetail, setEmployerDetail] = useState(EMPTY_OBJECT);
  const [data, setData] = useState(EMPTY_ARRAY);
  const [summaryData, setSummaryData] = useState();
  const DropDownValues = getReviewSortType();
  const [selectedId, setSelectedId] = useState(DropDownValues[0]);
  const [reviewsDataLoading, setReviewsDataLoading] = useState(false);
  const [shouldReloadAfterReview, setShouldReloadAfterReview] = useState(false);
  const [totalReviewsCount, setTotalReviewsCount] = useState(0);
  const [companyNameAndId, setCompanyNameAndId] = useState(EMPTY_OBJECT);
  const [pageNoOfReviews, setPageNoOfReviews] = useState(DEFAULT_SELECTED_PAGE);

  // job tab

  const [selectedPage, setSelectedPage] = useState(DEFAULT_SELECTED_PAGE);
  const [isSummarySkeletonShow, setIsSummarySkeletonShow] = useState(false);
  const [jobs, setJobs] = useState(EMPTY_ARRAY);
  const [count, setCount] = useState(0);

  const [searchParams] = useSearchParams();
  const employerIdParam = searchParams.get('employerId');
  const companyIdParam = searchParams.get('companyId');
  const [companyAndEmpolyerIdParam, setcompanyAndEmpolyerIdParam] = useState({
    companyId: companyIdParam,
    employerId: employerIdParam,
  });

  const getJobEmployer = (id, page, sortBy) => {
    setIsSummarySkeletonShow(true);
    getPostedJob(id, page, sortBy)
      .then((res) => {
        setJobs(res.job);
        setCount(res.count);
      })
      .finally(() => {
        setIsSummarySkeletonShow(false);
      });
  };

  useEffect(() => {
    if (
      companyAndEmpolyerIdParam.employerId &&
      (loginDetails?.role === LOGIN_TYPE.CANDIDATE || !loginDetails)
    ) {
      getJobEmployer(
        companyAndEmpolyerIdParam.employerId,
        selectedPage,
        SORT_BY.RELEVANCE
      );
    }
  }, [companyAndEmpolyerIdParam]);

  useEffect(() => {
    setShowNavBar(true);
  }, EMPTY_ARRAY);

  useEffect(() => {
    if (employerDetail !== EMPTY_OBJECT) {
      setcompanyAndEmpolyerIdParam((prev) => ({
        ...prev,
        employerId: employerDetail?.id,
      }));
    } else {
      setCount(0);
      setJobs(EMPTY_ARRAY);
    }
  }, [employerDetail]);

  const getTheEmployerDeatilsAndTabs = (res) => {
    setCompanyNameAndId({
      id: res?.companyid,
      name: res?.name,
    });
    localStorage.setItem(
      STORAGE_KEY.LAST_REVIEW_SEARCH,
      JSON.stringify({
        id: res?.companyid,
        name: res?.name,
      })
    );

    if (res?.id) {
      if (loginDetails?.role === LOGIN_TYPE.CANDIDATE) {
        setTabs(getTabs());
      }
      if (loginDetails?.role === LOGIN_TYPE.EMPLOYER) {
        setTabs(getTabs(true));
        setSelectedTab(1);
      }
      setEmployerDetail(res);
    } else if (loginDetails?.role === LOGIN_TYPE.CANDIDATE) {
      setTabs(getTabs(false, true));
      setSelectedTab(3);
      setEmployerDetail(EMPTY_OBJECT);
      setCount(0);
    } else if (loginDetails?.role === LOGIN_TYPE.EMPLOYER) {
      setTabs(getTabs(false, true));
      setSelectedTab(3);
    }
  };

  const getEmployerDeatilsBasedOnEmployerAndCompany = () => {
    if (companyAndEmpolyerIdParam?.companyId) {
      setEmployerDetailLoading(true);
      getRequest(`employer/company/${companyAndEmpolyerIdParam?.companyId}`)
        .then((res) => {
          getTheEmployerDeatilsAndTabs(res);
        })
        .finally(() => setEmployerDetailLoading(false));
    }
    if (companyAndEmpolyerIdParam?.employerId) {
      getEmployerDetail(companyAndEmpolyerIdParam?.employerId)
        .then((res) => {
          getTheEmployerDeatilsAndTabs(res);
        })
        .finally(() => setEmployerDetailLoading(false));
    }
  };
  useEffect(() => {
    if (
      companyAndEmpolyerIdParam?.companyId ||
      companyAndEmpolyerIdParam?.employerId
    ) {
      getEmployerDeatilsBasedOnEmployerAndCompany();
    }
  }, [
    companyAndEmpolyerIdParam.companyId || companyAndEmpolyerIdParam.employerId,
  ]);

  const paginationRequestToServer = (page) => {
    getJobEmployer(
      companyAndEmpolyerIdParam?.employerId,
      page,
      SORT_BY.RELEVANCE
    );
    setSelectedPage(page);
  };

  const sortByRequestToServer = (sortBy) => {
    getJobEmployer(
      companyAndEmpolyerIdParam?.employerId,
      DEFAULT_SELECTED_PAGE,
      sortBy
    );
    setSelectedPage(DEFAULT_SELECTED_PAGE);
  };

  const getReviewsData = () => {
    if (companyNameAndId && companyNameAndId?.id) {
      getRequest(`review/${companyNameAndId?.id}/reviews`)
        .then((res) => {
          setData(res?.review);
        })
        .catch((err) => {
          dispatch(
            showSnackBar({
              setopen: true,
              message: err?.msg,
              severity: 'error',
            })
          );
          setData(EMPTY_ARRAY);
        })
        .finally(() => {
          setShouldReloadAfterReview(false);
        });
    }
  };

  const getReviewSummary = (value) => {
    if (value) {
      setLoading(true);
      getRequest(`review/${value}/ratings-summary`)
        .then((res) => {
          setSummaryData(res);
          setTotalReviewsCount(res?.totalReviews);
          getReviewsData();
        })
        .catch((err) => {
          dispatch(
            showSnackBar({
              setopen: true,
              message: err?.msg,
              severity: 'error',
            })
          );
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    if (shouldReloadAfterReview) {
      getReviewSummary(companyNameAndId?.id);
    }
  }, [shouldReloadAfterReview]);

  useEffect(() => {
    if (companyNameAndId !== EMPTY_OBJECT && companyNameAndId?.id !== -1) {
      getReviewSummary(companyNameAndId?.id);
    }
  }, [companyNameAndId]);

  const getReviwesBasedOnPaginationAndSortBy = (page) => {
    setReviewsDataLoading(true);
    getRequest(
      `review/${companyNameAndId?.id}/reviews?page=${page}&sortby=${selectedId?.id}`
    )
      .then((res) => {
        setData(res.review);
        setPageNoOfReviews(page);
      })
      .catch((err) => {
        dispatch(
          showSnackBar({
            setopen: true,
            message: err?.msg,
            severity: 'error',
          })
        );
      })
      .finally(() => {
        setReviewsDataLoading(false);
      });
  };

  const handleChange = (event, value) => {
    setSelectedTab(value);
  };

  const onClickOnSearch = () => {
    if (companyId && companyId !== -1) {
      getRequest(`employer/company/${companyId}`).then((res) => {
        setTotalReviewsCount(0);
        setCount(0);
        setSelectedTab(1);
        if (res?.id) {
          setEmployerDetail(res);
          setCompanyNameAndId({
            id: res?.companyid,
            name: res?.name,
          });
          localStorage.setItem(
            STORAGE_KEY.LAST_REVIEW_SEARCH,
            JSON.stringify({
              id: res?.companyid,
              name: res?.name,
            })
          );
          if (loginDetails?.role === LOGIN_TYPE.EMPLOYER) {
            setTabs(getTabs(true));
          }
          if (loginDetails?.role === LOGIN_TYPE.CANDIDATE) {
            setTabs(getTabs());
          }
        } else {
          setEmployerDetail(EMPTY_OBJECT);
          setCompanyNameAndId({
            id: companyId,
            name: company,
          });
          localStorage.setItem(
            STORAGE_KEY.LAST_REVIEW_SEARCH,
            JSON.stringify({
              id: companyId,
              name: company,
            })
          );
          if (loginDetails?.role === LOGIN_TYPE.CANDIDATE) {
            setTabs(getTabs(false, true));
            setSelectedTab(3);
          }
          if (loginDetails?.role === LOGIN_TYPE.EMPLOYER) {
            setTabs(getTabs(false, true));
            setSelectedTab(3);
          }
        }
      });
      window.history.replaceState(
        null,
        '',
        `/employer-details?companyId=${companyId}`
      );
      setSelectedId(DropDownValues[0]);
    }
  };

  return (
    <div className="container ">
      <div
        style={{
          marginBottom: 10,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'end',
        }}
      >
        <EmployerCompayReviewInputField
          company={company}
          setCompany={setCompany}
          companyId={companyId}
          onClickOnSearch={onClickOnSearch}
          setCompanyId={setCompanyId}
        />
      </div>
      <div className="card-border pb-5">
        <DynamicTitle
          title={`${companyNameAndId?.name} ${UI.PROFILE}`}
          description={`${companyNameAndId?.name} ${UI.EMPLOYER_DETAILS_DESCRIPTION}`}
        />
        <div className="d-flex justify-content-between align-items-center">
          <div className="px-3 mt-3">
            {employerDetail?.logo ? (
              <img
                src={`${API_URL.PHOTO_PRE}${employerDetail?.logo}`}
                alt={UI.ALT_EMPLOYER_LOGO}
                className="logo-detail-size logo"
              />
            ) : (
              <span className="justify-content-center d-flex logo-detail-size logo-text logo">
                {getPrefixAndUpperName(
                  employerDetail?.name || companyNameAndId?.name
                )}
              </span>
            )}
          </div>
        </div>
        <div className="headline-5-bold mt-2 px-3">
          {employerDetail?.name || companyNameAndId?.name}
        </div>
        <div className="subtitle-1 color-5B5B5B px-3">
          {employerDetail?.city?.shortname}
          {/* {employerDetail?.address} */}
        </div>

        <div className="mt-3 mb-3">
          <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <Tabs value={selectedTab} centered onChange={handleChange}>
              {tabs.map((val, index) => {
                if (val.shouldShow) {
                  return (
                    <Tab
                      key={index}
                      label={`${val.value} ${
                        val.id === 3
                          ? `(${totalReviewsCount || 0})`
                          : val.id === 2
                          ? `(${count})`
                          : ''
                      }`}
                      value={val.id}
                    />
                  );
                }
                return null;
              })}
            </Tabs>
          </Box>

          <hr />
        </div>
        {employderDetailLoading || reviewsDataLoading ? (
          <div className="d-flex justify-content-center">
            <CircularProgress size="2rem" />
          </div>
        ) : selectedTab === 1 ? (
          <EmployerProfile
            employerDetail={employerDetail}
            loading={employderDetailLoading}
          />
        ) : selectedTab === 2 ? (
          <EmployerJobs
            count={count}
            jobs={jobs}
            isSummarySkeletonShow={isSummarySkeletonShow}
            sortByRequestToServer={sortByRequestToServer}
            paginationRequestToServer={paginationRequestToServer}
            selectedPage={selectedPage}
          />
        ) : (
          <EmployerReview
            company={companyNameAndId}
            data={data}
            summaryData={summaryData}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            reviewsDataLoading={reviewsDataLoading}
            getReviwesBasedOnPaginationAndSortBy={
              getReviwesBasedOnPaginationAndSortBy
            }
            totalReviewsCount={totalReviewsCount}
            loading={loading}
            setShouldReloadAfterReview={setShouldReloadAfterReview}
            pageNoOfReviews={pageNoOfReviews}
          />
        )}
      </div>
    </div>
  );
}

Employer.propTypes = {
  setShowNavBar: PropTypes.func,
};

Employer.defaultProps = {
  setShowNavBar: noop,
};

export default Employer;
