import { combineReducers } from 'redux';
import questionListReducer from './questionListReducer;

const rootReducer = combineReducers({
  questionList: questionListReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
