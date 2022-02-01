import * as React from 'react';

import TextField from '@mui/material/TextField';

interface ControlledInputProps {
  type?: 'password';
  label: string;
  value: string;
  errorMessage?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className: string;
  multiline?: boolean;
  rowNumber?: number;
}

const ControlledInput = ({
  type,
  label,
  value,
  errorMessage,
  onChange,
  className,
  multiline,
  rowNumber
}: ControlledInputProps): React.ReactElement => {
  return (
    <TextField
      className={className}
      label={label}
      type={type ? 'password' : 'text'}
      variant="outlined"
      error={errorMessage !== undefined && errorMessage.length > 0}
      helperText={errorMessage}
      value={value}
      onChange={onChange}
      multiline={multiline ? multiline : false}
      rows={multiline && rowNumber ? rowNumber : 1}
    />
  );
};

export default ControlledInput;
