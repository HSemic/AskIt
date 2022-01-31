import * as React from 'react';

import { makeStyles } from '@mui/styles';

import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';

import ProfileInfo from '../molecules/ProfileInfo';
import { UserApiData } from '../../app/_redux/reducers/userReducer/types';
import QuestionList from '../organisms/QuestionList';
import { Grid } from '@mui/material';

const useStyles = makeStyles({
  profilePaper: {
    padding: '2rem'
  }
});

interface ProfileTemplateProps {
  userData: UserApiData;
  questions: QuestionData[];
  page: number;
}

const ProfileTemplate = ({
  userData,
  questions,
  page
}: ProfileTemplateProps): React.ReactElement => {
  const classes = useStyles();

  return (
    <Container maxWidth="md">
      <Grid container direction="column" gap={4}>
        <Grid item>
          <Paper className={classes.profilePaper}>
            <ProfileInfo user={userData} />
          </Paper>
        </Grid>
        <Grid item>
          <Paper className={classes.profilePaper}>
            <QuestionList
              questions={questions}
              page={page}
              title="My questions"
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProfileTemplate;
