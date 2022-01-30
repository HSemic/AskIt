import { userTypes } from '../../actiontypes/userTypes';
import { UserAction, UserState } from './types';

const initialState: UserState = {
  pending: false,
  loggedInUser: null,
  userList: {},
  error: null
};

export default (state = initialState, action: UserAction): UserState => {
  switch (action.type) {
    case userTypes.FETCH_USER_BY_EMAIL_AND_VALIDATE_REQUEST ||
      userTypes.FETCH_USERLIST_REQUEST:
      return {
        ...state,
        pending: true
      };
    case userTypes.FETCH_USER_BY_EMAIL_AND_VALIDATE_SUCCESS:
      return {
        ...state,
        pending: false,
        loggedInUser: action.payload.user,
        error: null
      };
    case userTypes.FETCH_USER_BY_EMAIL_AND_VALIDATE_FAILURE:
      return {
        ...state,
        pending: false,
        loggedInUser: null,
        error: action.payload.error
      };
    case userTypes.FETCH_USERLIST_SUCCESS:
      return {
        ...state,
        pending: false,
        userList: action.payload.userList,
        error: null
      };
    case userTypes.FETCH_USERLIST_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.payload.error
      };
    default:
      return {
        ...state
      };
  }
};
