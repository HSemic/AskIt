import * as React from 'react';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  spacer: {
    height: '10rem'
  }
});

const VerticalSpacer = (): React.ReactElement => {
  const classes = useStyles();

  return <div className={classes.spacer} />;
};

export default VerticalSpacer;
