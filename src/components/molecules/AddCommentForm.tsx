import * as React from 'react';
import { useState } from 'react';

import { makeStyles } from '@mui/styles';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import { validateQuestionText } from '../../services/validationService';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/_redux/reducers/rootReducer';

import { postQuestionRequest } from '../../app/_redux/actions/questionActions';
import FormMessage from '../atoms/FormMessage';
import { addCommentRequest } from '../../app/_redux/actions/commentActions';
import { editUserRequest } from '../../app/_redux/actions/userActions';

const useStyles = makeStyles({
  formPaper: {
    padding: '2rem 2rem'
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

interface AddCommentFormProps {
  postId: string;
}

const AddCommentForm = ({
  postId
}: AddCommentFormProps): React.ReactElement => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const [commentText, setCommentText] = useState('');
  const [commentError, setCommentError] = useState('');

  const { loggedInUser } = useSelector((state: RootState) => state.user);
  const { error, pending } = useSelector((state: RootState) => state.question);

  const onCommentInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommentText(event.currentTarget.value);
  };

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!loggedInUser) return;

    dispatch(
      addCommentRequest({
        text: commentText,
        authorId: loggedInUser.id,
        datetime: Date.now(),
        postId: postId
      })
    );

    dispatch(
      editUserRequest(
        loggedInUser.id,
        'numberOfAnswers',
        loggedInUser.numberOfAnswers + 1
      )
    );
  };

  return (
    <Paper className={classes.formPaper}>
      <Box component="form" onSubmit={onFormSubmit}>
        <Grid container gap={2} direction="column">
          <Grid item xs={12}>
            <TextField
              className={classes.formInput}
              label="Add a comment"
              multiline
              rows={4}
              value={commentText}
              onChange={onCommentInputChange}
              variant="outlined"
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
    </Paper>
  );
};

export default AddCommentForm;
