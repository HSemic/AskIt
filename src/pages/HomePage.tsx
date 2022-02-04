import * as React from 'react';
import { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
  fetchQuestionListRequest,
  fetchTopQuestionsRequest,
  postQuestionRequest
} from '../app/_redux/actions/questionActions';
import {
  editUserRequest,
  fetchTopUsersRequest
} from '../app/_redux/actions/userActions';
import { clearQuestions } from '../app/_redux/actions/questionActions';
import { RootState } from '../app/_redux/reducers/rootReducer';

import HomeTemplate from '../components/templates/HomeTemplate';
import { validateQuestionText } from '../services/validationService';

const config = {
  questionError: 'Question needs to be between 8 and 300 characters long.'
};

const HomePage = (): React.ReactElement => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);

  const { pending, questionList, topQuestions, error } = useSelector(
    (state: RootState) => state.question
  );

  const { loggedInUser, topUsers } = useSelector(
    (state: RootState) => state.user
  );

  const [questionText, setQuestionText] = useState('');
  const [questionError, setQuestionError] = useState('');

  useEffect(() => {
    // if (!questionList || questionList.length === 0)
    dispatch(fetchQuestionListRequest(1, null));

    dispatch(fetchTopUsersRequest());

    dispatch(fetchTopQuestionsRequest());

    return function cleanup() {
      dispatch(clearQuestions());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchQuestionListRequest(page, null));
  }, [page, dispatch]);

  const onAddQuestionFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!loggedInUser) return;

    const validQuestion = validateQuestionText(questionText);

    if (!validQuestion) setQuestionError(config.questionError);
    else {
      dispatch(
        postQuestionRequest({
          title: questionText,
          authorId: loggedInUser.id,
          datetime: Date.now(),
          likes: 0,
          dislikes: 0,
          commentNumber: 0
        })
      );

      if (error) return;

      dispatch(
        editUserRequest(
          loggedInUser.id,
          'numberOfQuestions',
          loggedInUser.numberOfQuestions + 1
        )
      );

      setQuestionText('');
    }
  };

  const incrementPageByOne = () => {
    setPage(page + 1);
  };

  const reload = () => {
    dispatch(clearQuestions());
    dispatch(fetchQuestionListRequest(1, null));
  };

  return (
    <HomeTemplate
      questions={questionList}
      topUsers={topUsers}
      topQuestions={topQuestions}
      incrementPage={incrementPageByOne}
      loggedIn={loggedInUser !== null}
      onAddQuestionFormSubmit={onAddQuestionFormSubmit}
      questionText={questionText}
      setQuestionText={setQuestionText}
      questionError={questionError}
      questionApiError={error}
      pendingAddQuestion={pending}
      reload={reload}
    />
  );
};

export default HomePage;
