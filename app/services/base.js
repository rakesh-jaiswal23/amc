"use client"
import axios from "axios";
import STATUS_CODE from "@/app/constants/statusCode";
import store from "../redux/store";
import { setShowLoginDialog } from "../redux/userSlice";
import STORAGE_KEY from "@/app/constants/storageKey";
import { showSnackBar } from "@/app/redux/snackBarSlice";

const cancelTokenSource = axios.CancelToken.source();
const axiosClient = axios.create({ cancelToken: cancelTokenSource.token });

// Intercept request
axiosClient.interceptors.request.use(
  (request) => {
    request.headers["Content-Type"] = "application/json";
    return request;
  },
  null,
  { synchronous: true }
);

// Intercept response
axiosClient.interceptors.response.use(
  (response) =>
    // Dispatch any action on success
    response?.data,
  (error) => {
    if (error.response?.status === STATUS_CODE.RATE_LIMITING) {
      store.dispatch(
        showSnackBar({
          setopen: true,
          message:
            error.response?.data?.msg ||
            "Too many requests, please try again later.",
          severity: "error",
        })
      );
    }
    if (error.response?.status === STATUS_CODE.AUTH401 && typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY.CANDIDATE_DETAILS);
      localStorage.removeItem(STORAGE_KEY.EMPLOYER_DETAILS);
      localStorage.removeItem(STORAGE_KEY.SESSION_DETAILS);
      localStorage.removeItem(STORAGE_KEY.PRICE_PLAN_DETAILS);

      store.dispatch(setShowLoginDialog());
    }
    return Promise.reject(error.response?.data);
  }
);

// http://ec2-3-109-108-73.ap-south-1.compute.amazonaws.com/api/v1/search/job

axiosClient.defaults.baseURL = "/api/v1";

axiosClient.defaults.headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

// All request will wait 1 min before timeout
axiosClient.defaults.timeout = 60000;

// axiosClient.defaults.withCredentials = true;

export default axiosClient;
