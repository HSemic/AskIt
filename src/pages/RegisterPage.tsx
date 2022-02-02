import * as React from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../app/_redux/reducers/rootReducer';

import { validateEmail, validatePassword } from '../services/validationService';
import { useAuth } from '../components/providers/AuthProvider';

import RegisterTemplate from '../components/templates/RegisterTemplate';

const config = {
  formTitle: 'Sign Up',
  validationErrors: {
    email: 'The email address is invalid',
    password: 'Password needs to be at least 5 characters long'
  }
};

const RegisterPage = (): React.ReactElement => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const { pending, error } = useSelector((state: RootState) => state.user);

  const { loggedIn, register } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (email.length > 0 && !validateEmail(email))
      setEmailError(config.validationErrors.email);
    else setEmailError('');
  }, [email]);

  useEffect(() => {
    if (password.length > 0 && !validatePassword(password))
      setPasswordError(config.validationErrors.password);
    else setPasswordError('');
  }, [password]);

  useEffect(() => {
    if (loggedIn) navigate('/');
  }, [loggedIn, navigate]);

  const onRegisterFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validEmail = validateEmail(email);
    const validPassword = validatePassword(password);

    if (!validEmail) setEmailError(config.validationErrors.email);
    if (!validPassword) setPasswordError(config.validationErrors.password);

    if (validEmail && validPassword)
      register(firstName, lastName, email, password);
  };

  return (
    <RegisterTemplate
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      emailError={emailError}
      passwordError={passwordError}
      firstName={firstName}
      setFirstName={setFirstName}
      lastName={lastName}
      setLastName={setLastName}
      pending={pending}
      apiError={error}
      onRegisterFormSubmit={onRegisterFormSubmit}
    />
  );
};

export default RegisterPage;
