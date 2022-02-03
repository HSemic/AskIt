import * as React from 'react';

import Container from '@mui/material/Container';

import RegisterForm from '../molecules/RegisterForm';

interface RegisterTemplateProps {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  password2: string;
  setPassword2: React.Dispatch<React.SetStateAction<string>>;
  emailError: string;
  passwordError: string;
  password2Error: string;
  firstName: string;
  setFirstName: React.Dispatch<React.SetStateAction<string>>;
  lastName: string;
  setLastName: React.Dispatch<React.SetStateAction<string>>;
  pending: boolean;
  apiError: string | null;
  onRegisterFormSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const RegisterTemplate = ({
  email,
  setEmail,
  password,
  setPassword,
  password2,
  setPassword2,
  emailError,
  passwordError,
  password2Error,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  pending,
  apiError,
  onRegisterFormSubmit
}: RegisterTemplateProps): React.ReactElement => {
  return (
    <Container
      maxWidth="md"
      sx={{
        backgroundColor: 'rgba(255, 255, 255, 0.82)',
        borderRadius: '2rem',
        padding: '3rem 0'
      }}
    >
      <RegisterForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        password2={password2}
        setPassword2={setPassword2}
        emailError={emailError}
        passwordError={passwordError}
        password2Error={password2Error}
        firstName={firstName}
        setFirstName={setFirstName}
        lastName={lastName}
        setLastName={setLastName}
        pending={pending}
        apiError={apiError}
        onRegisterFormSubmit={onRegisterFormSubmit}
      />
    </Container>
  );
};

export default RegisterTemplate;
