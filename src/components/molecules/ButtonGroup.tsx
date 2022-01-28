import * as React from 'react';

import Grid from '@mui/material/Grid';

interface ButtonGroupProps {
  children: JSX.Element;
}

const ButtonGroup = ({ children }: ButtonGroupProps): React.ReactElement => {
  return (
    <Grid item>
      <Grid container gap={1}>
        {children}
      </Grid>
    </Grid>
  );
};

export default ButtonGroup;
