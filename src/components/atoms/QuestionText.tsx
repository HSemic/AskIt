import * as React from 'react';

import Typography from '@mui/material/Typography';

interface QuestionTextProps {
  text: string;
  variant: QuestionContentVariant;
}

const QuestionText = ({
  text,
  variant
}: QuestionTextProps): React.ReactElement => {
  return (
    <Typography variant={variant === 'card' ? 'h6' : 'h1'} component="div">
      {text}
    </Typography>
  );
};

export default QuestionText;
