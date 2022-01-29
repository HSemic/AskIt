import * as React from 'react';

import Typography from '@mui/material/Typography';

interface CommentTextProps {
  text: string;
}

const CommentText = ({ text }: CommentTextProps): React.ReactElement => {
  return <Typography variant="body1">{text}</Typography>;
};

export default CommentText;
