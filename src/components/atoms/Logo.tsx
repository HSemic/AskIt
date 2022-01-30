import * as React from 'react';
import { makeStyles } from '@mui/styles';

import Typography from '@mui/material/Typography';

import { Link } from 'react-router-dom';

interface LogoProps {
  text: string;
  imgSrc: string;
}

const useStyles = makeStyles({
  logo: {
    fontSize: '3rem !important'
  }
});

const Logo = ({ text, imgSrc }: LogoProps): React.ReactElement => {
  const classes = useStyles();

  return (
    <>
      <img src={imgSrc} alt="Logo" />

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
