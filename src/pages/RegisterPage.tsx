import * as React from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../app/_redux/reducers/rootReducer';

import { validateEmail, validatePassword } from '../services/validationService';
import { useAuth } from '../components/providers/AuthProvider';

import RegisterTemplate from '../components/templates/RegisterTemplate';

import { useDispatch } from 'react-redux';

const config = {
  formTitle: 'Sign Up',
  validationErrors: {
    email: 'The email address is invalid',
    passwordLength: 'Password needs to be at least 5 characters long',
    passwordMatch: 'Passwords must match!'
  }
};

const RegisterPage = (): React.ReactElement => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [password2, setPassword2] = useState('');
  const [password2Error, setPassword2Error] = useState('');

  const { pending, error } = useSelector((state: RootState) => state.user);

  const { loggedIn, register } = useAuth();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    if (email.length > 0 && !validateEmail(email))
      setEmailError(config.validationErrors.email);
    else setEmailError('');
  }, [email]);

  useEffect(() => {
    if (password.length > 0 && !validatePassword(password))
      setPasswordError(config.validationErrors.passwordLength);
    else setPasswordError('');
  }, [password]);

  useEffect(() => {
    if (password2.length > 0 && !validatePassword(password2))
      setPassword2Error(config.validationErrors.passwordLength);
    else setPassword2Error('');
  }, [password2]);

  useEffect(() => {
    if (password.length > 0 && password2.length > 0 && password !== password2) {
      setPasswordError(config.validationErrors.passwordMatch);
      setPassword2Error(config.validationErrors.passwordMatch);
    } else {
      setPasswordError('');
      setPassword2Error('');
    }
  }, [password, password2]);

  useEffect(() => {
    if (loggedIn) {
      navigate('/');
    }
  }, [loggedIn, navigate, dispatch]);

  const onRegisterFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validEmail = validateEmail(email);
    const validPassword = validatePassword(password);
    const validPassword2 = validatePassword(password2);

    if (!validEmail) setEmailError(config.validationErrors.email);
    if (!validPassword)
      setPasswordError(config.validationErrors.passwordLength);
    if (!validPassword2)
      setPassword2Error(config.validationErrors.passwordLength);

    const passwordsMatch = password === password2;

    if (!passwordsMatch) {
      setPasswordError(config.validationErrors.passwordMatch);
    }

    if (validEmail && validPassword && passwordsMatch)
      register(firstName, lastName, email, password);
  };

  return (
    <RegisterTemplate
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
      apiError={error}
      onRegisterFormSubmit={onRegisterFormSubmit}
    />
  );
};

export default RegisterPage;
