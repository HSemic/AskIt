import * as React from 'react';

import Typography from '@mui/material/Typography';
import { blue, red } from '@mui/material/colors';

interface FormMessageProps {
  type: 'info' | 'error';
  text: string;
  className?: string;
}

const FormMessage = ({
  type,
  text,
  className
}: FormMessageProps): React.ReactElement => {
  return (
    <Typography
      variant="body1"
      color={type === 'info' ? blue['700'] : red['700']}
      textAlign="center"
      className={className}
    >
      {text}
    </Typography>
  );
};

export default FormMessage;
