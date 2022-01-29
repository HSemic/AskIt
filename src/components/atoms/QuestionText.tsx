import * as React from 'react';

import Typography from '@mui/material/Typography';

interface QuestionTextProps {
  text: string;
  variant: 'card' | 'page';
}

const QuestionText = ({
  text,
  variant
}: QuestionTextProps): React.ReactElement => {
  return variant === 'card' ? (
    <Typography variant="h6" component="div">
      {text}
    </Typography>
  ) : (
    <Typography variant="h1" component="div">
      {text}
    </Typography>
  );
};

export default QuestionText;
