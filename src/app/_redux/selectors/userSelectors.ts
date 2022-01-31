import { RootState } from '../reducers/rootReducer';

export const allUsers = (state: RootState) => {
  return { ...state.user.userList };
};

export const loggedInUser = (state: RootState) => {
  return { ...state.user.loggedInUser };
};
