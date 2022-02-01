import * as React from 'react';

import { makeStyles } from '@mui/styles';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import ControlledInput from '../atoms/ControlledInput';

import Button from '../atoms/Button';
import FormTitle from '../atoms/FormTitle';
import FormMessage from '../atoms/FormMessage';

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
  formTitle: 'Sign In',
  validationErrors: {
    email: 'The email address is invalid',
    password: 'Password needs to be at least 5 characters long'
  }
};

interface LoginFormProps {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  emailError: string;
  passwordError: string;
  pending: boolean;
  apiError: string | null;
  onLoginFormSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const LoginForm = ({
  email,
  setEmail,
  password,
  setPassword,
  emailError,
  passwordError,
  pending,
  apiError,
  onLoginFormSubmit
}: LoginFormProps): React.ReactElement => {
  const classes = useStyles();

  const onInputValueChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setValue: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setValue(event.currentTarget.value);
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
          <Box component="form" onSubmit={onLoginFormSubmit}>
            <Grid container direction="column" gap={2}>
              <Grid item>
                <FormTitle text={config.formTitle} />
              </Grid>
              <Grid item>
                <ControlledInput
                  className={classes.formInput}
                  label="Email*"
                  errorMessage={emailError}
                  value={email}
                  onChange={(event) => onInputValueChange(event, setEmail)}
                />
              </Grid>
              <Grid item>
                <ControlledInput
                  className={classes.formInput}
                  label="Password*"
                  type="password"
                  errorMessage={passwordError}
                  value={password}
                  onChange={(event) => onInputValueChange(event, setPassword)}
                />
              </Grid>
              {apiError !== null && apiError.length > 0 ? (
                <Grid item>
                  <FormMessage type="error" text={apiError} />
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

export default LoginForm;
