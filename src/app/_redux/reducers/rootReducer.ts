import { combineReducers } from 'redux';
import questionListReducer from './questionListReducer/questionListReducer';
import userReducer from './userReducer/userReducer';

const rootReducer = combineReducers({
  questionList: questionListReducer,
  user: userReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
