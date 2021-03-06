import { userTypes } from '../../actiontypes/userTypes';

export interface UserApiData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  numberOfAnswers: number;
  numberOfQuestions: number;
  dateJoined: number;
}

export interface UserData {
  firstName: string;
  lastName: string;
  username: string;
}

export interface UserState {
  pending: boolean;
  loggedInUser: UserApiData | null;
  userList: { [id: string]: UserData };
  topUsers: UserApiData[];
  error: string | null;
  isUserLoggedIn: boolean;
}

export interface RegisterUserSuccessPayload {
  user: UserApiData;
}

export interface RegisterUserFailurePayload {
  error: string;
}

export interface RegisterUserRequest {
  type: typeof userTypes.REGISTER_USER_REQUEST;
  newUser: Omit<
    UserApiData,
    'id' | 'numberOfAnswers' | 'numberOfQuestions' | 'dateJoined'
  >;
}

export interface RegisterUserSuccess {
  type: typeof userTypes.REGISTER_USER_SUCCESS;
  payload: RegisterUserSuccessPayload;
}

export interface RegisterUserFailure {
  type: typeof userTypes.REGISTER_USER_FAILURE;
  payload: RegisterUserFailurePayload;
}

export interface FetchUserByEmailAndValidateSuccessPayload {
  user: UserApiData;
}

export interface FetchUserByEmailAndValidateFailurePayload {
  error: string;
}

export interface FetchUserByEmailAndValidateRequest {
  type: typeof userTypes.FETCH_USER_BY_EMAIL_AND_VALIDATE_REQUEST;
  email: string;
  password: string;
}

export interface FetchUserByEmailAndValidateSuccess {
  type: typeof userTypes.FETCH_USER_BY_EMAIL_AND_VALIDATE_SUCCESS;
  payload: FetchUserByEmailAndValidateSuccessPayload;
}

export interface FetchUserByEmailAndValidateFailure {
  type: typeof userTypes.FETCH_USER_BY_EMAIL_AND_VALIDATE_FAILURE;
  payload: FetchUserByEmailAndValidateFailurePayload;
}

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

export interface FetchTopUsersSuccessPayload {
  topUsers: UserApiData[];
}

export interface FetchTopUsersFailurePayload {
  error: string;
}

export interface FetchTopUsersRequest {
  type: typeof userTypes.FETCH_TOPUSERS_REQUEST;
}

export type FetchTopUsersSuccess = {
  type: typeof userTypes.FETCH_TOPUSERS_SUCCESS;
  payload: FetchTopUsersSuccessPayload;
};

export type FetchTopUsersFailure = {
  type: typeof userTypes.FETCH_TOPUSERS_FAILURE;
  payload: FetchTopUsersFailurePayload;
};

export interface EditUserPayloadSuccess {
  user: UserApiData;
}

export interface EditUserPayloadFailure {
  error: string;
}

export interface EditUserRequest {
  type: typeof userTypes.EDIT_USER_REQUEST;
  id: string;
  attribute:
    | 'firstName'
    | 'lastName'
    | 'email'
    | 'password'
    | 'numberOfQuestions'
    | 'numberOfAnswers';
  value: string | number;
}

export interface EditUserSuccess {
  type: typeof userTypes.EDIT_USER_SUCCESS;
  payload: EditUserPayloadSuccess;
}

export interface EditUserFailure {
  type: typeof userTypes.EDIT_USER_FAILURE;
  payload: EditUserPayloadFailure;
}

export type Logout = {
  type: typeof userTypes.LOGOUT;
};

export type UserAction =
  | FetchUserListRequest
  | FetchUserListSuccess
  | FetchUserListFailure
  | FetchUserByEmailAndValidateRequest
  | FetchUserByEmailAndValidateSuccess
  | FetchUserByEmailAndValidateFailure
  | RegisterUserRequest
  | RegisterUserSuccess
  | RegisterUserFailure
  | FetchTopUsersRequest
  | FetchTopUsersSuccess
  | FetchTopUsersFailure
  | EditUserRequest
  | EditUserSuccess
  | EditUserFailure
  | Logout;
