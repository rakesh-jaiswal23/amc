"use client"
import { API_URL } from '../app/constants/apiUrls';
import { getRequest } from '../app/services';
import {
  getUserStart,
  getUserSuccess,
  getUserFailure,
  getTransactionHistoryFailure,
  getTransactionHistoryStart,
  getTransactionHistorySuccess,
  filterTransactionHistory,
  getNotificationCountStart,
  getNotificationCountSuccess,
  getNotificationCountFailure,
} from './userSlice';

export const getAvailablePointsUser = async (dispatch) => {
  dispatch(getUserStart());
  try {
    getRequest(API_URL.POINTS).then((response) => {
      dispatch(getUserSuccess(response));
    });
  } catch (err) {
    dispatch(getUserFailure());
  }
};

export const getNotificationCountUser = async (dispatch) => {
  dispatch(getNotificationCountStart());
  try {
    getRequest(API_URL.NOTIFICATION_COUNT).then((response) => {
      dispatch(getNotificationCountSuccess(response.count));
    });
  } catch (err) {
    dispatch(getNotificationCountFailure());
  }
};

export const getTransactionHistoryUser = async (dispatch) => {
  dispatch(getTransactionHistoryStart());
  try {
    getRequest(API_URL.HISTORY).then((response) => {
      dispatch(getTransactionHistorySuccess(response));
      dispatch(filterTransactionHistory(response));
    });
  } catch (err) {
    dispatch(getTransactionHistoryFailure());
  }
};

export const setTransactionHistoryUser = async (dispatch, original) => {
  dispatch(filterTransactionHistory(original));
};
