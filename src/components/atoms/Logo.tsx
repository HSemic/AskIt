import * as React from 'react';
import { makeStyles } from '@mui/styles';

import Typography from '@mui/material/Typography';

import logo from '../../images/logo2.jpg';

interface LogoProps {
  text: string;
}

const useStyles = makeStyles({
  logo: {
    fontSize: '3rem !important'
  }
});

const Logo = ({ text }: LogoProps): React.ReactElement => {
  const classes = useStyles();

  return (
    <>
      <img src={logo} alt="Logo" />

      <Typography
        className={classes.logo}
        color="black"
        variant="h6"
        component="div"
        sx={{ flexGrow: 1, marginLeft: '1rem' }}
      >
        {text}
      </Typography>
    </>
  );
};

export default Logo;