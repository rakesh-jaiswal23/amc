import { DEFAULT_CONTEXT_ID } from '../../constants';
import { getRequest, postRequest } from '../../services';

export const updateJobStateService = (stateId, job, isMyProfileActivity) => {
  let response;
  if (isMyProfileActivity) {
    response = postRequest(
      `/candidate/employer/${job.projectid}/action/${stateId}`
    );
  } else {
    response = getRequest(
      `/candidate/job/${job.id}/action/${stateId}?projectId=${job.projectid}`
    );
  }
  return response;
};

export const getJobDetail = (job, context = DEFAULT_CONTEXT_ID) =>
  getRequest(
    `/employer/job/${job.id}?context=${context}&projectId=${job.projectid}`
  );

export const getPostedJob = (employerId, page, sortby) =>
  getRequest(
    `/employer/published/job?employerId=${employerId}&page=${page}&sortby=${sortby}`
  );

export const getJobTimeline = (candidateId, projectId) =>
  getRequest(
    `/search/timeline?candidateId=${candidateId}&projectId=${projectId}`
  );
