import * as React from 'react';
import { makeStyles } from '@mui/styles';

import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';

import ProfileInfo from '../molecules/ProfileInfo';
import { UserApiData } from '../../app/_redux/reducers/userReducer/types';

const useStyles = makeStyles({
  profilePaper: {
    padding: '2rem'
  }
});

interface ProfileTemplateProps {
  userData: UserApiData;
}

const ProfileTemplate = ({
  userData
}: ProfileTemplateProps): React.ReactElement => {
  const classes = useStyles();

  return (
    <Container maxWidth="md">
      <Paper className={classes.profilePaper}>
        <ProfileInfo user={userData} />
      </Paper>
    </Container>
  );
};

export default ProfileTemplate;
