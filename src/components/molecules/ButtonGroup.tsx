import * as React from 'react';

interface ButtonGroupProps {
  children: JSX.Element;
}

const ButtonGroup = ({ children }: ButtonGroupProps): React.ReactElement => {
  return <div>{children}</div>;
};

export default ButtonGroup;
