import * as React from 'react';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';

const useStyles = makeStyles({
  divider: {
    color: '#787C7E'
  }
});

interface AuthorDateDividerProps {
  variant: QuestionContentVariant;
  cardDivider: string;
  pageDivider: string;
}

const AuthorDateDivider = ({
  variant,
  cardDivider,
  pageDivider
}: AuthorDateDividerProps): React.ReactElement => {
  const classes = useStyles();

  return (
    <Typography className={classes.divider} variant="body2" component="span">
      {variant === 'card' ? cardDivider : pageDivider}
    </Typography>
  );
};

export default AuthorDateDivider;
