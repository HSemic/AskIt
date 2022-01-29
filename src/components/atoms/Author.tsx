import * as React from 'react';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';

const useStyles = makeStyles({
  authorCard: {
    color: '#787C7E'
  },
  author: {
    fontWeight: '500 !important'
  }
});

interface Author {
  author: string;
  variant: QuestionContentVariant | 'profile';
}

const Author = ({ author, variant }: Author): React.ReactElement => {
  const classes = useStyles();

  return (
    <Typography
      className={variant === 'card' ? classes.authorCard : classes.author}
      variant="body2"
      component="span"
    >
      {variant === 'card' ? `Posted by ${author}` : author}
    </Typography>
  );
};

export default Author;
