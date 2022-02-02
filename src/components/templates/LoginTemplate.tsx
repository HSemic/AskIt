import * as React from 'react';

import Container from '@mui/material/Container';

import LoginForm from '../molecules/LoginForm';

interface LoginTemplateProps {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  emailError: string;
  passwordError: string;
  pending: boolean;
  apiError: string | null;
  onLoginFormSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const LoginTemplate = ({
  email,
  setEmail,
  password,
  setPassword,
  emailError,
  passwordError,
  pending,
  apiError,
  onLoginFormSubmit
}: LoginTemplateProps): React.ReactElement => {
  return (
    <Container
      maxWidth="md"
      sx={{
        backgroundColor: 'rgba(255, 255, 255, 0.82)',
        borderRadius: '2rem',
        padding: '3rem 0'
      }}
    >
      <LoginForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        emailError={emailError}
        passwordError={passwordError}
        pending={pending}
        apiError={apiError}
        onLoginFormSubmit={onLoginFormSubmit}
      />
    </Container>
  );
};

export default LoginTemplate;
