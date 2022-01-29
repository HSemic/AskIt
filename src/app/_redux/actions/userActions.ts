import { userTypes } from '../actiontypes/userTypes';
import {
  FetchUserFailure,
  FetchUserFailurePayload,
  FetchUserRequest,
  FetchUserSuccess,
  FetchUserSuccessPayload,
  FetchUserListFailure,
  FetchUserListFailurePayload,
  FetchUserListRequest,
  FetchUserListSuccess,
  FetchUserListSuccessPayload
} from '../reducers/userReducer/types';

export const fetchUserRequest = (id: string): FetchUserRequest => ({
  type: userTypes.FETCH_USER_REQUEST,
  id
});

export const fetchUserSuccess = (
  payload: FetchUserSuccessPayload
): FetchUserSuccess => ({
  type: userTypes.FETCH_USER_SUCCESS,
  payload
});

export const fetchUserFailure = (
  payload: FetchUserFailurePayload
): FetchUserFailure => ({
  type: userTypes.FETCH_USER_FAILURE,
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
