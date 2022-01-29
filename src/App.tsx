import * as React from 'react';

import CssBaseline from '@mui/material/CssBaseline';

import Navbar from './components/organisms/Navbar';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import QuestionPage from './pages/QuestionPage';

import VerticalSpacer from './components/atoms/VerticalSpacer';

const App = (): React.ReactElement => {
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
