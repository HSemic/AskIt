import * as React from 'react';
import { useEffect, useState } from 'react';

import ProfileTemplate from '../components/templates/ProfileTemplate';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/_redux/reducers/rootReducer';
import {
  clearQuestions,
  fetchQuestionListRequest
} from '../app/_redux/actions/questionActions';
import { editUserRequest } from '../app/_redux/actions/userActions';
import { validateEmail, validatePassword } from '../services/validationService';

const ProfilePage = (): React.ReactElement => {
  const { loggedInUser, error, pending } = useSelector(
    (state: RootState) => state.user
  );

  const { questionList } = useSelector((state: RootState) => state.question);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [passwordFirst, setPasswordFirst] = useState('');
  const [passwordSecond, setPasswordSecond] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordFirstError, setPasswordFirstError] = useState('');
  const [passwordSecondError, setPasswordSecondError] = useState('');

  const [page, setPage] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    // if (!questionList || questionList.length === 0)
    if (loggedInUser) dispatch(fetchQuestionListRequest(1, loggedInUser.id));

    return function cleanup() {
      dispatch(clearQuestions());
    };
  }, []);

  useEffect(() => {
    if (!loggedInUser) return;

    dispatch(fetchQuestionListRequest(page, loggedInUser?.id));
  }, [page]);

  const incrementPage = () => {
    setPage(page + 1);
  };

  const onFirstNameEditSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!loggedInUser) return;

    dispatch(editUserRequest(loggedInUser.id, 'firstName', firstName));

    setFirstName('');
  };

  const onLastNameEditSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!loggedInUser) return;

    dispatch(editUserRequest(loggedInUser.id, 'lastName', lastName));

    setLastName('');
  };

  const onEmailEditSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!loggedInUser) return;

    const validEmail = validateEmail(email);

    if (!validEmail) {
      setEmailError('Incorrect email address');
      return;
    }

    dispatch(editUserRequest(loggedInUser.id, 'email', email));

    setEmail('');
  };

  const onPasswordEditSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!loggedInUser) return;

    const validPasswordFirst = validatePassword(passwordFirst);
    const validPasswordSecond = validatePassword(passwordSecond);

    if (!validPasswordFirst) {
      setPasswordFirstError('Password needs to be longer that 5 characters');
      return;
    }

    if (!validPasswordSecond) {
      setPasswordSecondError('Password needs to be longer that 5 characters');
      return;
    }

    if (passwordFirst !== passwordSecond) {
      setPasswordSecondError('Passwords do not match');
      return;
    }

    dispatch(editUserRequest(loggedInUser.id, 'password', passwordFirst));

    setPasswordFirst('');
    setPasswordSecond('');
  };

  if (!loggedInUser) return <></>;

  return (
    <ProfileTemplate
      userData={loggedInUser}
      questions={questionList}
      page={page}
      firstName={firstName}
      setFirstName={setFirstName}
      lastName={lastName}
      setLastName={setLastName}
      email={email}
      setEmail={setEmail}
      passwordFirst={passwordFirst}
      setPasswordFirst={setPasswordFirst}
      passwordSecond={passwordSecond}
      setPasswordSecond={setPasswordSecond}
      emailError={emailError}
      passwordFirstError={passwordFirstError}
      passwordSecondError={passwordSecondError}
      pending={pending}
      apiError={error}
      onFirstNameEditSubmit={onFirstNameEditSubmit}
      onLastNameEditSubmit={onLastNameEditSubmit}
      onEmailEditSubmit={onEmailEditSubmit}
      onPasswordEditSubmit={onPasswordEditSubmit}
      incrementPage={incrementPage}
    />
  );
};

export default ProfilePage;
