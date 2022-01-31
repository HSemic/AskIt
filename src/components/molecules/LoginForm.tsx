import * as React from 'react';
import { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

import { makeStyles } from '@mui/styles';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';

import FormTitle from '../atoms/FormTitle';
import FormMessage from '../atoms/FormMessage';

import { RootState } from '../../app/_redux/reducers/rootReducer';

import { validateEmail } from '../../services/validationService';
import { validatePassword } from '../../services/validationService';

import { useLocation, useNavigate } from 'react-router-dom';

import { useAuth } from '../providers/AuthProvider';

const useStyles = makeStyles({
  formPaper: {
    padding: '4rem 2rem'
  },
  formBox: {
    // width: '50%'
  },
  formInput: {
    width: '100%'
  },
  formButton: {
    height: '4.5rem'
  }
});

const config = {
  formTitle: 'Sign In',
  validationErrors: {
    email: 'The email address is invalid',
    password: 'Password needs to be at least 5 characters long'
  }
};

const LoginForm = (): React.ReactElement => {
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const { pending, error } = useSelector((state: RootState) => state.user);

  const { login, loggedIn } = useAuth();

  const navigate = useNavigate();
  const { state } = useLocation();

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

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validEmail = validateEmail(email);
    const validPassword = validatePassword(password);

    if (!validEmail) setEmailError(config.validationErrors.email);
    if (!validPassword) setPasswordError(config.validationErrors.password);

    if (validEmail && validPassword) login(email, password);
  };

  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  };

  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
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
          <Box
            component="form"
            className={classes.formBox}
            onSubmit={onFormSubmit}
          >
            <Grid container direction="column" gap={2}>
              <Grid item>
                <FormTitle text={config.formTitle} />
              </Grid>
              <Grid item>
                <TextField
                  className={classes.formInput}
                  label="Email*"
                  variant="outlined"
                  error={emailError.length > 0}
                  helperText={emailError}
                  value={email}
                  onChange={onEmailChange}
                />
              </Grid>
              <Grid item>
                <TextField
                  className={classes.formInput}
                  label="Password*"
                  type="password"
                  variant="outlined"
                  error={passwordError.length > 0}
                  helperText={passwordError}
                  value={password}
                  onChange={onPasswordChange}
                />
              </Grid>
              {error && error.length > 0 ? (
                <Grid item>
                  <FormMessage type="error" text={error} />
                </Grid>
              ) : null}
              <Grid item>
                {!pending ? (
                  <Button
                    className={`${classes.formInput} ${classes.formButton}`}
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Submit
                  </Button>
                ) : (
                  <LoadingButton
                    className={`${classes.formInput} ${classes.formButton}`}
                    loading
                    variant="outlined"
                  >
                    Submit
                  </LoadingButton>
                )}
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default LoginForm;
