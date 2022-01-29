import { combineReducers } from 'redux';
import questionListReducer from './questionReducer/questionReducer';
import userReducer from './userReducer/userReducer';

const rootReducer = combineReducers({
  question: questionListReducer,
  user: userReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
