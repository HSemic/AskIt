import * as React from 'react';

import Grid from '@mui/material/Grid';

interface ButtonGroupProps {
  children: JSX.Element;
  direction: 'row' | 'column';
  gap: number;
}

const ButtonGroup = ({
  children,
  direction,
  gap
}: ButtonGroupProps): React.ReactElement => {
  return (
    <Grid item>
      <Grid container gap={gap} flexDirection={direction}>
        {children}
      </Grid>
    </Grid>
  );
};

export default ButtonGroup;
