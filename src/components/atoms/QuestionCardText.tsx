import * as React from 'react';

import Typography from '@mui/material/Typography';

interface QuestionCardTextProps {
  text: string;
}

const QuestionCardText = ({
  text
}: QuestionCardTextProps): React.ReactElement => {
  return (
    <Typography variant="h6" component="div">
      {text}
    </Typography>
  );
};

export default QuestionCardText;
