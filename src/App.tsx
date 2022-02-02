import * as React from 'react';

import CssBaseline from '@mui/material/CssBaseline';

import { Routes, Route } from 'react-router-dom';

import Navbar from './components/organisms/Navbar';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import QuestionPage from './pages/QuestionPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

import RequireAuth from './components/molecules/RequireAuth';
import VerticalSpacer from './components/atoms/VerticalSpacer';
import Footer from './components/molecules/Footer';

// import { hashAPassword } from './services/passwordHashingService';

const App = (): React.ReactElement => {
  // console.log(hashAPassword('test'));

  return (
    <>
      <CssBaseline />
      <Navbar />
      <VerticalSpacer />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="profile"
          element={
            <RequireAuth>
              <ProfilePage />
            </RequireAuth>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/question/:id" element={<QuestionPage />} />
        <Route
          path="profile/question/:id"
          element={
            <RequireAuth>
              <QuestionPage />
            </RequireAuth>
          }
        />
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
      <Footer />
    </>
  );
};

export default App;
