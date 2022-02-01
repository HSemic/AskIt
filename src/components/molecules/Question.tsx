import * as React from 'react';
import { useState } from 'react';

import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import { ThumbUp, ThumbDown } from '@mui/icons-material';

import QuestionText from '../atoms/QuestionText';
import Author from '../atoms/MetaAuthor';
import MetaDate from '../atoms/MetaDate';
import CommentCount from '../atoms/CommentCount';
import UserAvatar from '../atoms/UserAvatar';
import ButtonGroup from './ButtonGroup';
import Button from '../atoms/Button';
import AuthorDateDivider from '../atoms/AuthorDateDivider';
import LikesDislikes from '../atoms/LikesDislikes';
import IconButton from '@mui/material/IconButton';

import { useNavigate } from 'react-router-dom';

import { RootState } from '../../app/_redux/reducers/rootReducer';
import { useDispatch, useSelector } from 'react-redux';
import { editQuestionRequest } from '../../app/_redux/actions/questionActions';

import EditQuestionForm from './EditQuestionForm';
import FormMessage from '../atoms/FormMessage';

import { useAuth } from '../providers/AuthProvider';

const useStyles = makeStyles({
  questionCard: {
    padding: '1.5rem 2rem',
    boxShadow: 'none !important',
    border: '1px solid lightgrey',
    minHeight: '12rem',
    '&:hover': {
      border: '1px solid black',
      cursor: 'pointer'
    }
  },
  questionCardContent: {
    padding: '0 !important'
  },
  button: {
    height: '3rem'
  },
  buttonEdit: {
    marginLeft: '0.5rem !important'
  }
});

const config = {
  authorDateDivider: {
    cardDivider: ' at ',
    pageDivider: ' - '
  }
};

interface QuestionProps {
  question: QuestionData;
  onQuestionDelete?: () => void;
}

const Question = ({
  question,
  onQuestionDelete
}: QuestionProps): React.ReactElement => {
  const classes = useStyles();

  const navigate = useNavigate();

  const onQuestionCardClick = () => {
    navigate(`question/${question.id}`);
  };

  const dispatch = useDispatch();

  const { loggedIn } = useAuth();

  const { loggedInUser } = useSelector((state: RootState) => state.user);

  const { error, pending, requestStatus } = useSelector(
    (state: RootState) => state.question
  );

  const [openEditForm, setOpenEditForm] = useState(false);

  const onButtonDeleteClick = () => {
    if (!onQuestionDelete) return;

    onQuestionDelete();
  };

  const onThumbsUpClick = () => {
    if (!loggedIn) return;

    dispatch(editQuestionRequest(question.id, 'likes', question.likes + 1));
  };

  const onThumbsDownClick = () => {
    if (!loggedIn) return;

    dispatch(
      editQuestionRequest(question.id, 'dislikes', question.dislikes + 1)
    );
  };

  const questionContent = (
    <Grid
      container
      gap={question.variant === 'card' ? 1 : 2}
      alignItems="center"
      justifyContent="flex-start"
      sx={{ overflowWrap: 'break-word' }}
    >
      {question.variant === 'page' && (
        <Grid item xs={1}>
          <ButtonGroup direction="column" gap={0}>
            <Grid container direction="column">
              <Grid item>
                <Grid container direction="column" gap={0} alignItems="center">
                  <Grid item>
                    <IconButton onClick={onThumbsUpClick}>
                      <ThumbUp />
                    </IconButton>
                  </Grid>
                  <Grid item>{question.likes}</Grid>
                </Grid>
              </Grid>
              <Grid container direction="column">
                <Grid item>
                  <Grid
                    container
                    direction="column"
                    gap={0}
                    alignItems="center"
                  >
                    <Grid item>
                      <IconButton onClick={onThumbsDownClick}>
                        <ThumbDown />
                      </IconButton>
                    </Grid>
                    <Grid item>{question.dislikes}</Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </ButtonGroup>
        </Grid>
      )}
      <Grid item xs={10}>
        <Grid
          container
          direction="column"
          gap={question.variant === 'card' ? 1 : 2}
        >
          <Grid item>
            <Grid container alignItems="center" gap={1}>
              <Grid item>
                <UserAvatar
                  username={question.author}
                  size={question.variant === 'card' ? 'small' : 'normal'}
                />
              </Grid>
              <Grid item>
                <Author author={question.author} variant={question.variant} />
                <AuthorDateDivider
                  variant={question.variant}
                  {...config.authorDateDivider}
                />
                <MetaDate
                  date={question.datetime.toString()}
                  variant="normal"
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <QuestionText
              text={question.questionText}
              variant={question.variant}
            />
          </Grid>
          <Grid item>
            <Grid container gap={2}>
              <Grid item>
                <CommentCount commentCount={question.commentNumber} />
              </Grid>
              {question.variant === 'card' ? (
                <>
                  <Grid item>
                    <LikesDislikes
                      variant="likes"
                      text={question.likes.toString()}
                    />
                  </Grid>
                  <Grid item>
                    <LikesDislikes
                      variant="dislikes"
                      text={question.dislikes.toString()}
                    />
                  </Grid>
                </>
              ) : null}
              {question.variant === 'page' &&
              loggedInUser !== undefined &&
              loggedInUser !== null &&
              loggedInUser.id === question.authorId ? (
                <>
                  <Grid
                    item
                    gap={1}
                    sx={{ marginLeft: 'auto', marginRight: '-2rem' }}
                  >
                    <Button
                      className={classes.button}
                      variant="outlined"
                      color="primary"
                      pending={pending}
                      onClick={() => setOpenEditForm(true)}
                    >
                      Edit
                    </Button>

                    <Button
                      variant="outlined"
                      color="error"
                      className={`${classes.button} ${classes.buttonEdit}`}
                      pending={pending}
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
              <EditQuestionForm
                questionId={question.id}
                authorId={question.authorId}
                setClose={setOpenEditForm}
              />
            </Grid>
          ) : null}
          {error && error.length > 0 ? (
            <Grid item>
              <FormMessage type="error" text={error} />
            </Grid>
          ) : null}
        </Grid>
      </Grid>
    </Grid>
  );

  return question.variant === 'card' ? (
    <Card className={classes.questionCard} onClick={onQuestionCardClick}>
      <CardContent className={classes.questionCardContent}>
        {questionContent}
      </CardContent>
    </Card>
  ) : (
    questionContent
  );
};

export default Question;
