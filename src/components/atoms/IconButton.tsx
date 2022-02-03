import * as React from 'react';
import { IconButton as IcnBtn } from '@mui/material';

interface IconButtonProps {
  children: JSX.Element;
  onClick?: (() => void) | ((event: React.MouseEvent<HTMLElement>) => void);
}

const IconButton = ({
  children,
  onClick
}: IconButtonProps): React.ReactElement => {
  return <IcnBtn onClick={onClick}>{children}</IcnBtn>;
};

export default IconButton;
