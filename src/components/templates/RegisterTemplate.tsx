import * as React from 'react';

import Container from '@mui/material/Container';

import RegisterForm from '../molecules/RegisterForm';

const RegisterTemplate = (): React.ReactElement => {
  return (
    <Container maxWidth="md">
      <RegisterForm />
    </Container>
  );
};

export default RegisterTemplate;
