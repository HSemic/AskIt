import * as React from 'react';
import Grid from '@mui/material/Grid';

import Container from '@mui/material/Container';

import QuestionList from '../organisms/QuestionList';

interface HomeProps {
  questions: QuestionData[];
}

const HomeTemplate = ({ questions }: HomeProps): React.ReactElement => {
  return (
    <Container>
      <Grid container>
        <Grid item container md={7} xs={12}>
          {' '}
          <QuestionList questions={questions} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomeTemplate;
