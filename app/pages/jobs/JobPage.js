import React, { useEffect, useState } from "react";
import { Link, NavLink, useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { noop } from "lodash";
import UI from "../../constants/ui";

import JobDetail from "./jobDetail/index";
import JobSummary from "./jobSummary";

import { getJobDetail, updateJobStateService } from "./jobs.service";
import { showSnackBar } from "../../../redux/snackBarSlice";
import CANDIDATE_JOB_STATES from "../../constants/candidateJobStates";
import JOB_STATE from "../../constants/jobState";
import URL from "../../constants/urls";
import { API_URL } from "../../constants/apiUrls";
import { postRequest } from "../../services";
import RATING from "../../constants/rating";

import { DEFAULT_SELECTED_PAGE } from "../../constants";
import SORT_BY from "../../constants/sortBy";
import getSearchPayloadInStr from "../../helpers/getSearchPayloadInStr";
import { getRating } from "../../formatter/commonBootstrap";
import STATUS_CODE from "../../constants/statusCode";
import { getDateInYYMMDD } from "../../formatter/date";
import { getStructuredata } from "../../formatter/employerBootstrap";
import {
  EDUCATION_TYPE,
  EMPLOYMENT_TYPE,
  EXPERIENCE_TYPE,
  EXPERIENCE_TYPE_TO_SINGLE_COUNT,
  GOOGLE_JOB_ID,
  WORK_TYPE,
} from "../../constants/jobType";
import LOGIN_TYPE from "../../constants/loginType";
import PostedJobDetails from "../postedJobs/postedJobDetails";
import useMobileDevice from "../../hooks/useMobileDevice";
import { useRouter } from "next/navigation";

function JobPage(props) {
  const { role } = props;
  const [jobDetail, setJobDetail] = useState();

  const [keywords, setKeywords] = useState();
  const [searchLocation, setSearchLocation] = useState();
  const [similarJobslist, setSimilarJobslist] = useState([]);

  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const router = useRouter();
  const structureData = getStructuredata();
  const [searchParams] = useSearchParams();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [savedDlgOpen, setSavedDlgOpen] = useState(false);
  const [dailogAction, setDailogAction] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const [searchDetails, setSearchDetails] = useState({ search: {} });
  const [showSimilarJobs, setShowSimilarJobs] = useState(false);
  const [firstTimeShowSimilarJobs, setFirstTimeShowSimilarJobs] =
    useState(false);
  const isMobileDevice = useMobileDevice();
  const handleViewMoreClick = () => {
    const navigateTO = URL.FIND_JOBS_SEARCHES;
    const searchQuery = `?search=${getSearchPayloadInStr(
      keywords,
      searchLocation
    )}`;

    window.open(
      `${navigateTO}${searchQuery}&page=${DEFAULT_SELECTED_PAGE}&sort=${SORT_BY.RELEVANCE}`,
      "_blank"
    );
  };

  const getEmploymentType = (value) => {
    if (value === EMPLOYMENT_TYPE.FULL_TIME) {
      return UI.FULL_TIME;
    }
    if (value === EMPLOYMENT_TYPE.PART_TIME) {
      return UI.PART_TIME;
    }
    if (value === EMPLOYMENT_TYPE.CONTRACTOR) {
      return UI.CONTRACTOR;
    }
    if (value === EMPLOYMENT_TYPE.TEMPORARY) {
      return UI.TEMPORARY;
    }
    if (value === EMPLOYMENT_TYPE.INTERN) {
      return UI.INTERN;
    }
    return UI.ANY_STRUCTURED;
  };

  const getEducationType = (value) => {
    if (value === EDUCATION_TYPE.DIPLOMA) {
      return UI.EDUCATION_TYPE.ASSOCIATE_DEGREE;
    }
    if (value === EDUCATION_TYPE.BACHELORS) {
      return UI.EDUCATION_TYPE.BACHELOR_DEGREE;
    }
    if (value === EDUCATION_TYPE.MASTERS) {
      return UI.EDUCATION_TYPE.POST_GRADUATE_DEGREE;
    }
    if (value === EDUCATION_TYPE.DOCTORATE) {
      return UI.EDUCATION_TYPE.POST_GRADUATE_DEGREE;
    }
    return UI.EDUCATION_TYPE.BACHELOR_DEGREE;
  };

  const getExperienceType = (value) => {
    if (value === EXPERIENCE_TYPE.STUDENT) {
      return EXPERIENCE_TYPE_TO_SINGLE_COUNT.STUDENT;
    }
    if (value === EXPERIENCE_TYPE.FRESHER) {
      return EXPERIENCE_TYPE_TO_SINGLE_COUNT.FRESHER;
    }
    if (value === EXPERIENCE_TYPE.ZERO_TO_ONE) {
      return EXPERIENCE_TYPE_TO_SINGLE_COUNT.ZERO_TO_ONE;
    }
    if (value === EXPERIENCE_TYPE.ONE_TO_THREE) {
      return EXPERIENCE_TYPE_TO_SINGLE_COUNT.ONE_TO_THREE;
    }
    if (value === EXPERIENCE_TYPE.THREE_TO_FIVE) {
      return EXPERIENCE_TYPE_TO_SINGLE_COUNT.THREE_TO_FIVE;
    }
    if (value === EXPERIENCE_TYPE.FIVE_TO_TEN) {
      return EXPERIENCE_TYPE_TO_SINGLE_COUNT.FIVE_TO_TEN;
    }
    if (value === EXPERIENCE_TYPE.TEN_TO_FIFTEEN) {
      return EXPERIENCE_TYPE_TO_SINGLE_COUNT.TEN_TO_FIFTEEN;
    }
    if (value === EXPERIENCE_TYPE.FIFTEEN_TO_TWENTY) {
      return EXPERIENCE_TYPE_TO_SINGLE_COUNT.FIFTEEN_TO_TWENTY;
    }
    if (value === EXPERIENCE_TYPE.TWENTY_PLUS) {
      return EXPERIENCE_TYPE_TO_SINGLE_COUNT.TWENTY_PLUS;
    }
    return EXPERIENCE_TYPE_TO_SINGLE_COUNT.ONE_TO_THREE;
  };

  useEffect(() => {
    getJobDetail(
      {
        id: searchParams.get("jobId"),
        projectid: searchParams.get("projectId"),
      },
      CANDIDATE_JOB_STATES.APPLIED
    )
      .then((res) => {
        setJobDetail(res);
        if (res?.allPartners || res?.partnerids?.includes(GOOGLE_JOB_ID)) {
          const inputURL = window.location.href;
          const baseURL = inputURL.split("/").slice(0, 3).join("/");
          const existingScript = document.querySelector(
            'script[type="application/ld+json"]'
          );
          if (existingScript) {
            document.head.removeChild(existingScript);
          }
          const script = document.createElement("script");
          script.setAttribute("type", "application/ld+json");
          const updatedStructureData = {
            ...structureData,
            baseSalary: {
              ...structureData.baseSalary,
              currency: "INR",
              value: {
                ...structureData.baseSalary.value,
                maxValue: res?.salary?.max,
                minValue: res?.salary?.min,
              },
            },
            datePosted: getDateInYYMMDD(res?.currentState?.date),
            description: res.description,
            employmentType: getEmploymentType(res?.jobtype),
            hiringOrganization: {
              ...structureData.hiringOrganization,
              logo: res?.logo,
              name: res?.employer,
              sameAs: `${baseURL}${URL.EMPLOYER_META}${res?.employerid}`,
            },
            educationRequirements: {
              ...structureData.educationRequirements,
              credentialCategory: getEducationType(res?.education),
            },
            experienceRequirements: {
              ...structureData.experienceRequirements,
              monthsOfExperience: getExperienceType(res?.exp),
            },
            jobLocation: [],
            title: res?.title,
            identifier: {
              ...structureData.identifier,
              name: res?.employer,
              value: res?.id,
            },
            validThrough: getDateInYYMMDD(res?.jobexpires),
          };
          if (res.salary.id === -1) {
            delete updatedStructureData.baseSalary;
          }
          if (!res.jobexpires) {
            delete updatedStructureData.validThrough;
          }
          if (!res.logo) {
            delete updatedStructureData.hiringOrganization.logo;
          }
          if (res?.joblocations?.length > 0) {
            const additionalLocations = res?.joblocations?.map((location) => ({
              "@type": "Place",
              address: {
                streetAddress: location.name,
                addressLocality: location.shortname,
                postalCode: "NA",
                addressRegion: location.state,
                addressCountry: "India",
              },
            }));
            updatedStructureData.jobLocation = additionalLocations;
          } else {
            const additionalLocations = structureData.jobLocation;
            updatedStructureData.jobLocation = [additionalLocations];
          }
          if (res?.worklocation === WORK_TYPE.IN_OFFICE) {
            delete updatedStructureData.jobLocationType;
            delete updatedStructureData.applicantLocationRequirements;
          }
          if (res?.worklocation === WORK_TYPE.FULL_REMOTE) {
            delete updatedStructureData.jobLocation;
          }
          script.textContent = JSON.stringify(updatedStructureData);

          document.head.appendChild(script);
        }
      })
      .catch((err) => {
        dispatch(
          showSnackBar({
            setopen: true,
            message: err?.msg,
            severity: "error",
          })
        );
      });
  }, [searchParams, dispatch, structureData]);
  useEffect(() => {
    if (jobDetail) {
      const skills = JSON.parse(JSON.stringify(jobDetail.skills));

      const newSkills = [...skills];
      skills?.forEach((skill, index) => {
        switch (skill?.rating) {
          case RATING.BEGINNER: {
            newSkills[index].rating = RATING.INTERMEDIATE;

            break;
          }
          case RATING.INTERMEDIATE: {
            newSkills[index].rating = RATING.PROFICIENT;

            break;
          }
          case RATING.PROFICIENT: {
            newSkills[index].rating = RATING.EXPERT;

            break;
          }
          default:
            break;
        }
      });

      if (!isMobileDevice || firstTimeShowSimilarJobs) {
        if (role === LOGIN_TYPE.CANDIDATE || role === undefined) {
          const updateSearchDetails = { ...searchDetails };
          updateSearchDetails.search.skill = skills;

          setSearchLocation(jobDetail?.joblocations);
          const makeKeywords = skills?.map((skill) => ({
            skill: skill.name,
            rating: skill.rating,
            displayName: `${skill.name} - ${getRating(skill?.rating)}`,
          }));
          setKeywords(makeKeywords);
          if (jobDetail?.joblocations)
            updateSearchDetails.search.location = jobDetail?.joblocations;
          setSearchDetails(updateSearchDetails);
          postRequest(API_URL.SEARCH_JOB, searchDetails)
            .then((response) => {
              setSimilarJobslist(
                response?.job?.filter(
                  (details) => details?.id !== jobDetail?.id
                )
              );
            })
            .catch((err) => {
              dispatch(
                showSnackBar({
                  setopen: true,
                  message: err?.msg,
                  severity: "error",
                })
              );
            });
        }
      }
    }
  }, [jobDetail, firstTimeShowSimilarJobs, isMobileDevice, role, searchDetails, dispatch]);

  const jobAction = (actionId) => {
    updateJobStateService(actionId, jobDetail, false)
      .then((res) => {
        dispatch(
          showSnackBar({
            setopen: true,
            message: res?.msg,
            severity: "info",
          })
        );

        getJobDetail(
          { id: jobDetail.id, projectid: jobDetail.projectid },
          CANDIDATE_JOB_STATES.APPLIED
        )
          .then((resJobDetail) => {
            setJobDetail(resJobDetail);
            dispatch(
              showSnackBar({
                setopen: true,
                message: res?.msg,
                severity: "info",
              })
            );
          })
          .catch((error) => {
            dispatch(
              showSnackBar({
                setopen: true,
                message: error?.msg,
                severity: "error",
              })
            );
          });
      })
      .catch((err) => {
        if (
          actionId === CANDIDATE_JOB_STATES.APPLIED &&
          err.code === STATUS_CODE.PREREQUISITE_FAILED_SAVE
        ) {
          setDialogOpen(true);
          setDailogAction(CANDIDATE_JOB_STATES.SHORTLISTED);
          setErrorMessage(err.msg);
        } else if (
          actionId === CANDIDATE_JOB_STATES.APPLIED &&
          err.code === STATUS_CODE.PREREQUISITE_FAILED
        ) {
          setSavedDlgOpen(true);
          setErrorMessage(err.msg);
        } else {
          dispatch(
            showSnackBar({
              setopen: true,
              message: err?.msg,
              severity: "error",
            })
          );
        }
      });
  };

  const onAction = (action) => {
    jobAction(action.id);
  };

  const onEditAction = (action) => {
    if (action.id === JOB_STATE.EDIT) {
      const POST_JOB_URL = `${URL.POST_JOB}?jobId=${jobDetail.id}&action=${action.action}`;
      router.push(POST_JOB_URL);
    }
  };

  const onShowSimilarJobs = () => {
    if (!firstTimeShowSimilarJobs) {
      setShowSimilarJobs(!showSimilarJobs);
      setFirstTimeShowSimilarJobs(true);
    } else {
      setShowSimilarJobs(!showSimilarJobs);
    }
  };
  return (
    <div className="container">
      <div className="row">
        <div
          className={`card-border flex-item ${
            similarJobslist?.length ? "col-md-7" : "col-md-12"
          }`}
        >
          {!!jobDetail &&
            (role === LOGIN_TYPE.CANDIDATE || role === undefined ? (
              <JobDetail
                detail={jobDetail}
                isMyProfileActivity={false}
                jobPage
                onAction={onAction}
              />
            ) : (
              <PostedJobDetails
                detail={jobDetail}
                onAction={onEditAction}
                jobPage
              />
            ))}
        </div>
        {(!isMobileDevice && similarJobslist?.length) ||
        (isMobileDevice && showSimilarJobs) ? (
          <div className="flex-item col-md-5">
            {!isMobileDevice ? (
              <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                {UI.SIMILAR_JOBS}
              </div>
            ) : (
              <div style={{ display: "flex", gap: 2 }}>
                <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                  {UI.SIMILAR_JOBS}{" "}
                </div>
                <span onClick={onShowSimilarJobs}>
                  <ArrowDropDownIcon fontSize="large" sx={{ marginTop: 0.5 }} />
                </span>
              </div>
            )}
            {similarJobslist.map((details) => {
              if (details.id !== jobDetail?.id) {
                return (
                  <div
                    className="px-3 pt-3 pb-2 text-black bg-white border mb-3 rounded-3 cursorPointer mt-1"
                    key={details.id}
                  >
                    <Link
                      style={{ textDecoration: "none", color: "black" }}
                      as={NavLink}
                      to={`${URL.JOB_META}${details?.id}`}
                      target="_blank"
                    >
                      <JobSummary
                        item={details}
                        setSelectedId={noop}
                        shouldShowMenu={false}
                      />
                    </Link>
                  </div>
                );
              }
              return null;
            })}
            {similarJobslist?.length ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "auto",
                }}
              >
                <Button
                  variant="contained"
                  type="button"
                  onClick={handleViewMoreClick}
                >
                  {UI.VIEW_MORE}
                </Button>
              </div>
            ) : (
              <div
                style={{
                  width: "max-content",
                  marginInline: "auto",
                  fontSize: 20,
                  color: "gray",
                }}
              >
                {UI.NO_SIMILAR_JOBS}
              </div>
            )}
          </div>
        ) : isMobileDevice ? (
          <div style={{ display: "flex", gap: 2 }}>
            <div style={{ marginTop: "10px", marginBottom: "10px" }}>
              {UI.SIMILAR_JOBS}{" "}
            </div>
            <span onClick={onShowSimilarJobs}>
              <ArrowDropDownIcon fontSize="large" sx={{ marginTop: 0.5 }} />
            </span>
          </div>
        ) : null}
        <Dialog
          open={dialogOpen || savedDlgOpen}
          onClose={() =>
            dialogOpen ? setDialogOpen(false) : setSavedDlgOpen(false)
          }
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {UI.JOB_PRE_REQUISITES}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <span>{errorMessage}</span>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              onClick={() =>
                dialogOpen ? setDialogOpen(false) : setSavedDlgOpen(false)
              }
            >
              {UI.CLOSE}
            </Button>
            {dialogOpen && (
              <Button
                type="submit"
                variant="contained"
                size="large"
                onClick={() => {
                  setDialogOpen(false);
                  jobAction(dailogAction);
                }}
              >
                {UI.SAVE_AND_CLOSE}
              </Button>
            )}
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
JobPage.propTypes = {
  role: PropTypes.number,
};
JobPage.defaultProps = {
  role: undefined,
};
export default JobPage;
