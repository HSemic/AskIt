import * as React from 'react';

import { makeStyles } from '@mui/styles';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import Button from '../atoms/Button';
import FormMessage from '../atoms/FormMessage';

import UserAvatar from '../atoms/UserAvatar';
import Author from '../atoms/MetaAuthor';
import MetaText from '../atoms/MetaText';
import { UserApiData } from '../../app/_redux/reducers/userReducer/types';
import { localizeDate } from '../../services/localization';
import { processUsername } from '../../services/username';

const useStyles = makeStyles({
  profilePaper: {
    padding: '3rem 7rem'
  },
  button: {
    height: '3rem'
  }
});

interface ProfileInfoProps {
  user: UserApiData;
  firstName: string;
  setFirstName: React.Dispatch<React.SetStateAction<string>>;
  lastName: string;
  setLastName: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  passwordFirst: string;
  setPasswordFirst: React.Dispatch<React.SetStateAction<string>>;
  passwordSecond: string;
  setPasswordSecond: React.Dispatch<React.SetStateAction<string>>;
  emailError: string;
  passwordFirstError: string;
  passwordSecondError: string;
  pending: boolean;
  apiError: string | null;
  onFirstNameEditSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onLastNameEditSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onEmailEditSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onPasswordEditSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const ProfileInfo = ({
  user,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  passwordFirst,
  setPasswordFirst,
  passwordSecond,
  setPasswordSecond,
  emailError,
  passwordFirstError,
  passwordSecondError,
  pending,
  apiError,
  onFirstNameEditSubmit,
  onLastNameEditSubmit,
  onEmailEditSubmit,
  onPasswordEditSubmit
}: ProfileInfoProps): React.ReactElement => {
  const classes = useStyles();

  const username = processUsername(user.firstName, user.lastName);

  const onInputValueChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setValue: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setValue(event.currentTarget.value);
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
              <Grid item flexGrow={1}>
                <Grid container direction="column" gap={3}>
                  <Grid item container>
                    <Grid
                      item
                      container
                      direction="row"
                      justifyContent="space-between"
                    >
                      <Grid item flexGrow={1}>
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
                      <Grid item flexGrow={1}>
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
                    <MetaText
                      text={localizeDate(user.dateJoined)}
                      variant="profile"
                    />
                  </Grid>
                  <Grid item container justifyContent="space-between">
                    <Grid item flexGrow={1}>
                      <Typography variant="body1">
                        Number of questions:{' '}
                      </Typography>
                      <MetaText
                        text={user.numberOfQuestions.toString()}
                        variant="profile"
                      />
                    </Grid>
                    <Grid item flexGrow={1}>
                      <Typography variant="body1">
                        Number of answers:{' '}
                      </Typography>
                      <MetaText
                        text={user.numberOfAnswers.toString()}
                        variant="profile"
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item container>
            <Grid
              item
              container
              justifyContent="space-between"
              direction="row"
              gap={10}
            >
              <Grid item>
                <Grid container gap={4} direction="column">
                  <Grid item>
                    <Box component="form" onSubmit={onFirstNameEditSubmit}>
                      <Grid item container alignItems={'flex-end'} gap={1}>
                        <TextField
                          variant="standard"
                          label="Edit first name"
                          value={firstName}
                          onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                          ) => onInputValueChange(event, setFirstName)}
                        />
                        <Button
                          variant="outlined"
                          className={classes.button}
                          type="submit"
                          color="primary"
                          pending={pending}
                        >
                          Edit
                        </Button>
                      </Grid>
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box component="form" onSubmit={onLastNameEditSubmit}>
                      <Grid item container alignItems={'flex-end'} gap={1}>
                        <TextField
                          variant="standard"
                          label="Edit last name"
                          value={lastName}
                          onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                          ) => onInputValueChange(event, setLastName)}
                        />
                        <Button
                          variant="outlined"
                          className={classes.button}
                          type="submit"
                          color="primary"
                          pending={pending}
                        >
                          Edit
                        </Button>
                      </Grid>
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box component="form" onSubmit={onEmailEditSubmit}>
                      <Grid item container alignItems={'flex-end'} gap={1}>
                        <TextField
                          variant="standard"
                          label="Edit email"
                          value={email}
                          onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                          ) => onInputValueChange(event, setEmail)}
                          error={emailError.length > 0}
                          helperText={emailError}
                        />
                        <Button
                          variant="outlined"
                          className={classes.button}
                          type="submit"
                          color="primary"
                          pending={pending}
                        >
                          Edit
                        </Button>
                      </Grid>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Box component="form" onSubmit={onPasswordEditSubmit}>
                  <Grid container gap={4} direction="column">
                    <Grid item>
                      <TextField
                        variant="standard"
                        label="New password"
                        type="password"
                        value={passwordFirst}
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => onInputValueChange(event, setPasswordFirst)}
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
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => onInputValueChange(event, setPasswordSecond)}
                        error={passwordSecondError.length > 0}
                        helperText={passwordSecondError}
                      />
                      <Button
                        variant="outlined"
                        className={classes.button}
                        type="submit"
                        color="primary"
                        pending={pending}
                      >
                        Edit
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          {apiError && (
            <Grid item>
              <FormMessage type="error" text={apiError} />
            </Grid>
          )}
        </Grid>
      </Paper>
    </Container>
  );
};

export default ProfileInfo;
