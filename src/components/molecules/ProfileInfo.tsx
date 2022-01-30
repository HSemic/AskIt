import * as React from 'react';
import { makeStyles } from '@mui/styles';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

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
  },
  button: {
    height: '3rem'
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
        <Grid container gap={4} direction="column">
          <Grid item>
            <Grid container direction="row" gap={4}>
              <Grid item>
                <UserAvatar username={username} size="profile" />
              </Grid>
              <Grid item>
                <Grid container direction="column" gap={2}>
                  <Grid item>
                    <Grid container gap={5}>
                      <Grid item>
                        <Grid item>
                          <Typography variant="body1">First name: </Typography>
                        </Grid>
                        <Grid item>
                          <Author
                            author={user.firstName || 'Not set'}
                            variant="profile"
                          />
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Grid item>
                          <Typography variant="body1">Last name: </Typography>
                        </Grid>
                        <Grid item>
                          <Author
                            author={user.lastName || 'Not set'}
                            variant="profile"
                          />
                        </Grid>
                      </Grid>
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
            </Grid>
          </Grid>
          <Grid item>
            <Grid container direction="row" gap={12}>
              <Grid item>
                <Grid container gap={4} direction="column">
                  <Grid item container alignItems={'flex-end'} gap={1}>
                    <TextField variant="standard" label="Edit first name" />
                    <Button variant="outlined" className={classes.button}>
                      Edit
                    </Button>
                  </Grid>
                  <Grid item container alignItems={'flex-end'} gap={1}>
                    <TextField variant="standard" label="Edit last name" />
                    <Button variant="outlined" className={classes.button}>
                      Edit
                    </Button>
                  </Grid>
                  <Grid item container alignItems={'flex-end'} gap={1}>
                    <TextField variant="standard" label="Edit email" />
                    <Button variant="outlined">Edit</Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container gap={4} direction="column">
                  <Grid item>
                    <TextField
                      variant="standard"
                      label="New password"
                      type="password"
                    />
                  </Grid>
                  <Grid item container alignItems={'flex-end'} gap={1}>
                    <TextField
                      variant="standard"
                      label="Repeat new password"
                      type="password"
                    />
                    <Button variant="outlined">Edit</Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ProfileInfo;
