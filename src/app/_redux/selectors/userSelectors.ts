import { RootState } from '../reducers/rootReducer';

export const allUsers = (state: RootState) => {
  return { ...state.user.userList };
};

export const loggedInUser = (state: RootState) => {
  return { ...state.user.loggedInUser };
};

export const isUserLoggedIn = (state: RootState): boolean => {
  return state.user.isUserLoggedIn;
};
