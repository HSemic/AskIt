import * as React from 'react';
import { useState } from 'react';

import { makeStyles } from '@mui/styles';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import UserAvatar from '../atoms/UserAvatar';
import Author from '../atoms/MetaAuthor';
import MetaDate from '../atoms/MetaDate';
import {
  UserApiData,
  UserData
} from '../../app/_redux/reducers/userReducer/types';
import { localizeDate } from '../../services/localization';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/_redux/reducers/rootReducer';
import { editUserRequest } from '../../app/_redux/actions/userActions';
import {
  validateEmail,
  validatePassword
} from '../../services/validationService';

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

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [passwordFirst, setPasswordFirst] = useState('');
  const [passwordSecond, setPasswordSecond] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordFirstError, setPasswordFirstError] = useState('');
  const [passwordSecondError, setPasswordSecondError] = useState('');

  const dispatch = useDispatch();

  const onFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(event.currentTarget.value);
  };

  const onLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.currentTarget.value);
  };

  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  };

  const onPasswordFirstChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordFirst(event.currentTarget.value);
  };

  const onPasswordSecondChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordSecond(event.currentTarget.value);
  };

  const onFirstNameSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(editUserRequest(user.id, 'firstName', firstName));

    setFirstName('');
  };

  const onLastNameSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(editUserRequest(user.id, 'lastName', lastName));

    setLastName('');
  };

  const onEmailSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validEmail = validateEmail(email);

    if (!validEmail) {
      setEmailError('Incorrect email address');
      return;
    }

    dispatch(editUserRequest(user.id, 'email', email));

    setEmail('');
  };

  const onPasswordSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validPassword = validatePassword(passwordFirst);

    if (!validPassword) {
      setPasswordSecondError('Password needs to be longer that 5 characters');
      return;
    }

    if (passwordFirst !== passwordSecond) {
      setPasswordSecondError('Passwords do not match');
      return;
    }

    dispatch(editUserRequest(user.id, 'password', passwordFirst));

    setPasswordFirst('');
    setPasswordSecond('');
  };

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
                  <Grid item>
                    <Box component="form" onSubmit={onFirstNameSubmit}>
                      <Grid item container alignItems={'flex-end'} gap={1}>
                        <TextField
                          variant="standard"
                          label="Edit first name"
                          value={firstName}
                          onChange={onFirstNameChange}
                        />
                        <Button
                          variant="outlined"
                          className={classes.button}
                          type="submit"
                        >
                          Edit
                        </Button>
                      </Grid>
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box component="form" onSubmit={onLastNameSubmit}>
                      <Grid item container alignItems={'flex-end'} gap={1}>
                        <TextField
                          variant="standard"
                          label="Edit last name"
                          value={lastName}
                          onChange={onLastNameChange}
                        />
                        <Button
                          variant="outlined"
                          className={classes.button}
                          type="submit"
                        >
                          Edit
                        </Button>
                      </Grid>
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box component="form" onSubmit={onEmailSubmit}>
                      <Grid item container alignItems={'flex-end'} gap={1}>
                        <TextField
                          variant="standard"
                          label="Edit email"
                          value={email}
                          onChange={onEmailChange}
                          error={emailError.length > 0}
                          helperText={emailError}
                        />
                        <Button
                          variant="outlined"
                          className={classes.button}
                          type="submit"
                        >
                          Edit
                        </Button>
                      </Grid>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Box component="form" onSubmit={onPasswordSubmit}>
                  <Grid container gap={4} direction="column">
                    <Grid item>
                      <TextField
                        variant="standard"
                        label="New password"
                        type="password"
                        value={passwordFirst}
                        onChange={onPasswordFirstChange}
                        error={passwordFirstError.length > 0}
                        helperText={passwordFirstError}
                      />
                    </Grid>
                    <Grid item container alignItems={'flex-end'} gap={1}>
                      <TextField
                        variant="standard"
                        label="Repeat new password"
                        type="password"
                        value={passwordSecond}
                        onChange={onPasswordSecondChange}
                        error={passwordSecondError.length > 0}
                        helperText={passwordSecondError}
                      />
                      <Button
                        variant="outlined"
                        className={classes.button}
                        type="submit"
                      >
                        Edit
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ProfileInfo;
