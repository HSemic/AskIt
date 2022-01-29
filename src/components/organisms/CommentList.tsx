import * as React from 'react';

import Grid from '@mui/material/Grid';

import Comment from '../molecules/Comment';

interface CommentListProps {
  comments: CommentData[];
}

const CommentList = ({ comments }: CommentListProps): React.ReactElement => {
  return (
    <Grid container direction="column" gap={2}>
      {comments.map((comment) => {
        return (
          <Grid item>
            <Comment {...comment} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default CommentList;
