import { noop } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import StarIcon from '@mui/icons-material/Star';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { useDispatch } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import LinearProgress, {
  linearProgressClasses,
} from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import {
  Button,
  CircularProgress,
  // Input,
  // NativeSelect,
  Pagination,
  Rating,
} from '@mui/material';
import PropTypes from 'prop-types';
import useWindowSize from '../../../hooks/useWindowSize';
import {
  MOBILE_SCREEN_WIDTH,
  TABLET_SCREEN_WIDTH,
} from '../../../constants/screenSize';
import UI from '../../../constants/ui';
import './employerReview.module.css';
import { getRequest } from '../../../services';
import { showSnackBar } from '../../../../redux/snackBarSlice';
import { getJobType } from '../../../formatter/candidateBootstrap';
import { getAspectRatingNameByID } from '../../../formatter/commonBootstrap';
import getStarColor from './Employer.helper';
import EmployerReviewDetailsPopUp from './EmployerReviewDetailsPopUp';
import EmployerReviewSortBy from './EmployerReviewSort';
import {
  DEFAULT_RATING_VALUE,
  DEFAULT_SELECTED_PAGE,
  EMPTY_ARRAY,
  EMPTY_OBJECT,
} from '../../../constants';
import { getFormattedDate } from '../../../formatter/date';
import PaginationInfo from '../../payment/transactionHistory/PaginationInfo';
import EmployerReviewForm from './EmployerReviewForm';
import { getLoginDetailFromSession } from '../../../helpers/sessionDetails';
import { setShowLoginDialog } from '../../../../redux/userSlice';
import { getTheFormattedNumber } from '../../../formatter/number';
import LOGIN_TYPE from '../../../constants/loginType';

