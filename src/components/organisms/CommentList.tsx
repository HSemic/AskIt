import * as React from 'react';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import Comment from '../molecules/Comment';
import { CommentData } from '../../app/_redux/reducers/commentReducer/types';

interface CommentListProps {
  comments: CommentData[];
}

const CommentList = ({ comments }: CommentListProps): React.ReactElement => {
  return (
    <Grid container direction="column" gap={4}>
      <Grid item>
        <Typography variant="h5">Comments</Typography>
      </Grid>
      <Grid item>
        {comments.map((comment) => {
          return (
            <Grid item>
              <Comment {...comment} />
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
};

export default CommentList;
