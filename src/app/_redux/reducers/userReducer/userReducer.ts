import { userTypes } from '../../actiontypes/userTypes';
import { UserAction, UserState } from './types';

const initialState: UserState = {
  pending: false,
  user: null,
  error: null
};

export default (state = initialState, action: UserAction) => {
  switch (action.type) {
    case userTypes.FETCH_USER_REQUEST:
      return {
        ...state,
        pending: true
      };
    case userTypes.FETCH_USER_SUCCESS:
      return {
        ...state,
        pending: false,
        user: action.payload.user,
        error: null
      };
    case userTypes.FETCH_USER_FAILURE:
      return {
        ...state,
        pending: false,
        user: null,
        error: action.payload.error
      };
    default:
      return {
        ...state
      };
  }
};
