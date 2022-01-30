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
  FetchUserListSuccessPayload,
  RegisterUserSuccessPayload,
  RegisterUserFailurePayload,
  RegisterUserRequest,
  RegisterUserSuccess,
  RegisterUserFailure,
  UserApiData,
  Logout
} from '../reducers/userReducer/types';

export const registerUserRequest = (
  newUser: Omit<UserApiData, 'id'>
): RegisterUserRequest => ({
  type: userTypes.REGISTER_USER_REQUEST,
  newUser
});

export const registerUserSuccess = (
  payload: RegisterUserSuccessPayload
): RegisterUserSuccess => ({
  type: userTypes.REGISTER_USER_SUCCESS,
  payload
});

export const registerUserFailure = (
  payload: RegisterUserFailurePayload
): RegisterUserFailure => ({
  type: userTypes.REGISTER_USER_FAILURE,
  payload
});

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

export const logout = (): Logout => ({
  type: userTypes.LOGOUT
});
