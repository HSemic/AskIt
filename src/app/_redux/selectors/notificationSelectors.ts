import { RootState } from '../reducers/rootReducer';

export const socket = (state: RootState) => {
  return { ...state.notifications.notificationSocket };
};
