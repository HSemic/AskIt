import { userTypes } from '../actiontypes/userTypes';
import {
  FetchUserFailure,
  FetchUserFailurePayload,
  FetchUserRequest,
  FetchUserSuccess,
  FetchUserSuccessPayload
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
