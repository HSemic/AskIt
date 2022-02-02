import { combineReducers } from 'redux';
import questionListReducer from './questionReducer/questionReducer';
import userReducer from './userReducer/userReducer';
import commentReducer from './commentReducer/commentReducer';
import notificationReducer from './notificationReducer/notificationReducer';

const rootReducer = combineReducers({
  question: questionListReducer,
  user: userReducer,
  comment: commentReducer,
  notifications: notificationReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
