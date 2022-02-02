import * as React from 'react';
import { makeStyles } from '@mui/styles';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import VerticalSpacer from '../atoms/VerticalSpacer';

const useStyles = makeStyles({
  footer: {
    height: '20rem',
    backgroundColor: '#2D293D',
    position: 'absolute',
    bottom: 0
  },
  footerText: {
    fontSize: '4rem !important',
    fontWeight: 'bold !important'
  }
});

const Footer = () => {
  const classes = useStyles();

  return (
    <>
      <VerticalSpacer />
      <VerticalSpacer />
      <Grid
        container
        className={classes.footer}
        justifyContent="center"
        alignItems="center"
      >
        <Typography
          className={classes.footerText}
          variant="body1"
          color={'white'}
        >
          HSemic
        </Typography>
      </Grid>
    </>
  );
};

export default Footer;
