import * as React from 'react';

import { makeStyles } from '@mui/styles';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

import Button from '../atoms/Button';
import ControlledInput from '../atoms/ControlledInput';

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
  formTitle: 'Sign Up',
  validationErrors: {
    email: 'The email address is invalid',
    password: 'Password needs to be at least 5 characters long'
  }
};

interface RegisterFormProps {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  emailError: string;
  passwordError: string;
  firstName: string;
  setFirstName: React.Dispatch<React.SetStateAction<string>>;
  lastName: string;
  setLastName: React.Dispatch<React.SetStateAction<string>>;
  pending: boolean;
  apiError: string | null;
  onRegisterFormSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const RegisterForm = ({
  email,
  setEmail,
  password,
  setPassword,
  emailError,
  passwordError,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  pending,
  apiError,
  onRegisterFormSubmit
}: RegisterFormProps): React.ReactElement => {
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
          <Box component="form" onSubmit={onRegisterFormSubmit}>
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
              {apiError && apiError.length > 0 ? (
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

export default RegisterForm;
