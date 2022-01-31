import * as React from 'react';
import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { useParams } from 'react-router-dom';

import { fetchQuestionDetailsRequest } from '../app/_redux/actions/questionActions';
import { fetchQuestionCommentsRequest } from '../app/_redux/actions/commentActions';

import { RootState } from '../app/_redux/reducers/rootReducer';

import QuestionTemplate from '../components/templates/QuestionTemplate';

import { localizeDate } from '../services/localization';

const QuestionPage = (): React.ReactElement => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { currentQuestion } = useSelector((state: RootState) => state.question);

  const { commentList } = useSelector((state: RootState) => state.comment);

  // const { userList } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (!id) return;

    dispatch(fetchQuestionDetailsRequest(id));

    dispatch(fetchQuestionCommentsRequest(id));
  }, []);

  useEffect(() => {
    console.log(commentList);
  }, [commentList]);

  if (!currentQuestion) return <></>;

  const displayedQuestion: QuestionData = {
    ...currentQuestion,
    variant: 'page'
  };

  return (
    <QuestionTemplate question={displayedQuestion} comments={commentList} />
  );
};

export default QuestionPage;