function EmployerReview(props) {
  const {
    company,
    data,
    selectedId,
    setSelectedId,
    reviewsDataLoading,
    summaryData,
    getReviwesBasedOnPaginationAndSortBy,
    totalReviewsCount,
    loading,
    setShouldReloadAfterReview,
    pageNoOfReviews,
  } = props;
  const { windowWidth } = useWindowSize();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showEmployerReviewForm, setShowEmployerReviewForm] = useState(false);
  const [selectedRating, setSelectedRating] = useState();
  const [votes, setVotes] = useState([]);
  const [loadingOfVote, setLoadingOfVote] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const loginDetails = getLoginDetailFromSession();
  const dispatch = useDispatch();
  const myRef = useRef();

  const sortedRatingArray = [...(summaryData?.counts ?? [])].reverse();

  useEffect(() => {
    if (data) {
      const updatedVotes = data.map((item) => ({
        id: item.id,
        upvotes: item.upvotes,
        isUpvote: loginDetails?.entityId
          ? item.upvotedCandidates.includes(loginDetails?.entityId)
          : false,
      }));
      setVotes(updatedVotes);
    }
  }, [data, loginDetails]);

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 7,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === 'light' ? 300 : 800],
    },
    '& .MuiLinearProgress-bar': {
      borderRadius: 5,
    },
    '& .MuiLinearProgress-barColorPrimary': {
      backgroundColor: theme.palette.mode === 'light' ? '#f3885b' : '#308fe8',
    },
    '&.rating-1 .MuiLinearProgress-barColorPrimary': {
      backgroundColor: '#ff4b2b',
    },
    '&.rating-2 .MuiLinearProgress-barColorPrimary': {
      backgroundColor: '#ff9a05',
    },
    '&.rating-3 .MuiLinearProgress-barColorPrimary': {
      backgroundColor: '#cdd614',
    },
    '&.rating-4 .MuiLinearProgress-barColorPrimary': {
      backgroundColor: '#5ba829',
    },
    '&.rating-5 .MuiLinearProgress-barColorPrimary': {
      backgroundColor: '#377e01',
    },
  }));

  const pagination = (page) => {
    getReviwesBasedOnPaginationAndSortBy(page);
  };

  const onClickWriteReview = () => {
    if (loginDetails) {
      setShowEmployerReviewForm(true);
    } else {
      dispatch(setShowLoginDialog());
    }
  };

  const onClose = () => {
    setShowEmployerReviewForm(false);
  };

  const onClickVote = (id, upvotes) => {
    setLoadingOfVote(true);
    getRequest(`/review/upvote/${id}`)
      .then((res) => {
        dispatch(
          showSnackBar({
            setopen: true,
            message: res?.msg,
            severity: 'success',
          })
        );
        setLoadingOfVote(false);
        const updatedVotes = votes.map((vote) => {
          if (vote.id === id) {
            return {
              id,
              upvotes: res ? upvotes + 1 : upvotes - 1,
              isUpvote: res,
            };
          }
          return vote;
        });
        setVotes(updatedVotes);
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
        setLoadingOfVote(false);
      });
  };

  const onSelectedDropDown = () => {
    getReviwesBasedOnPaginationAndSortBy(DEFAULT_SELECTED_PAGE);
  };

  return (
    <div>
      {loading ? (
        <div className="d-flex justify-content-center">
          <CircularProgress size="2rem" />
        </div>
      ) : (
        <div className="container" style={{ position: 'relative' }}>
          {summaryData?.totalReviews > 0 ? (
            <>
              <div
                className={`d-flex ${
                  windowWidth < 530 ? 'flex-column' : 'flex'
                } justify-content-between mb-2`}
              >
                <div>
                  <span className="my-2 ps-1 ">
                    {company?.name} based on{' '}
                    {getTheFormattedNumber(summaryData?.totalReviews)}{' '}
                    {UI.REVIEWS_FOUND}
                  </span>
                </div>
                {(!loginDetails ||
                  loginDetails?.role === LOGIN_TYPE.CANDIDATE) && (
                  <Button
                    startIcon={<AddIcon fontSize="11px" />}
                    style={{
                      padding: '5px 10px',
                      borderRadius: 16,
                    }}
                    variant="contained"
                    onClick={() => onClickWriteReview()}
                  >
                    {UI.WRITE_REVIEW}
                  </Button>
                )}
              </div>
              <div>
                <div
                  className=" px-4 py-3"
                  style={{
                    boxShadow: '0px 2px 6px -2px rgba(0, 106, 194, 0.2)',
                    border: '1px solid #ebf0f6',
                    borderRadius: 3,
                  }}
                >
                  <div
                    className={`d-flex ${
                      windowWidth < TABLET_SCREEN_WIDTH
                        ? 'flex-column'
                        : 'flex-row'
                    } justify-content-between align-items-start `}
                  >
                    <div className="d-flex flex-column ">
                      <span className="headline-6-bold ms-1">
                        {UI.OVERALL_RATING}
                      </span>
                      <Rating
                        name="custom-rating"
                        value={summaryData?.ratingAverage}
                        precision={0.5}
                        readOnly
                        sx={{
                          color: getStarColor(summaryData?.ratingAverage),
                        }}
                      />
                      <span
                        style={{ paddingLeft: 4 }}
                      >{`${summaryData?.ratingAverage} out of ${DEFAULT_RATING_VALUE}`}</span>
                    </div>
                    <div>
                      {sortedRatingArray?.map((eachItem, index) => (
                        <div
                          className="d-flex align-items-center"
                          style={{
                            marginBottom: 6,
                            marginTop:
                              windowWidth < TABLET_SCREEN_WIDTH - 33 ? 10 : 0,
                            width: 300,
                          }}
                          key={index}
                        >
                          <span style={{ marginLeft: index === 4 ? 2 : 0 }}>
                            {summaryData.counts.length - index}
                          </span>
                          <StarIcon
                            fontSize="8px"
                            sx={{
                              color: getStarColor(
                                summaryData.counts.length - index
                              ),
                              marginLeft: 1,
                            }}
                          />
                          <div
                            style={{
                              width: windowWidth < 530 ? '50%' : '100%',
                            }}
                          >
                            <BorderLinearProgress
                              variant="determinate"
                              value={
                                eachItem > 0
                                  ? (100 * eachItem) / summaryData.totalReviews
                                  : 0
                              }
                              className={`rating-${
                                sortedRatingArray.length - index
                              }`}
                              style={{
                                width: '100%',
                                marginLeft: 5,
                                height: 25,
                              }}
                            />
                          </div>
                          <div className="ms-1" style={{ width: '10%' }}>
                            <span className="mx-2">{`${eachItem}`}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div
                      style={
                        windowWidth < TABLET_SCREEN_WIDTH
                          ? null
                          : {
                              borderLeft: '2px solid #ebf0f6',
                              width: 10,
                              height: '150px',
                            }
                      }
                    />

                    <div
                      style={{
                        width:
                          windowWidth < TABLET_SCREEN_WIDTH ? '100%' : '53%',
                      }}
                    >
                      <div
                        style={{
                          marginTop:
                            windowWidth < TABLET_SCREEN_WIDTH - 33 ? 10 : 0,
                        }}
                      >
                        {summaryData?.categoryRatings?.length > 0 && (
                          <>
                            <div className="mb-2">
                              <span className="headline-6-bold">
                                {UI.CATERGORY_RATINGS}
                              </span>
                            </div>
                            <div
                              style={{
                                display: 'grid',
                                gridTemplateColumns:
                                  windowWidth < MOBILE_SCREEN_WIDTH
                                    ? 'auto'
                                    : 'auto auto',
                                gridColumnGap: 20,
                                gridRowGap: 8,
                              }}
                            >
                              {summaryData?.categoryRatings?.map(
                                (eachItem, index) => (
                                  <div
                                    className="d-flex align-items-center"
                                    key={index}
                                  >
                                    <StarIcon
                                      fontSize="8px"
                                      sx={{
                                        color: getStarColor(eachItem.rating),
                                      }}
                                      style={{ marginRight: '4px' }}
                                    />
                                    <div
                                      style={{ marginRight: 10, width: '7%' }}
                                    >
                                      {eachItem.rating}
                                    </div>
                                    <div className="text-xs font-semibold">
                                      {getAspectRatingNameByID(eachItem.id)}
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div
                  style={{
                    position: 'relative',
                    zIndex: 1000,
                  }}
                >
                  <div
                    className={`d-flex ${
                      windowWidth < 530
                        ? 'flex-column'
                        : 'flex-row align-items-center'
                    } justify-content-between  px-1 py-3 mb-1 sticky-top border-bottom`}
                    style={{
                      top: -1,
                      backgroundColor: 'white',
                    }}
                  >
                    <div>
                      <PaginationInfo
                        totalCount={totalReviewsCount}
                        selectedPage={pageNoOfReviews}
                        currentPageCount={data?.length}
                      />
                    </div>
                    <div style={{ position: 'relative' }}>
                      <EmployerReviewSortBy
                        selectedId={selectedId}
                        setSelectedId={setSelectedId}
                        onSelectedDropDown={onSelectedDropDown}
                      />
                    </div>
                  </div>
                  {reviewsDataLoading ? (
                    <div className="card-border px-4 py-4 d-flex justify-content-center h-100">
                      <CircularProgress size="2rem" />
                    </div>
                  ) : (
                    <div>
                      {data?.map((eachItem) => (
                        <div
                          className="card-border px-4 py-4 my-2"
                          style={{
                            border: '1px solid #ebf0f6',
                            position: 'relative',
                            width: '100%',
                          }}
                          ref={myRef}
                          key={eachItem.id}
                        >
                          <div>
                            <span
                              className="headline-5 color-000000"
                              style={{ fontWeight: 600 }}
                            >
                              {eachItem.title}
                            </span>
                            <div className="my-1">
                              <span
                                style={{
                                  backgroundColor: 'lightgray',
                                  padding: '4px',
                                  borderRadius: 3,
                                }}
                                className="subtitle-1"
                              >
                                {getJobType(eachItem.jobType)}
                              </span>
                              <span className="mx-1">.</span>
                              <span className="subtitle-1">
                                {eachItem?.department}
                              </span>
                            </div>
                            <div
                              className="d-flex align-items-start"
                              style={{ marginTop: 8, marginBottom: 8 }}
                            >
                              <div>
                                <Rating
                                  name="custom-rating"
                                  value={eachItem.rating / 100}
                                  precision={0.5}
                                  readOnly
                                  sx={{
                                    color: getStarColor(eachItem.rating / 100),
                                  }}
                                />
                              </div>

                              <div>
                                <span
                                  className="mx-1"
                                  onMouseEnter={(event) => {
                                    setSelectedCategories(
                                      eachItem?.aspectRatings
                                    );
                                    setSelectedRating(eachItem.rating);
                                    setAnchorEl(event.target);
                                  }}
                                  id={`${eachItem.id}`}
                                  onMouseLeave={() => {
                                    setAnchorEl(null);
                                  }}
                                >
                                  <KeyboardArrowDownIcon fontSize="14px" />
                                </span>
                                <span className="subtitle-2  color-5B5B5B">
                                  posted on{' '}
                                  {getFormattedDate(eachItem?.createdDate)}
                                </span>
                                <EmployerReviewDetailsPopUp
                                  anchorEl={anchorEl}
                                  categoryRatings={selectedCategories}
                                  setAnchorEl={setAnchorEl}
                                  selectedRating={selectedRating}
                                />
                              </div>
                            </div>
                          </div>
                          {eachItem.likes && (
                            <div className="d-flex flex-column">
                              <span className="headline-5-bold color-000000 mt-2">
                                {UI.LIKES}
                              </span>
                              <span className="subtitle-1 color-5B5B5B mt-1">
                                {eachItem.likes}
                              </span>
                            </div>
                          )}
                          {eachItem.dislikes && (
                            <div className="d-flex flex-column my-2">
                              <span className="headline-5-bold color-000000">
                                {UI.DISLIKES}
                              </span>
                              <span className="subtitle-1 color-5B5B5B mt-1 ">
                                {eachItem.dislikes}
                              </span>
                            </div>
                          )}

                          {(!loginDetails ||
                            loginDetails?.role === LOGIN_TYPE.CANDIDATE) &&
                            votes.map((item) => {
                              if (item.id === eachItem.id) {
                                return (
                                  <div className="my-2" key={item.id}>
                                    <Button
                                      variant="outlined"
                                      style={{
                                        borderRadius: 15,
                                        padding: '3px 13px',
                                        borderColor: 'lightgray',
                                      }}
                                      disabled={loadingOfVote}
                                      onClick={() => {
                                        if (!loadingOfVote) {
                                          onClickVote(item.id, item.upvotes);
                                        }
                                      }}
                                    >
                                      <div className="ms-1 d-flex align-items-center">
                                        <ThumbUpIcon
                                          fontSize="small"
                                          sx={{
                                            color: item.isUpvote
                                              ? '#faaf00'
                                              : 'lightgray',
                                          }}
                                        />
                                        <span
                                          className="ms-1"
                                          style={{
                                            color: 'black',
                                            marginTop: '2px',
                                          }}
                                        >
                                          {item.upvotes > 0 && item.upvotes}{' '}
                                          {UI.USEFUL}
                                        </span>
                                      </div>
                                    </Button>
                                  </div>
                                );
                              }
                              return null;
                            })}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <Pagination
                count={Math.ceil(totalReviewsCount / 10)}
                className="justify-content-center d-flex py-2"
                showFirstButton
                showLastButton
                onChange={(_, page) => {
                  pagination(page);
                }}
                page={pageNoOfReviews}
              />
            </>
          ) : (
            <div className="d-flex flex-column align-items-center">
              {!loginDetails || loginDetails?.role === LOGIN_TYPE.CANDIDATE ? (
                <>
                  <div className="my-1">
                    <span className="headline-6-bold px-2">
                      {UI.NO_REVIEWS_FOUND_TEXT.replace('%s', company?.name)}
                    </span>
                  </div>
                  <div className="my-3">
                    <Button
                      startIcon={<AddIcon fontSize="11px" />}
                      style={{
                        padding: '5px 10px',
                        borderRadius: 16,
                      }}
                      variant="contained"
                      onClick={() => onClickWriteReview()}
                    >
                      {UI.WRITE_REVIEW}
                    </Button>
                  </div>
                </>
              ) : (
                <div className="headline-6-bold px-2">
                  {UI.NO_REVIEWS_FOUND}
                </div>
              )}
            </div>
          )}
        </div>
      )}
      {showEmployerReviewForm && (
        <EmployerReviewForm
          isOpen={showEmployerReviewForm}
          onClose={onClose}
          companyAndJobTitle={company}
          companyId={company?.id}
          setShouldReloadAfterReview={setShouldReloadAfterReview}
        />
      )}
    </div>
  );
}

EmployerReview.propTypes = {
  company: PropTypes.object,
  data: PropTypes.array,
  selectedId: PropTypes.object,
  setSelectedId: PropTypes.func,
  reviewsDataLoading: PropTypes.bool,
  summaryData: PropTypes.object,
  getReviwesBasedOnPaginationAndSortBy: PropTypes.func,
  totalReviewsCount: PropTypes.number,
  loading: PropTypes.bool,
  setShouldReloadAfterReview: PropTypes.func,
  pageNoOfReviews: PropTypes.number,
};

EmployerReview.defaultProps = {
  company: EMPTY_OBJECT,
  data: EMPTY_ARRAY,
  selectedId: EMPTY_OBJECT,
  setSelectedId: noop,
  reviewsDataLoading: false,
  summaryData: EMPTY_OBJECT,
  getReviwesBasedOnPaginationAndSortBy: noop,
  totalReviewsCount: 0,
  loading: false,
  setShouldReloadAfterReview: noop,
  pageNoOfReviews: DEFAULT_SELECTED_PAGE,
};

export default EmployerReview;
