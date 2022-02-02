import * as React from 'react';
import { makeStyles } from '@mui/styles';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import VerticalSpacer from '../atoms/VerticalSpacer';

const useStyles = makeStyles({
  footer: {
    height: '7rem',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    position: 'absolute',
    bottom: 0
  },
  footerText: {
    fontSize: '2.8rem !important',
    fontWeight: 'bold !important'
  }
});

const Footer = () => {
  const classes = useStyles();

  return (
    <>
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
          color={'black'}
        >
          HSemic
        </Typography>
      </Grid>
    </>
  );
};

export default Footer;
