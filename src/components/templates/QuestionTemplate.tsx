import * as React from 'react';
import { makeStyles } from '@mui/styles';

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';

import Question from '../molecules/Question';
import CommentList from '../organisms/CommentList';

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
}

const QuestionTemplate = ({
  question,
  comments
}: QuestionTemplateProps): React.ReactElement => {
  const classes = useStyles();

  return (
    <Container maxWidth="md">
      <Paper className={classes.paperMain}>
        <Grid container direction="column" gap={4}>
          <Grid item xs={12}>
            <Paper elevation={3} className={classes.paperQuestion}>
              <Question {...question} />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={3} className={classes.paperComments}>
              <CommentList comments={comments} />
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default QuestionTemplate;
