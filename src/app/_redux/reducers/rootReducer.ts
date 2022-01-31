import { combineReducers } from 'redux';
import questionListReducer from './questionReducer/questionReducer';
import userReducer from './userReducer/userReducer';
import commentReducer from './commentReducer/commentReducer';

const rootReducer = combineReducers({
  question: questionListReducer,
  user: userReducer,
  comment: commentReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
