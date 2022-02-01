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
  addCommentRequest,
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

  const {
    currentQuestion,
    pending: pendingQuestion,
    error
  } = useSelector((state: RootState) => state.question);
  const { commentList, pending: pendingComment } = useSelector(
    (state: RootState) => state.comment
  );

  const { loggedInUser } = useSelector((state: RootState) => state.user);

  const [questionText, setQuestionText] = useState(
    currentQuestion?.questionText || ''
  );

  const [questionError, setQuestionError] = useState('');

  const [editFormOpen, setEditFormOpen] = useState(false);

  const [commentText, setCommentText] = useState('');
  const [commentError, setCommentError] = useState('');

  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    if (!id) return;

    dispatch(fetchQuestionDetailsRequest(id));

    dispatch(fetchQuestionCommentsRequest(id));

    return function cleanup() {
      dispatch(clearCurrentQuestion());
      dispatch(clearComments());
    };
  }, [id, dispatch]);

  useEffect(() => {
    if (!currentQuestion && deleted && !pendingQuestion) navigate('/');
  }, [currentQuestion, navigate, deleted, pendingQuestion]);

  if (!currentQuestion) return <></>;

  const onQuestionDelete = () => {
    if (!loggedInUser) return;

    dispatch(deleteAQuestionRequest(currentQuestion.id));

    if (error) return;

    dispatch(
      editUserRequest(
        loggedInUser.id,
        'numberOfQuestions',
        loggedInUser.numberOfQuestions - 1
      )
    );

    if (error) return;

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

    if (error) return;

    setEditFormOpen(false);
  };

  const onAddCommentFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!loggedInUser) return;

    if (!commentText) {
      setCommentError('Comment is empty');
      return;
    }

    dispatch(
      addCommentRequest({
        text: commentText,
        authorId: loggedInUser.id,
        datetime: Date.now(),
        postId: currentQuestion.id
      })
    );

    if (error) return;

    dispatch(
      editUserRequest(
        loggedInUser.id,
        'numberOfAnswers',
        loggedInUser.numberOfAnswers + 1
      )
    );

    if (error) return;
  };

  const onThumbsUpClick = () => {
    if (!loggedInUser) return;

    dispatch(
      editQuestionRequest(
        currentQuestion.id,
        'likes',
        currentQuestion.likes + 1
      )
    );
  };

  const onThumbsDownClick = () => {
    if (!loggedInUser) return;

    dispatch(
      editQuestionRequest(
        currentQuestion.id,
        'dislikes',
        currentQuestion.dislikes + 1
      )
    );
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
      onEditQuestionFormSubmit={onEditQuestionFormSubmit}
      onAddCommentFormSubmit={onAddCommentFormSubmit}
      questionText={questionText}
      setQuestionText={setQuestionText}
      questionError={questionError}
      commentText={commentText}
      setCommentText={setCommentText}
      commentError={commentError}
      pendingQuestion={pendingQuestion}
      pendingComment={pendingComment}
      editFormOpen={editFormOpen}
      setEditFormOpen={setEditFormOpen}
      onThumbsUpClick={onThumbsUpClick}
      onThumbsDownClick={onThumbsDownClick}
      loggedInUserId={loggedInUser?.id}
      loggedInUserNumberOfAnswers={loggedInUser?.numberOfAnswers}
    />
  );
};

export default QuestionPage;
