import * as React from 'react';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';

const useStyles = makeStyles({
  date: {
    color: '#787C7E'
  }
});

interface MetaDateProps {
  date: string;
  variant: 'normal' | 'profile';
}

const MetaDate = ({ date, variant }: MetaDateProps): React.ReactElement => {
  const classes = useStyles();

  return (
    <Typography
      className={classes.date}
      variant={variant === 'normal' ? 'body2' : 'body1'}
      component="span"
    >
      {date}
    </Typography>
  );
};

export default MetaDate;