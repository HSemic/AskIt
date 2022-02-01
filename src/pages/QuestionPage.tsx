import * as React from 'react';
import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { useNavigate, useParams } from 'react-router-dom';

import {
  clearCurrentQuestion,
  deleteAQuestionRequest,
  editQuestionRequest,
  fetchQuestionDetailsRequest
} from '../app/_redux/actions/questionActions';
import {
  clearComments,
  fetchQuestionCommentsRequest
} from '../app/_redux/actions/commentActions';

import { RootState } from '../app/_redux/reducers/rootReducer';

import QuestionTemplate from '../components/templates/QuestionTemplate';
import { editUserRequest } from '../app/_redux/actions/userActions';
import { validateQuestionText } from '../services/validationService';

const config = {
  questionError: 'Question needs to be between 8 and 150 characters long.'
};

const QuestionPage = (): React.ReactElement => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { currentQuestion, requestStatus, pending } = useSelector(
    (state: RootState) => state.question
  );
  const { commentList } = useSelector((state: RootState) => state.comment);

  const { loggedInUser } = useSelector((state: RootState) => state.user);

  const [questionText, setQuestionText] = useState(
    currentQuestion?.questionText || ''
  );

  const [questionError, setQuestionError] = useState('');

  const [editFormOpen, setEditFormOpen] = useState(false);

  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    if (!id) return;

    dispatch(fetchQuestionDetailsRequest(id));

    dispatch(fetchQuestionCommentsRequest(id));

    return function cleanup() {
      dispatch(clearCurrentQuestion());
      dispatch(clearComments());
    };
  }, []);

  useEffect(() => {
    if (!currentQuestion && deleted) navigate('/');
  }, [currentQuestion]);

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

    setDeleted(true);
    // if (requestStatus === 'success' && pending === false) navigate('/');
  };

  const onEditQuestionFormSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!loggedInUser || loggedInUser.id !== currentQuestion.authorId) return;

    const validQuestion = validateQuestionText(questionText);

    if (!validQuestion) setQuestionError(config.questionError);
    else {
      dispatch(editQuestionRequest(currentQuestion.id, 'title', questionText));
    }

    setEditFormOpen(false);
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
