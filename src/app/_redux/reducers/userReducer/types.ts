import { userTypes } from '../../actiontypes/userTypes';

export interface UserApiData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface UserState {
  pending: boolean;
  user: UserApiData | null;
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

export type UserAction = FetchUserRequest | FetchUserSuccess | FetchUserFailure;
