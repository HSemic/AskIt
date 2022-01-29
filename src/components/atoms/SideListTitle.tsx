import * as React from 'react';

import Typography from '@mui/material/Typography';

interface SideListTitleProps {
  text: string;
}

const SideListTitle = ({ text }: SideListTitleProps): React.ReactElement => {
  return (
    <Typography
      variant="h6"
      component="div"
      sx={{ padding: '1.5rem 0 0 1.5rem' }}
    >
      {text}
    </Typography>
  );
};

export default SideListTitle;
