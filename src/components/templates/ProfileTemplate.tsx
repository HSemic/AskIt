import * as React from 'react';
import { makeStyles } from '@mui/styles';

import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';

import ProfileInfo from '../molecules/ProfileInfo';

const useStyles = makeStyles({
  profilePaper: {
    padding: '2rem'
  }
});

const ProfileTemplate = (profileData: ProfileData): React.ReactElement => {
  const classes = useStyles();

  return (
    <Container maxWidth="md">
      <Paper className={classes.profilePaper}>
        <ProfileInfo {...profileData} />
      </Paper>
    </Container>
  );
};

export default ProfileTemplate;
