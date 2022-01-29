import { RootState } from '../reducers/rootReducer';

export const allUsers = (state: RootState) => {
  return { ...state.user.userList };
};
