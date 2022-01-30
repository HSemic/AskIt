import * as React from 'react';
import { useSelector } from 'react-redux';

import { useLocation, Navigate } from 'react-router-dom';
import { RootState } from '../../app/_redux/reducers/rootReducer';

interface RequireAuthProps {
  children: JSX.Element;
}

const RequireAuth = ({ children }: RequireAuthProps): React.ReactElement => {
  const location = useLocation();

  const { loggedInUser } = useSelector((state: RootState) => state.user);

  return loggedInUser ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ path: location.pathname }} />
  );
};

export default RequireAuth;
