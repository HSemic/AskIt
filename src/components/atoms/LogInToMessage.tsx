import * as React from 'react';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { blue } from '@mui/material/colors';

interface LoginToMessageProps {
  text: string;
}

const LogInToMessage = ({ text }: LoginToMessageProps): React.ReactElement => {
  return (
    <Paper sx={{ padding: '2rem' }}>
      <Typography variant="body1" color={blue[600]}>
        {text}
      </Typography>
    </Paper>
  );
};

export default LogInToMessage;
