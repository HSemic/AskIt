import * as React from 'react';

import Typography from '@mui/material/Typography';
import { blue, red } from '@mui/material/colors';

interface FormMessageProps {
  type: 'info' | 'error';
  text: string;
}

const FormMessage = ({ type, text }: FormMessageProps): React.ReactElement => {
  return (
    <Typography
      variant="body1"
      color={type === 'info' ? blue['700'] : red['700']}
      textAlign="center"
    >
      {text}
    </Typography>
  );
};

export default FormMessage;
