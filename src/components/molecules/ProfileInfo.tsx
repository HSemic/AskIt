import * as React from 'react';
import { makeStyles } from '@mui/styles';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import UserAvatar from '../atoms/UserAvatar';
import Author from '../atoms/MetaAuthor';
import MetaDate from '../atoms/MetaDate';

const useStyles = makeStyles({
  profilePaper: {
    padding: '2rem'
  }
});

const ProfileInfo = ({
  username,
  dateJoined,
  numberOfPosts,
  numberOfComments
}: ProfileData): React.ReactElement => {
  const classes = useStyles();

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
                <Typography variant="body1">Username: </Typography>
                <Author author={username} variant="profile" />
              </Grid>
              <Grid item>
                <Typography variant="body1">Date joined: </Typography>
                <MetaDate date={dateJoined} variant="profile" />
              </Grid>
              <Grid item>
                <Typography variant="body1">Number of posts: </Typography>
                <MetaDate date={numberOfPosts} variant="profile" />
              </Grid>
              <Grid item>
                <Typography variant="body1">Number of comments: </Typography>
                <MetaDate date={numberOfComments} variant="profile" />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ProfileInfo;
