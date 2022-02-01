import * as React from 'react';

import { makeStyles } from '@mui/styles';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import Button from '../atoms/Button';

import FormMessage from '../atoms/FormMessage';
import ControlledInput from '../atoms/ControlledInput';

const useStyles = makeStyles({
  formPaper: {
    padding: '2rem 2rem'
  },
  formInput: {
    width: '100%'
  },
  formButton: {
    height: '4.5rem'
  }
});

interface OneInputFormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  errorMessage?: string;
  fetchErrorMessage: string | null;
  pending: boolean;
  inputText: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  inputLabel: string;
}

const OneInputForm = ({
  onSubmit,
  errorMessage,
  fetchErrorMessage,
  pending,
  inputText,
  setInputText,
  inputLabel
}: OneInputFormProps): React.ReactElement => {
  const classes = useStyles();

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.currentTarget.value);
  };

  return (
    <Paper className={classes.formPaper}>
      <Box component="form" onSubmit={onSubmit}>
        <Grid container gap={2} direction="column">
          <Grid item xs={12}>
            <ControlledInput
              className={classes.formInput}
              label={inputLabel}
              multiline
              rowNumber={4}
              errorMessage={errorMessage}
              value={inputText}
              onChange={onInputChange}
            />
          </Grid>
          {fetchErrorMessage !== null && fetchErrorMessage.length > 0 ? (
            <Grid item>
              <FormMessage type="error" text={fetchErrorMessage} />
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
    </Paper>
  );
};

export default OneInputForm;
