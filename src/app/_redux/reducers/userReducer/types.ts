import { userTypes } from '../../actiontypes/userTypes';

export interface UserApiData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface UserData {
  firstName: string;
  lastName: string;
}

export interface UserState {
  pending: boolean;
  user: UserApiData | null;
  userList: { [id: string]: UserData };
  error: string | null;
}

export interface FetchUserSuccessPayload {
  user: UserApiData;
}

export interface FetchUserFailurePayload {
  error: string;
}

export interface FetchUserRequest {
  type: typeof userTypes.FETCH_USER_REQUEST;
  id: string;
}

export type FetchUserSuccess = {
  type: typeof userTypes.FETCH_USER_SUCCESS;
  payload: FetchUserSuccessPayload;
};

export type FetchUserFailure = {
  type: typeof userTypes.FETCH_USER_FAILURE;
  payload: FetchUserFailurePayload;
};

export interface FetchUserListSuccessPayload {
  userList: { [id: string]: UserData };
}

export interface FetchUserListFailurePayload {
  error: string;
}

export interface FetchUserListRequest {
  type: typeof userTypes.FETCH_USERLIST_REQUEST;
}

export type FetchUserListSuccess = {
  type: typeof userTypes.FETCH_USERLIST_SUCCESS;
  payload: FetchUserListSuccessPayload;
};

export type FetchUserListFailure = {
  type: typeof userTypes.FETCH_USERLIST_FAILURE;
  payload: FetchUserListFailurePayload;
};

export type UserAction =
  | FetchUserRequest
  | FetchUserSuccess
  | FetchUserFailure
  | FetchUserListRequest
  | FetchUserListSuccess
  | FetchUserListFailure;
