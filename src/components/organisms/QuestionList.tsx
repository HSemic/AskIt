import * as React from 'react';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import QuestionCard from '../molecules/Question';
import Button from '@mui/material/Button';

interface QuestionListProps {
  questions: QuestionData[];
  incrementPage?: () => void;
  title?: string;
  page: number;
}

const QuestionList = ({
  questions,
  incrementPage,
  title,
  page
}: QuestionListProps): React.ReactElement => {
  const onButtonClick = () => {
    if (incrementPage) incrementPage();
  };

  return (
    <Grid
      container
      spacing={2}
      direction="column"
      justifyContent="flex-start"
      display="table"
    >
      {title ? (
        <Grid item>
          <Typography variant="h5">{title}</Typography>
        </Grid>
      ) : null}
      {questions.map((question) => {
        return (
          <Grid item>
            <QuestionCard {...question} />
          </Grid>
        );
      })}
      <Grid item>
        {questions.length > 0 && questions.length % 20 === 0 ? (
          <Button variant="outlined" color="primary" onClick={onButtonClick}>
            See more
          </Button>
        ) : null}
      </Grid>
    </Grid>
  );
};

export default QuestionList;
