import * as React from 'react';
import { useState } from 'react';

import { useSelector } from 'react-redux';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import UserAvatar from '../atoms/UserAvatar';
import Author from '../atoms/MetaAuthor';
import MetaText from '../atoms/MetaText';
import AuthorDateDivider from '../atoms/AuthorDateDivider';
import CommentText from '../atoms/CommentText';
import { CommentData } from '../../app/_redux/reducers/commentReducer/types';
import { localizeDate } from '../../services/localization';

import { RootState } from '../../app/_redux/reducers/rootReducer';

import FormMessage from '../atoms/FormMessage';

import { useDispatch } from 'react-redux';
import {
  deleteACommentRequest,
  editCommentRequest
} from '../../app/_redux/actions/commentActions';
import { editUserRequest } from '../../app/_redux/actions/userActions';
import OneInputForm from './OneInputForm';
import { editQuestionRequest } from '../../app/_redux/actions/questionActions';

const config = {
  authorDateDivider: {
    cardDivider: ' at ',
    pageDivider: ' - '
  },
  notLoggedInError: 'You are not logged in.',
  edditCommentFormInputLabel: 'Answer text'
};

interface CommentProps {
  comment: CommentData;
  currentQuestionNumberOfComments: number;
  loggedInUserId: string | undefined;
  loggedInUserNumberOfAnswers: number | undefined;
}

const Comment = ({
  comment,
  currentQuestionNumberOfComments,
  loggedInUserId,
  loggedInUserNumberOfAnswers
}: CommentProps): React.ReactElement => {
  const [openEditForm, setOpenEditForm] = useState(false);

  const dispatch = useDispatch();

  const { error, pending } = useSelector((state: RootState) => state.comment);

  const [commentText, setCommentText] = useState(comment.text);
  const [commentError, setCommentError] = useState('');

  const isCurrentUserOwner =
    loggedInUserId && loggedInUserId === comment.authorId;

  const onButtonDeleteClick = () => {
    if (!loggedInUserId || !loggedInUserNumberOfAnswers) {
      setCommentError(config.notLoggedInError);
      return;
    }

    dispatch(deleteACommentRequest(comment.id));

    dispatch(
      editUserRequest(
        loggedInUserId,
        'numberOfAnswers',
        loggedInUserNumberOfAnswers - 1
      )
    );

    dispatch(
      editQuestionRequest(
        comment.postId,
        'commentNumber',
        currentQuestionNumberOfComments - 1
      )
    );
  };

  const onEditCommentSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!loggedInUserId || loggedInUserId !== comment.authorId) return;

    if (!commentText) {
      setCommentError('Comment is empty!');
      return;
    }

    dispatch(editCommentRequest(comment.id, 'text', commentText));

    if (error) return;

    setOpenEditForm(false);
  };

  return (
    <Grid container direction="column" gap={2}>
      <Grid item>
        <Grid container direction="row" gap={1} sx={{ paddingRight: '2rem' }}>
          <Grid item>
            <UserAvatar username={comment.authorUsername} size="normal" />
          </Grid>
          <Grid item>
            <Grid container direction="column" gap={1}>
              <Grid item>
                <Author author={comment.authorUsername} variant="page" />
                <AuthorDateDivider
                  variant="page"
                  {...config.authorDateDivider}
                />
                <MetaText
                  text={localizeDate(comment.datetime)}
                  variant="normal"
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container direction="column" gap={1}>
          <Grid item>
            <CommentText text={comment.text} />
          </Grid>

          {isCurrentUserOwner ? (
            <>
              <Grid item gap={1} sx={{ marginLeft: 'auto' }}>
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{ height: '3rem' }}
                  onClick={() => setOpenEditForm(!openEditForm)}
                >
                  Edit
                </Button>

                <Button
                  variant="outlined"
                  color="error"
                  sx={{ height: '3rem', marginLeft: '0.5rem' }}
                  disabled={pending}
                  onClick={onButtonDeleteClick}
                >
                  Delete
                </Button>
              </Grid>
            </>
          ) : null}
        </Grid>
      </Grid>
      {openEditForm ? (
        <Grid item>
          <OneInputForm
            onSubmit={onEditCommentSubmit}
            inputText={commentText}
            setInputText={setCommentText}
            errorMessage={commentError}
            pending={pending}
            inputLabel={config.edditCommentFormInputLabel}
            fetchErrorMessage={error}
          />
        </Grid>
      ) : null}
      {error && error.length > 0 ? (
        <Grid item>
          <FormMessage type="error" text={error} />
        </Grid>
      ) : null}
    </Grid>
  );
};

export default Comment;
