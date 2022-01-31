import * as React from 'react';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import QuestionCard from '../molecules/Question';
import Button from '@mui/material/Button';

import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestionListRequest } from '../../app/_redux/actions/questionActions';
import { RootState } from '../../app/_redux/reducers/rootReducer';

interface QuestionListProps {
  questions: QuestionData[];
  page: number;
  title?: string;
}

const QuestionList = ({
  questions,
  page,
  title
}: QuestionListProps): React.ReactElement => {
  const dispatch = useDispatch();

  const { questionList } = useSelector((state: RootState) => state.question);

  const onButtonClick = () => {
    dispatch(fetchQuestionListRequest(page + 1, null));
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
        {questionList.length > 0 && questionList.length % 20 === 0 ? (
          <Button variant="outlined" color="primary" onClick={onButtonClick}>
            See more
          </Button>
        ) : null}
      </Grid>
    </Grid>
  );
};

export default QuestionList;
