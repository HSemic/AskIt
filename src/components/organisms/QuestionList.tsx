import * as React from 'react';

import Grid from '@mui/material/Grid';
import QuestionCard from '../molecules/Question';

interface QuestionListProps {
  questions: QuestionData[];
}

const QuestionList = ({ questions }: QuestionListProps): React.ReactElement => {
  return (
    <Grid container rowGap={2}>
      {questions.map((question) => {
        return (
          <Grid item xs={12}>
            <QuestionCard {...question} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default QuestionList;
