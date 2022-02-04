import * as React from 'react';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ReplayIcon from '@mui/icons-material/Replay';

import LogInToMessage from '../atoms/LogInToMessage';
import IconButton from '../atoms/IconButton';
import QuestionCard from '../molecules/QuestionCard';

interface QuestionListProps {
  questions: QuestionData[];
  incrementPage?: () => void;
  title?: string;
  fallBackText: string;
  reload?: () => void;
}

const QuestionList = ({
  questions,
  incrementPage,
  title,
  fallBackText,
  reload
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
          <Grid
            container
            gap={2}
            direction="row"
            justifyContent="space-between"
          >
            <Grid item>
              <Typography variant="h5">{title}</Typography>
            </Grid>
            {reload && (
              <Grid item>
                <IconButton onClick={reload}>
                  <ReplayIcon />
                </IconButton>
              </Grid>
            )}
          </Grid>
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
