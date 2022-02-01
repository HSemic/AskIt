import * as React from 'react';
import { makeStyles } from '@mui/styles';

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';

import Question from '../molecules/Question';
import CommentList from '../organisms/CommentList';

import FormMessage from '../atoms/FormMessage';
import { useAuth } from '../providers/AuthProvider';

import { CommentData } from '../../app/_redux/reducers/commentReducer/types';
import AddCommentForm from '../molecules/AddCommentForm';
import OneInputForm from '../molecules/OneInputForm';

const useStyles = makeStyles({
  paperMain: {
    padding: '3rem'
  },
  paperQuestion: {
    padding: '2rem 1rem'
  },
  paperComments: {
    padding: '2rem'
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
  setEditFormOpen
}: QuestionTemplateProps): React.ReactElement => {
  const classes = useStyles();

  const { loggedIn } = useAuth();

  // const { currentQuestion } = useSelector((state: RootState) => state.question);

  return (
    <Container maxWidth="md">
      <Paper className={classes.paperMain}>
        <Grid container direction="column" gap={4}>
          <Grid item xs={12}>
            <Paper elevation={3} className={classes.paperQuestion}>
              <Question
                question={question}
                onQuestionDelete={onQuestionDelete}
                setEditFormOpen={setEditFormOpen}
              />
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
              <FormMessage text="Log in to comment" type="info" />
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
