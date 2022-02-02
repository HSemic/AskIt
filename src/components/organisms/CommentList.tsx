import * as React from 'react';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import Comment from '../molecules/Comment';
import { CommentData } from '../../app/_redux/reducers/commentReducer/types';
import FormMessage from '../atoms/FormMessage';

interface CommentListProps {
  comments: CommentData[];
  currentQuestionNumberOfComments: number;
  loggedInUserId: string | undefined;
  loggedInUserNumberOfAnswers: number | undefined;
  fallBackMessage: string;
}

const CommentList = ({
  comments,
  currentQuestionNumberOfComments,
  loggedInUserId,
  loggedInUserNumberOfAnswers,
  fallBackMessage
}: CommentListProps): React.ReactElement => {
  if (comments.length === 0)
    return <FormMessage type="info" text={fallBackMessage} />;

  return (
    <Grid container direction="column" gap={4}>
      <Grid item>
        <Typography variant="h6">Answers</Typography>
      </Grid>
      <Grid item container direction="column" rowGap={4}>
        {comments.map((comment, index) => {
          return (
            <Grid item key={index}>
              <Comment
                comment={comment}
                loggedInUserId={loggedInUserId}
                loggedInUserNumberOfAnswers={loggedInUserNumberOfAnswers}
                currentQuestionNumberOfComments={
                  currentQuestionNumberOfComments
                }
              />
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
};

export default CommentList;
