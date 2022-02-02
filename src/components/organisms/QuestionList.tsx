import * as React from 'react';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import QuestionCard from '../molecules/QuestionCard';
import Button from '@mui/material/Button';
import LogInToMessage from '../atoms/LogInToMessage';

interface QuestionListProps {
  questions: QuestionData[];
  incrementPage?: () => void;
  title?: string;
  fallBackText: string;
}

const QuestionList = ({
  questions,
  incrementPage,
  title,
  fallBackText
}: QuestionListProps): React.ReactElement => {
  const onButtonClick = () => {
    if (incrementPage) incrementPage();
  };

  if (questions.length === 0)
    return (
      <Grid
        container
        spacing={2}
        direction="column"
        justifyContent="flex-start"
        display="table"
      >
        <Grid item>
          <Typography variant="h5">{title}</Typography>
        </Grid>
        <Grid item>
          <LogInToMessage text={fallBackText} height="15rem" />
        </Grid>
      </Grid>
    );

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
      {questions.map((question, index) => {
        return (
          <Grid item key={index}>
            <QuestionCard question={question} />
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
