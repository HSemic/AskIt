import * as React from 'react';

import Grid from '@mui/material/Grid';
import { CircularProgress as CP } from '@mui/material';

const CircularProgress = (): React.ReactElement => {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ height: '100%' }}
    >
      <Grid item>
        <CP color="warning" />
      </Grid>
    </Grid>
  );
};

export default CircularProgress;
