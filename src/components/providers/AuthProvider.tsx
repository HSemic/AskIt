import * as React from 'react';
import { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import {
  fetchUserByEmailAndValidateRequest,
  registerUserRequest,
  logout
} from '../../app/_redux/actions/userActions';

import { RootState } from '../../app/_redux/reducers/rootReducer';

interface AuthContext {
  loggedIn: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
  register: (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => void;
}

const authContext = React.createContext<AuthContext>({
  loggedIn: false,
  login: () => {
    return;
  },
  logout: () => {
    return;
  },
  register: () => {
    return;
  }
});

export function useAuth() {
  const dispatch = useDispatch();

  const { isUserLoggedIn } = useSelector((state: RootState) => state.user);

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(isUserLoggedIn);
  }, [isUserLoggedIn]);

  return {
    loggedIn,
    login(email: string, password: string) {
      dispatch(fetchUserByEmailAndValidateRequest(email, password));
    },
    logout() {
      dispatch(logout());
    },
    register(
      firstName: string,
      lastName: string,
      email: string,
      password: string
    ) {
      dispatch(
        registerUserRequest({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password
        })
      );
    }
  };
}

interface AuthProviderProps {
  children: JSX.Element;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const auth = useAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}
