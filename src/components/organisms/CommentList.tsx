import * as React from 'react';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import Comment from '../molecules/Comment';
import { CommentData } from '../../app/_redux/reducers/commentReducer/types';

interface CommentListProps {
  comments: CommentData[];
  loggedInUserId: string | undefined;
  loggedInUserNumberOfAnswers: number | undefined;
}

const CommentList = ({
  comments,
  loggedInUserId,
  loggedInUserNumberOfAnswers
}: CommentListProps): React.ReactElement => {
  return (
    <Grid container direction="column" gap={4}>
      <Grid item>
        <Typography variant="h5">Comments</Typography>
      </Grid>
      <Grid item container direction="column" rowGap={4}>
        {comments.map((comment) => {
          return (
            <Grid item>
              <Comment
                comment={comment}
                loggedInUserId={loggedInUserId}
                loggedInUserNumberOfAnswers={loggedInUserNumberOfAnswers}
              />
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
};

export default CommentList;
