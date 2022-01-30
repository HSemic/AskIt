import * as React from 'react';
import { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
  fetchQuestionListRequest,
  fetchTopQuestionsRequest
} from '../app/_redux/actions/questionActions';
import { fetchTopUsersRequest } from '../app/_redux/actions/userActions';
import { RootState } from '../app/_redux/reducers/rootReducer';

import HomeTemplate from '../components/templates/HomeTemplate';

const HomePage = (): React.ReactElement => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);

  const { questionList, topQuestions } = useSelector(
    (state: RootState) => state.question
  );

  const { topUsers } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (!questionList || questionList.length === 0)
      dispatch(fetchQuestionListRequest(1));

    if (!topUsers || topUsers.length === 0) dispatch(fetchTopUsersRequest());

    if (!topQuestions || topQuestions.length === 0)
      dispatch(fetchTopQuestionsRequest());
  }, []);

  console.log(topQuestions);

  return (
    <HomeTemplate
      questions={questionList}
      topUsers={topUsers}
      topQuestions={topQuestions}
      page={page}
    />
  );
};

export default HomePage;
