import { RootState } from '../reducers/rootReducer';

export const allUsers = (state: RootState) => state.user.userList;
