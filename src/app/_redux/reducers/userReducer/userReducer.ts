import { processUsername } from '../../../../services/username';
import { userTypes } from '../../actiontypes/userTypes';
import { UserAction, UserState } from './types';

const initialState: UserState = {
  pending: false,
  loggedInUser: null,
  userList: {},
  topUsers: [],
  error: null
};

const userReducer = (state = initialState, action: UserAction): UserState => {
  switch (action.type) {
    case userTypes.FETCH_USER_BY_EMAIL_AND_VALIDATE_REQUEST ||
      userTypes.FETCH_USERLIST_REQUEST ||
      userTypes.REGISTER_USER_REQUEST ||
      userTypes.FETCH_TOPUSERS_REQUEST ||
      userTypes.EDIT_USER_REQUEST:
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
    case userTypes.REGISTER_USER_SUCCESS:
      const newUserEntry: {
        [id: string]: { firstName: string; lastName: string; username: string };
      } = {};
      newUserEntry[action.payload.user.id] = {
        firstName: action.payload.user.firstName,
        lastName: action.payload.user.lastName,
        username: processUsername(
          action.payload.user.firstName,
          action.payload.user.lastName
        )
      };
      return {
        ...state,
        pending: false,
        loggedInUser: action.payload.user,
        userList: { ...state.userList, ...newUserEntry },
        error: null
      };
    case userTypes.FETCH_USER_BY_EMAIL_AND_VALIDATE_FAILURE ||
      userTypes.REGISTER_USER_FAILURE:
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
    case userTypes.FETCH_USERLIST_FAILURE || userTypes.FETCH_TOPUSERS_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.payload.error
      };
    case userTypes.LOGOUT: {
      return {
        ...state,
        loggedInUser: null
      };
    }
    case userTypes.FETCH_TOPUSERS_SUCCESS:
      return {
        ...state,
        pending: false,
        topUsers: action.payload.topUsers,
        error: null
      };
    case userTypes.EDIT_USER_SUCCESS:
      return {
        ...state,
        pending: false,
        loggedInUser: action.payload.user,
        error: null
      };
    case userTypes.EDIT_USER_FAILURE:
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

export default userReducer;
