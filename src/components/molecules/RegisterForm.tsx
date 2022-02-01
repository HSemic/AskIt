import * as React from 'react';
import { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

import { makeStyles } from '@mui/styles';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import LoadingButton from '@mui/lab/LoadingButton';

import Button from '../atoms/Button';
import ControlledInput from '../atoms/ControlledInput';

import FormTitle from '../atoms/FormTitle';
import FormMessage from '../atoms/FormMessage';

import { RootState } from '../../app/_redux/reducers/rootReducer';

import { validateEmail } from '../../services/validationService';
import { validatePassword } from '../../services/validationService';

import { useNavigate } from 'react-router-dom';

import { useAuth } from '../providers/AuthProvider';

const useStyles = makeStyles({
  formPaper: {
    padding: '4rem 2rem'
  },
  formInput: {
    width: '100%'
  },
  formButton: {
    height: '4.5rem'
  }
});

const config = {
  formTitle: 'Sign Up',
  validationErrors: {
    email: 'The email address is invalid',
    password: 'Password needs to be at least 5 characters long'
  }
};

const RegisterForm = (): React.ReactElement => {
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const { pending, error } = useSelector((state: RootState) => state.user);

  const { loggedIn, register } = useAuth();

  const navigate = useNavigate();

  // useEffect(() => {
  //   console.log(loggedIn);
  // }, [loggedIn]);

  // useEffect(() => {
  //   console.log(error);
  // }, [error]);

  useEffect(() => {
    if (email.length > 0 && !validateEmail(email))
      setEmailError(config.validationErrors.email);
    else setEmailError('');
  }, [email]);

  useEffect(() => {
    if (password.length > 0 && !validatePassword(password))
      setPasswordError(config.validationErrors.password);
    else setPasswordError('');
  }, [password]);

  useEffect(() => {
    if (loggedIn) navigate('/');
  }, [loggedIn]);

  const onInputValueChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setValue: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setValue(event.currentTarget.value);
  };

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validEmail = validateEmail(email);
    const validPassword = validatePassword(password);

    if (!validEmail) setEmailError(config.validationErrors.email);
    if (!validPassword) setPasswordError(config.validationErrors.password);

    if (validEmail && validPassword)
      register(firstName, lastName, email, password);
  };

  return (
    <Paper className={classes.formPaper}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={6}>
          <Box component="form" onSubmit={onFormSubmit}>
            <Grid container direction="column" gap={2}>
              <Grid item>
                <FormTitle text={config.formTitle} />
              </Grid>
              <Grid item>
                <ControlledInput
                  className={classes.formInput}
                  label="First Name"
                  value={firstName}
                  onChange={(event) => onInputValueChange(event, setFirstName)}
                />
              </Grid>
              <Grid item>
                <ControlledInput
                  className={classes.formInput}
                  label="Last Name"
                  value={lastName}
                  onChange={(event) => onInputValueChange(event, setLastName)}
                />
              </Grid>
              <Grid item>
                <ControlledInput
                  className={classes.formInput}
                  label="Email*"
                  value={email}
                  errorMessage={emailError}
                  onChange={(event) => onInputValueChange(event, setEmail)}
                />
              </Grid>
              <Grid item>
                <ControlledInput
                  className={classes.formInput}
                  label="Password"
                  value={password}
                  errorMessage={passwordError}
                  onChange={(event) => onInputValueChange(event, setPassword)}
                />
              </Grid>
              {error && error.length > 0 ? (
                <Grid item>
                  <FormMessage type="error" text={error} />
                </Grid>
              ) : null}
              <Grid item>
                <Button
                  className={`${classes.formInput} ${classes.formButton}`}
                  type="submit"
                  variant="contained"
                  color="primary"
                  pending={pending}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default RegisterForm;
