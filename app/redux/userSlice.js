import { createSlice } from '@reduxjs/toolkit';
import { EMPTY_OBJECT } from '@/app/constants';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: {
      availablePoints: {
        freepoints: {
          point: 0,
        },
        purchasedpoints: {
          point: 0,
        },
      },
      transactionHistory: [],
      fixedTransactionHistory: [],
      notificationsCount: 0,
    },
    pending: null,
    error: false,
    role: '',
    areRequestsComplete: false,
    reRenderPermissionsCode: 0,
    showLoginDialog: false,
    username: '',
    password: '',
    buttonActionWhilePayment: 0,
    assessmentList: [],
    aiPreRequisitesAssessments: [],
    configureData: '',
    isConfigured: false,
    configPayLoad: '',
    shouldSpotOnMockInterviewPage: false,
    blobFile: EMPTY_OBJECT,
    context: 1,
    loggedInUserRole: undefined,
    shouldShowAlert: false,
    relevantToCareerPath: false,
    faceCoordinates:{},
  },

  reducers: {
    setRelevantToCareerPath: (state, action) => {
      state.relevantToCareerPath = action.payload;
    },
    setFaceCoordinates: (state, action) => {      
      state.faceCoordinates = action.payload;
    },
    setBlobFile: (state, action) => {
      state.blobFile = action.payload;
    },
    setLoggedInUserRole: (state, action) => {
      state.loggedInUserRole = action.payload;
    },
    setContext: (state, action) => {
      state.context = action.payload;
    },
    setshouldShowAlert: (state, action) => {
      state.shouldShowAlert = action.payload;
    },
    setConfigPayload: (state, action) => {
      state.configPayLoad = action.payload;
    },
    setConfigureData: (state, action) => {
      state.configureData = action.payload;
    },
    setIsConfigured: (state, action) => {
      state.isConfigured = action.payload;
    },
    setAIPreRequisitesAssessments: (state, action) => {
      state.aiPreRequisitesAssessments = action.payload;
    },
    setAssessmentList: (state, action) => {
      state.assessmentList = action.payload;
    },
    getUserStart: (state) => {
      state.pending = true;
    },
    setShowLoginDialog: (state) => {
      state.showLoginDialog = true;
    },
    setButtonActionWhilePayment: (state, action) => {
      state.buttonActionWhilePayment = action.payload;
    },

    setUserRole: (state, action) => {
      state.role = action.payload;
    },

    setHideLoginDialog: (state) => {
      state.showLoginDialog = false;
    },
    setUserName: (state, action) => {
      state.username = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    getUserSuccess: (state, action) => {
      state.pending = false;
      state.userInfo.availablePoints = action.payload;
    },
    setAvailablePointsZero: (state) => {
      state.userInfo.availablePoints = 0;
    },
    getUserFailure: (state) => {
      state.pending = false;
      state.error = true;
    },
    getNotificationCountStart: (state) => {
      state.pending = true;
    },
    getNotificationCountSuccess: (state, action) => {
      state.pending = false;
      state.userInfo.notificationsCount = action.payload;
    },
    getNotificationCountFailure: (state) => {
      state.pending = false;
      state.error = true;
    },
    getTransactionHistoryStart: (state) => {
      state.pending = true;
    },
    setNotificationCountToZero: (state) => {
      state.userInfo.notificationsCount = 0;
    },
    setRequestsComplete: (state) => {
      state.areRequestsComplete = true;
    },
    setRequestsInComplete: (state) => {
      state.areRequestsComplete = false;
    },
    setRerenderpermissions: (state) => {
      state.reRenderPermissionsCode += 1;
    },
    getTransactionHistorySuccess: (state, action) => {
      state.pending = false;
      state.userInfo.fixedTransactionHistory = action.payload;
    },
    filterTransactionHistory: (state, action) => {
      state.userInfo.transactionHistory = action.payload;
    },
    getTransactionHistoryFailure: (state) => {
      state.pending = false;
      state.error = true;
    },
  },
});

export const {
  setRelevantToCareerPath,
  setBlobFile,
  setLoggedInUserRole,
  setContext,
  setshouldShowAlert,
  setConfigPayload,
  setIsConfigured,
  setConfigureData,
  setAIPreRequisitesAssessments,
  setAssessmentList,
  getUserFailure,
  getUserStart,
  getUserSuccess,
  getNotificationCountStart,
  getNotificationCountSuccess,
  setShowLoginDialog,
  setHideLoginDialog,
  setUserRole,
  setPassword,
  setUserName,
  setButtonActionWhilePayment,
  getNotificationCountFailure,
  getTransactionHistorySuccess,
  getTransactionHistoryFailure,
  getTransactionHistoryStart,
  filterTransactionHistory,
  setNotificationCountToZero,
  setRequestsComplete,
  setRequestsInComplete,
  setAvailablePointsZero,
  setRerenderpermissions,
  setChatHistory,
  setFaceCoordinates
} = userSlice.actions;

export default userSlice.reducer;
