import * as React from 'react';
import { makeStyles } from '@mui/styles';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import UserAvatar from '../atoms/UserAvatar';
import Author from '../atoms/MetaAuthor';
import MetaDate from '../atoms/MetaDate';
import {
  UserApiData,
  UserData
} from '../../app/_redux/reducers/userReducer/types';
import { localizeDate } from '../../services/localization';

const useStyles = makeStyles({
  profilePaper: {
    padding: '2rem'
  }
});

interface ProfileInfoProps {
  user: UserApiData;
}

const ProfileInfo = ({ user }: ProfileInfoProps): React.ReactElement => {
  const classes = useStyles();

  const username = user.firstName + ' ' + user.lastName;

  return (
    <Container maxWidth="md">
      <Paper className={classes.profilePaper}>
        <Grid container direction="row" gap={2}>
          <Grid item>
            <UserAvatar username={username} size="profile" />
          </Grid>
          <Grid item>
            <Grid container direction="column" gap={2}>
              <Grid item>
                <Grid container gap={1} alignItems="flex-end">
                  <Grid item>
                    <Typography variant="body1">Username: </Typography>
                    <Author author={username} variant="profile" />
                  </Grid>
                  <Grid item>fdsafsafs</Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Typography variant="body1">Email: </Typography>
                <Author author={user.email} variant="profile" />
              </Grid>
              <Grid item>
                <Typography variant="body1">Date joined: </Typography>
                <MetaDate
                  date={localizeDate(user.dateJoined)}
                  variant="profile"
                />
              </Grid>
              <Grid item>
                <Typography variant="body1">Number of answers: </Typography>
                <MetaDate
                  date={user.numberOfAnswers.toString()}
                  variant="profile"
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item></Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ProfileInfo;
