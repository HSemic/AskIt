import * as React from 'react';
import { Button as Btn } from '@mui/material';
import { LoadingButton } from '@mui/lab';

interface ButtonProps {
  className: string;
  type?: 'button' | 'reset' | 'submit';
  variant?: 'contained' | 'outlined' | 'text';
  color: 'primary' | 'secondary';
  pending: boolean;
  children: string;
}

const Button = ({
  className,
  type,
  variant,
  color,
  pending,
  children
}: ButtonProps): React.ReactElement => {
  return !pending ? (
    <Btn
      className={className}
      type={type || 'button'}
      variant={variant || 'outlined'}
      color={color}
    >
      {children}
    </Btn>
  ) : (
    <LoadingButton
      className={className}
      loading
      variant={variant || 'outlined'}
    />
  );
};

export default Button;
