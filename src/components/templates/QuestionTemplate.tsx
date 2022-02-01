import * as React from 'react';
import { makeStyles } from '@mui/styles';

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';

import CommentList from '../organisms/CommentList';

import { useAuth } from '../providers/AuthProvider';

import { CommentData } from '../../app/_redux/reducers/commentReducer/types';
import OneInputForm from '../molecules/OneInputForm';

import QuestionCard from '../molecules/QuestionCard';
import IconButton from '../atoms/IconButton';

import { ThumbUp, ThumbDown } from '@mui/icons-material';
import LogInToMessage from '../atoms/LogInToMessage';
import Button from '../atoms/Button';

const useStyles = makeStyles({
  paperMain: {
    padding: '3rem'
  },
  paperQuestion: {
    padding: '2rem 1rem'
  },
  paperComments: {
    padding: '2rem'
  },
  button: {
    height: '3rem'
  },
  buttonEdit: {
    marginLeft: '0.5rem !important'
  }
});

const config = {
  editQuestionInputLabel: 'Question text',
  addCommentLabel: 'Comment text'
};

interface QuestionTemplateProps {
  question: QuestionData;
  comments: CommentData[];
  onQuestionDelete: () => void;
  onEditQuestionFormSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onAddCommentFormSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  questionText: string;
  setQuestionText: React.Dispatch<React.SetStateAction<string>>;
  questionError: string;
  commentText: string;
  setCommentText: React.Dispatch<React.SetStateAction<string>>;
  commentError: string;
  pendingQuestion: boolean;
  pendingComment: boolean;
  editFormOpen: boolean;
  setEditFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onThumbsUpClick: () => void;
  onThumbsDownClick: () => void;
  loggedInUserId: string | undefined;
  loggedInUserNumberOfAnswers: number | undefined;
}

const QuestionTemplate = ({
  question,
  comments,
  onQuestionDelete,
  onEditQuestionFormSubmit,
  onAddCommentFormSubmit,
  questionText,
  setQuestionText,
  questionError,
  commentText,
  setCommentText,
  commentError,
  pendingQuestion,
  pendingComment,
  editFormOpen,
  setEditFormOpen,
  onThumbsUpClick,
  onThumbsDownClick,
  loggedInUserId,
  loggedInUserNumberOfAnswers
}: QuestionTemplateProps): React.ReactElement => {
  const classes = useStyles();

  const { loggedIn } = useAuth();

  const isCurrentUserOwner =
    loggedInUserId && loggedInUserId === question.authorId;

  return (
    <Container maxWidth="md">
      <Paper className={classes.paperMain}>
        <Grid container direction="column" gap={4}>
          <Grid item xs={12}>
            <Paper elevation={3} className={classes.paperQuestion}>
              <Grid container gap={2}>
                <Grid item>
                  <Grid container direction="column">
                    <Grid item>
                      <Grid
                        container
                        direction="column"
                        gap={0}
                        alignItems="center"
                      >
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
                </Grid>
                <Grid item flexGrow={1}>
                  <QuestionCard question={question} />
                </Grid>
              </Grid>
              {isCurrentUserOwner && (
                <Grid item container justifyContent="flex-end">
                  <Grid item>
                    <>
                      <Grid item gap={1}>
                        <Button
                          className={classes.button}
                          variant="outlined"
                          color="primary"
                          pending={pendingQuestion}
                          onClick={() => setEditFormOpen(!editFormOpen)}
                        >
                          Edit
                        </Button>

                        <Button
                          variant="outlined"
                          color="error"
                          className={`${classes.button} ${classes.buttonEdit}`}
                          pending={pendingQuestion}
                          onClick={onQuestionDelete}
                        >
                          Delete
                        </Button>
                      </Grid>
                    </>
                  </Grid>
                </Grid>
              )}

              {editFormOpen && (
                <OneInputForm
                  onSubmit={onEditQuestionFormSubmit}
                  inputText={questionText}
                  setInputText={setQuestionText}
                  errorMessage={questionError}
                  pending={pendingQuestion}
                  inputLabel={config.editQuestionInputLabel}
                />
              )}
            </Paper>
          </Grid>

          <Grid item xs={12}>
            {!loggedIn ? (
              <LogInToMessage text="Log in to comment" />
            ) : (
              <OneInputForm
                onSubmit={onAddCommentFormSubmit}
                inputText={commentText}
                setInputText={setCommentText}
                errorMessage={commentError}
                pending={pendingComment}
                inputLabel={config.addCommentLabel}
              />
            )}
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={3} className={classes.paperComments}>
              {comments && (
                <CommentList
                  comments={comments}
                  loggedInUserId={loggedInUserId}
                  loggedInUserNumberOfAnswers={loggedInUserNumberOfAnswers}
                />
              )}
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default QuestionTemplate;
