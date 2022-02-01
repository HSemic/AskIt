import * as React from 'react';
import { makeStyles } from '@mui/styles';

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';

import CommentList from '../organisms/CommentList';

import { useAuth } from '../providers/AuthProvider';

import { CommentData } from '../../app/_redux/reducers/commentReducer/types';
import AddCommentForm from '../molecules/AddCommentForm';
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

interface QuestionTemplateProps {
  question: QuestionData;
  comments: CommentData[];
  onQuestionDelete: () => void;
  onEditQuestionFormSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  questionText: string;
  setQuestionText: React.Dispatch<React.SetStateAction<string>>;
  questionError: string;
  pending: boolean;
  editFormOpen: boolean;
  setEditFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onThumbsUpClick: () => void;
  onThumbsDownClick: () => void;
  isCurrentUserOwner: boolean;
}

const QuestionTemplate = ({
  question,
  comments,
  onQuestionDelete,
  onEditQuestionFormSubmit,
  questionText,
  setQuestionText,
  questionError,
  pending,
  editFormOpen,
  setEditFormOpen,
  onThumbsUpClick,
  onThumbsDownClick,
  isCurrentUserOwner
}: QuestionTemplateProps): React.ReactElement => {
  const classes = useStyles();

  const { loggedIn } = useAuth();

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
                          pending={pending}
                          onClick={() => setEditFormOpen(!editFormOpen)}
                        >
                          Edit
                        </Button>

                        <Button
                          variant="outlined"
                          color="error"
                          className={`${classes.button} ${classes.buttonEdit}`}
                          pending={pending}
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
                  pending={pending}
                />
              )}
            </Paper>
          </Grid>

          <Grid item xs={12}>
            {!loggedIn ? (
              <LogInToMessage text="Log in to comment" />
            ) : (
              <AddCommentForm postId={question.id} />
            )}
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={3} className={classes.paperComments}>
              {comments && <CommentList comments={comments} />}
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default QuestionTemplate;
