import * as React from 'react';
import { lazy, Suspense, useState, useEffect } from 'react';

import CssBaseline from '@mui/material/CssBaseline';

import { Routes, Route } from 'react-router-dom';

import Navbar from './components/organisms/Navbar';
import HomePage from './pages/HomePage';
// import ProfilePage from './pages/ProfilePage';
// import QuestionPage from './pages/QuestionPage';
// import LoginPage from './pages/LoginPage';
// import RegisterPage from './pages/RegisterPage';

import RequireAuth from './components/molecules/RequireAuth';
import VerticalSpacer from './components/atoms/VerticalSpacer';
import Footer from './components/molecules/Footer';

import CircularProgress from './components/atoms/CircularProgress';
import { useSelector } from 'react-redux';
import { RootState } from './app/_redux/reducers/rootReducer';
import { io, Socket } from 'socket.io-client';
import { apiUrl } from './app/api/askIt';
import { receiveNotificationRequest } from './app/_redux/actions/notificationActions';

import { useDispatch } from 'react-redux';
import { NotificationApiData } from './app/_redux/reducers/notificationReducer/types';

const QuestionPage = lazy(() => import('./pages/QuestionPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));

const App = (): React.ReactElement => {
  const { isUserLoggedIn, loggedInUser } = useSelector(
    (state: RootState) => state.user
  );

  const [socket, setSocket] = useState<Socket | null>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isUserLoggedIn) {
      if (socket) {
        socket.close();
        setSocket(null);
      }
      return;
    }

    if (isUserLoggedIn && socket) return;

    const newSocket = io(apiUrl);

    newSocket.on('notification', (notification: NotificationApiData) => {
      dispatch(receiveNotificationRequest(notification));
    });

    loggedInUser && newSocket.emit('newUser', loggedInUser.id);

    setSocket(newSocket);
  }, [isUserLoggedIn, loggedInUser, dispatch, socket]);

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
            <Suspense fallback={<CircularProgress />}>
              <RequireAuth>
                <ProfilePage />
              </RequireAuth>
            </Suspense>
          }
        />
        <Route
          path="/login"
          element={
            <Suspense fallback={<CircularProgress />}>
              <LoginPage />
            </Suspense>
          }
        />
        <Route
          path="/register"
          element={
            <Suspense fallback={<CircularProgress />}>
              <RegisterPage />
            </Suspense>
          }
        />
        <Route
          path="/question/:id"
          element={
            <Suspense fallback={<CircularProgress />}>
              <QuestionPage socket={socket} />
            </Suspense>
          }
        />
        <Route
          path="profile/question/:id"
          element={
            <RequireAuth>
              <Suspense fallback={<CircularProgress />}>
                <QuestionPage socket={socket} />
              </Suspense>
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
