import * as React from 'react';
import { makeStyles } from '@mui/styles';
import { Button as Btn } from '@mui/material';

const useStyles = makeStyles({
  button: {
    width: '10rem'
  }
});

interface LinkButtonProps {
  text: string;
  color: 'primary' | 'secondary';
  href?: 'string';
}

const LinkButton = ({ text, color }: LinkButtonProps): React.ReactElement => {
  const classes = useStyles();

  return (
    <Btn className={classes.button} variant="contained" color={color}>
      {text}
    </Btn>
  );
};

export default LinkButton;
