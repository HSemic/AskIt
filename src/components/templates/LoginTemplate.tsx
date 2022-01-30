import * as React from 'react';

import Container from '@mui/material/Container';

import LoginForm from '../molecules/LoginForm';

const LoginTemplate = (): React.ReactElement => {
  return (
    <Container maxWidth="md">
      <LoginForm />
    </Container>
  );
};

export default LoginTemplate;
