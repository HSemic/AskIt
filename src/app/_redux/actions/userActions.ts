import { userTypes } from '../actiontypes/userTypes';
import {
  FetchUserByEmailAndValidateRequest,
  FetchUserByEmailAndValidateSuccess,
  FetchUserByEmailAndValidateFailure,
  FetchUserByEmailAndValidateSuccessPayload,
  FetchUserByEmailAndValidateFailurePayload,
  FetchUserListFailurePayload,
  FetchUserListRequest,
  FetchUserListSuccess,
  FetchUserListFailure,
  FetchUserListSuccessPayload
} from '../reducers/userReducer/types';

export const fetchUserByEmailAndValidateRequest = (
  email: string,
  password: string
): FetchUserByEmailAndValidateRequest => ({
  type: userTypes.FETCH_USER_BY_EMAIL_AND_VALIDATE_REQUEST,
  email,
  password
});

export const fetchUserByEmailAndValidateSuccess = (
  payload: FetchUserByEmailAndValidateSuccessPayload
): FetchUserByEmailAndValidateSuccess => ({
  type: userTypes.FETCH_USER_BY_EMAIL_AND_VALIDATE_SUCCESS,
  payload
});

export const fetchUserByEmailAndValidateFailure = (
  payload: FetchUserByEmailAndValidateFailurePayload
): FetchUserByEmailAndValidateFailure => ({
  type: userTypes.FETCH_USER_BY_EMAIL_AND_VALIDATE_FAILURE,
  payload
});

export const fetchUserListRequest = (): FetchUserListRequest => ({
  type: userTypes.FETCH_USERLIST_REQUEST
});

export const fetchUserListSuccess = (
  payload: FetchUserListSuccessPayload
): FetchUserListSuccess => ({
  type: userTypes.FETCH_USERLIST_SUCCESS,
  payload
});

export const fetchUserListFailure = (
  payload: FetchUserListFailurePayload
): FetchUserListFailure => ({
  type: userTypes.FETCH_USERLIST_FAILURE,
  payload
});
