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
import { generateRandomId } from '../services/uuidService';
import { sendNotificationRequest } from '../app/_redux/actions/notificationActions';
import { NotificationApiData } from '../app/_redux/reducers/notificationReducer/types';
import { Socket } from 'socket.io-client';

const config = {
  questionError: 'Question needs to be between 8 and 150 characters long.'
};

interface QuestionPageProps {
  socket: Socket | null;
}

const QuestionPage = ({ socket }: QuestionPageProps): React.ReactElement => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const {
    currentQuestion,
    pending: pendingQuestion,
    error: questionApiError
  } = useSelector((state: RootState) => state.question);

  const {
    commentList,
    pending: pendingComment,
    error: commentApiError
  } = useSelector((state: RootState) => state.comment);

  const { loggedInUser } = useSelector((state: RootState) => state.user);

  const [questionText, setQuestionText] = useState(
    currentQuestion ? currentQuestion.questionText : ''
  );

  const [questionError, setQuestionError] = useState('');

  const [editFormOpen, setEditFormOpen] = useState(false);

  const [commentText, setCommentText] = useState('');
  const [commentError, setCommentError] = useState('');

  const [deleted, setDeleted] = useState(false);

  // const socket = useSocket();

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

  const onQuestionDelete = () => {
    if (!loggedInUser || !currentQuestion) return;

    dispatch(deleteAQuestionRequest(currentQuestion.id));

    if (questionApiError) return;

    dispatch(
      editUserRequest(
        loggedInUser.id,
        'numberOfQuestions',
        loggedInUser.numberOfQuestions - 1
      )
    );

    if (questionApiError) return;

    setDeleted(true);
    // if (requestStatus === 'success' && pending === false) navigate('/');
  };

  const onEditQuestionFormSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!currentQuestion) return;

    if (!loggedInUser || loggedInUser.id !== currentQuestion.authorId) return;

    const validQuestion = validateQuestionText(questionText);

    if (!validQuestion) setQuestionError(config.questionError);
    else {
      dispatch(editQuestionRequest(currentQuestion.id, 'title', questionText));
    }

    if (questionApiError) return;

    setEditFormOpen(false);
  };

  const onAddCommentFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!loggedInUser || !currentQuestion) return;

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

    if (questionApiError) return;

    dispatch(
      editUserRequest(
        loggedInUser.id,
        'numberOfAnswers',
        loggedInUser.numberOfAnswers + 1
      )
    );

    if (questionApiError) return;

    dispatch(
      editQuestionRequest(
        currentQuestion.id,
        'commentNumber',
        currentQuestion.commentNumber + 1
      )
    );

    if (questionApiError) return;

    setCommentText('');

    const newNotification: NotificationApiData = {
      id: generateRandomId(),
      recipientId: currentQuestion.authorId,
      questionId: currentQuestion.id,
      authorId: loggedInUser.id,
      read: false,
      datetime: Date.now()
    };

    dispatch(sendNotificationRequest(newNotification));

    socket?.emit('notification', newNotification);
  };

  const onThumbsUpClick = () => {
    if (!loggedInUser || !currentQuestion) return;

    dispatch(
      editQuestionRequest(
        currentQuestion.id,
        'likes',
        currentQuestion.likes + 1
      )
    );
  };

  const onThumbsDownClick = () => {
    if (!loggedInUser || !currentQuestion) return;

    dispatch(
      editQuestionRequest(
        currentQuestion.id,
        'dislikes',
        currentQuestion.dislikes + 1
      )
    );
  };

  if (!currentQuestion) return <></>;

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
      questionApiError={questionApiError}
      commentApiError={commentApiError}
    />
  );
};

export default QuestionPage;
