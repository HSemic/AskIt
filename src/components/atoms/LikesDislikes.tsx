import * as React from 'react';
import { makeStyles } from '@mui/styles';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import ThumbUp from '@mui/icons-material/ThumbUp';
import ThumbDown from '@mui/icons-material/ThumbDown';

const useStyles = makeStyles({
  commentIcon: {
    fontSize: '2rem !important',
    color: '#787C7E'
  },
  text: {
    display: 'inline-block',
    color: '#787C7E'
  }
});

interface LikesDislikesProps {
  text: string;
  variant: 'likes' | 'dislikes';
}

const LikesDislikes = ({
  text,
  variant
}: LikesDislikesProps): React.ReactElement => {
  const classes = useStyles();
  return (
    <Grid container alignItems="center" gap={0.4} component="span">
      {variant === 'likes' ? (
        <ThumbUp className={classes.commentIcon} />
      ) : (
        <ThumbDown className={classes.commentIcon} />
      )}{' '}
      <Typography className={classes.text} component="span" variant="body2">
        {`${text} ${variant}`}
      </Typography>
    </Grid>
  );
};

export default LikesDislikes;
