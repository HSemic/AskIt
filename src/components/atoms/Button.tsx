import * as React from 'react';
import { makeStyles } from '@mui/styles';
import { Button as Btn } from '@mui/material';

const useStyles = makeStyles({
  button: {
    width: '10rem',
    borderRadius: '20px'
  }
});

interface ButtonProps {
  text: string;
  color: 'primary' | 'secondary';
}

const Button = ({ text, color }: ButtonProps): React.ReactElement => {
  const classes = useStyles();

  return (
    <Btn className={classes.button} variant="contained" color={color}>
      {text}
    </Btn>
  );
};

export default Button;
