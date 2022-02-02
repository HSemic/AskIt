import { combineReducers } from 'redux';
import questionListReducer from './questionReducer/questionReducer';
import userReducer from './userReducer/userReducer';
import commentReducer from './commentReducer/commentReducer';
import socketReducer from './socketReducer/socketReducer';

const rootReducer = combineReducers({
  question: questionListReducer,
  user: userReducer,
  comment: commentReducer,
  socket: socketReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
