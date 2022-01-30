import * as React from 'react';

import Grid from '@mui/material/Grid';
import QuestionCard from '../molecules/Question';
import Button from '@mui/material/Button';

import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestionListRequest } from '../../app/_redux/actions/questionActions';
import { RootState } from '../../app/_redux/reducers/rootReducer';

interface QuestionListProps {
  questions: QuestionData[];
  variant: 'newest' | 'my';
  page: number;
}

const QuestionList = ({
  questions,
  variant,
  page
}: QuestionListProps): React.ReactElement => {
  const dispatch = useDispatch();

  const { questionList } = useSelector((state: RootState) => state.question);

  const onButtonClick = () => {
    dispatch(fetchQuestionListRequest(page + 1, variant));
  };

  console.log(questionList.length);

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
