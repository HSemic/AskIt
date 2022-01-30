import * as React from 'react';
import { makeStyles } from '@mui/styles';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import CommentIcon from '@mui/icons-material/Comment';

const useStyles = makeStyles({
  commentIcon: {
    fontSize: '2rem !important',
    color: '#787C7E'
  },
  commentCount: {
    display: 'inline-block',
    color: '#787C7E'
  }
});

interface CommentCountProps {
  commentCount: number;
}

const CommentCount = ({
  commentCount
}: CommentCountProps): React.ReactElement => {
  const classes = useStyles();
  return (
    <Grid container alignItems="center" gap={0.4}>
      <CommentIcon className={classes.commentIcon} />{' '}
      <Typography
        className={classes.commentCount}
        component="span"
        variant="body2"
      >
        {`${commentCount} ${commentCount !== 1 ? 'comments' : 'comment'}`}
      </Typography>
    </Grid>
  );
};

export default CommentCount;
