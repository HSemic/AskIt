import * as React from 'react';

import Grid from '@mui/material/Grid';
import QuestionCard from '../molecules/Question';

interface QuestionListProps {
  questions: QuestionData[];
}

const QuestionList = ({ questions }: QuestionListProps): React.ReactElement => {
  return (
    <Grid
      container
      spacing={2}
      direction="column"
      justifyContent="flex-start"
      display="table"
    >
      {questions.map((question) => {
        return (
          <Grid item>
            <QuestionCard {...question} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default QuestionList;
