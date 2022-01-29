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

interface MetaAuthorProps {
  author: string;
  variant: QuestionContentVariant | 'profile';
}

const MetaAuthor = ({
  author,
  variant
}: MetaAuthorProps): React.ReactElement => {
  const classes = useStyles();

  return (
    <Typography
      className={variant === 'card' ? classes.authorCard : classes.author}
      variant={variant === 'profile' ? 'body1' : 'body2'}
      component="span"
    >
      {variant === 'card' ? `Posted by ${author}` : author}
    </Typography>
  );
};

export default MetaAuthor;
