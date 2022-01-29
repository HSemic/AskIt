import * as React from 'react';
import { useEffect } from 'react';

import CssBaseline from '@mui/material/CssBaseline';

import Navbar from './components/organisms/Navbar';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import QuestionPage from './pages/QuestionPage';

import VerticalSpacer from './components/atoms/VerticalSpacer';

import { fetchUserListRequest } from './app/_redux/actions/userActions';
import { RootState } from './app/_redux/reducers/rootReducer';
import { useDispatch, useSelector } from 'react-redux';

const App = (): React.ReactElement => {
  const dispatch = useDispatch();
  const { pending, userList, error } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    dispatch(fetchUserListRequest());
  }, []);

  console.log(userList);

  return (
    <>
      <CssBaseline />
      <Navbar />
      <VerticalSpacer />
      <HomePage />
      <VerticalSpacer />
    </>
  );
};

export default App;
