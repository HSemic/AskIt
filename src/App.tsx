import * as React from 'react';

import CssBaseline from '@mui/material/CssBaseline';

import { Routes, Route } from 'react-router-dom';

import Navbar from './components/organisms/Navbar';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import QuestionPage from './pages/QuestionPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

import VerticalSpacer from './components/atoms/VerticalSpacer';

const App = (): React.ReactElement => {
  return (
    <>
      <CssBaseline />
      <Navbar />
      <VerticalSpacer />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route
          path="*"
          element={
            <main style={{ padding: '1rem' }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
      <VerticalSpacer />
    </>
  );
};

export default App;
