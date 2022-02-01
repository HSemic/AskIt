import * as React from 'react';
import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { useNavigate, useParams } from 'react-router-dom';

import {
  clearCurrentQuestion,
  deleteAQuestionRequest,
  fetchQuestionDetailsRequest
} from '../app/_redux/actions/questionActions';
import {
  clearComments,
  fetchQuestionCommentsRequest
} from '../app/_redux/actions/commentActions';

import { RootState } from '../app/_redux/reducers/rootReducer';

import QuestionTemplate from '../components/templates/QuestionTemplate';
import { editUserRequest } from '../app/_redux/actions/userActions';

const QuestionPage = (): React.ReactElement => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { currentQuestion, requestStatus } = useSelector(
    (state: RootState) => state.question
  );
  const { commentList } = useSelector((state: RootState) => state.comment);

  const { loggedInUser, userList } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    if (!id) return;

    dispatch(fetchQuestionDetailsRequest(id));

    dispatch(fetchQuestionCommentsRequest(id));

    return function cleanup() {
      dispatch(clearCurrentQuestion());
      dispatch(clearComments());
    };
  }, []);

  if (!currentQuestion) return <></>;

  const onQuestionDelete = () => {
    if (!loggedInUser) return;

    dispatch(deleteAQuestionRequest(currentQuestion.id));

    dispatch(
      editUserRequest(
        loggedInUser.id,
        'numberOfQuestions',
        loggedInUser.numberOfQuestions - 1
      )
    );

    if (requestStatus === 'success') navigate('/');
  };

  const displayedQuestion: QuestionData = {
    ...currentQuestion,
    variant: 'page'
  };

  return (
    <QuestionTemplate
      question={displayedQuestion}
      comments={commentList}
      onQuestionDelete={onQuestionDelete}
    />
  );
};

export default QuestionPage;
