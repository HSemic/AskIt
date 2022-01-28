import * as React from 'react';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import QuestionCardText from '../atoms/QuestionCardText';
import QuestionAuthorDate from '../atoms/QuestionAuthorDate';
import QuestionCommentCount from '../atoms/QuestionCommentCount';

const useStyles = makeStyles({
  questionCard: {
    padding: '1.5rem 2rem',
    boxShadow: 'none !important',
    border: '1px solid lightgrey',
    '&:hover': {
      border: '1px solid black',
      cursor: 'pointer'
    }
  },
  questionCardContent: {
    padding: '0 !important'
  }
});

const QuestionCard = ({
  questionText,
  author,
  datetime
}: QuestionData): React.ReactElement => {
  const classes = useStyles();

  return (
    <Card className={classes.questionCard}>
      <CardContent className={classes.questionCardContent}>
        <Grid container direction="column" gap={0.8}>
          <Grid item>
            <QuestionAuthorDate author={author} datetime={datetime} />
          </Grid>
          <Grid item>
            <QuestionCardText text={questionText} />
          </Grid>
          <Grid item>
            <QuestionCommentCount commentCount={1} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default QuestionCard;
