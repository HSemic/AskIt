import * as React from 'react';
import { IconButton as IcnBtn } from '@mui/material';

interface IconButtonProps {
  children: JSX.Element;
}

const IconButton = ({ children }: IconButtonProps): React.ReactElement => {
  return <IcnBtn>{children}</IcnBtn>;
};

export default IconButton;
