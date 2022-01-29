import * as React from 'react';
import { makeStyles } from '@mui/styles';

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';

import Question from '../molecules/Question';
import CommentList from '../organisms/CommentList';

const useStyles = makeStyles({
  questionPaper: {
    padding: '3rem'
  }
});

interface QuestionTemplateProps {
  question: QuestionData;
  comments: CommentData[];
}

const QuestionTemplate = ({
  question,
  comments
}: QuestionTemplateProps): React.ReactElement => {
  const classes = useStyles();

  return (
    <Container maxWidth="md">
      <Paper className={classes.questionPaper}>
        <Grid container direction="column" gap={10}>
          <Grid item xs={12}>
            <Question {...question} />
          </Grid>
          <Grid item xs={12}>
            <CommentList comments={comments} />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default QuestionTemplate;
