import { RootState } from '../reducers/rootReducer';

export const currentPage = (state: RootState) => state.question.currentPage;
