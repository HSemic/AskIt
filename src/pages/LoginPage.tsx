import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../app/_redux/reducers/rootReducer';
import { useAuth } from '../components/providers/AuthProvider';

import LoginTemplate from '../components/templates/LoginTemplate';
import { validateEmail, validatePassword } from '../services/validationService';

import { fetchUnreadNotificationsRequest } from '../app/_redux/actions/notificationActions';

const config = {
  formTitle: 'Sign In',
  validationErrors: {
    email: 'The email address is invalid',
    password: 'Password needs to be at least 5 characters long'
  }
};

const LoginPage = (): React.ReactElement => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const dispatch = useDispatch();

  const { loggedInUser, pending, error, isUserLoggedIn } = useSelector(
    (state: RootState) => state.user
  );

  const { login } = useAuth();

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
    if (!loggedInUser) return;
    dispatch(fetchUnreadNotificationsRequest(loggedInUser.id));
    navigate('/');
  }, [isUserLoggedIn, navigate, dispatch]);

  const onLoginFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validEmail = validateEmail(email);
    const validPassword = validatePassword(password);

    if (!validEmail) setEmailError(config.validationErrors.email);
    if (!validPassword) setPasswordError(config.validationErrors.password);

    if (validEmail && validPassword) login(email, password);
  };

  return (
    <LoginTemplate
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      emailError={emailError}
      passwordError={passwordError}
      pending={pending}
      apiError={error}
      onLoginFormSubmit={onLoginFormSubmit}
    />
  );
};

export default LoginPage;
