import * as React from 'react';
import { makeStyles } from '@mui/styles';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import { Link } from 'react-router-dom';

interface LogoProps {
  text: string;
  imgSrc: string;
}

const useStyles = makeStyles({
  logo: {
    fontSize: '3rem !important'
  },
  logoLink: {
    textDecoration: 'none'
  },
  wrapper: {
    flexGrow: 1
  }
});

const Logo = ({ text, imgSrc }: LogoProps): React.ReactElement => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <Link to="/" className={classes.logoLink}>
        <Grid container gap={1}>
          <Grid item>
            <img src={imgSrc} alt="Logo" />
          </Grid>
          <Grid item>
            <Typography
              className={classes.logo}
              color="black"
              variant="h6"
              component="div"
            >
              {text}
            </Typography>
          </Grid>
        </Grid>
      </Link>
    </div>
  );
};

export default Logo;
