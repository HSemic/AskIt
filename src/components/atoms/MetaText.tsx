import * as React from 'react';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';

const useStyles = makeStyles({
  text: {
    color: '#787C7E'
  }
});

interface MetaTextProps {
  text: string;
  variant: 'normal' | 'profile';
}

const MetaText = ({ text, variant }: MetaTextProps): React.ReactElement => {
  const classes = useStyles();

  return (
    <Typography
      className={classes.text}
      variant={variant === 'normal' ? 'body2' : 'body1'}
      component="span"
    >
      {text}
    </Typography>
  );
};

export default MetaText;
