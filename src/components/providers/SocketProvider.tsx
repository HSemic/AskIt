import * as React from 'react';
import { useState, useEffect, createContext } from 'react';
import { io, Socket } from 'socket.io-client';

import { useSelector } from 'react-redux';
import { RootState } from '../../app/_redux/reducers/rootReducer';
import { apiUrl } from '../../app/api/askIt';

interface SocketContext {
  socket: Socket | null;
}

const socketContext = createContext<SocketContext>({
  socket: null
});

export function useSocket() {
  const [socket, setSocket] = useState<Socket | null>(null);

  const { isUserLoggedIn, loggedInUser } = useSelector(
    (state: RootState) => state.user
  );

  const [isUserLoggedInPrev, setIsUserLoggedInPrev] = useState(isUserLoggedIn);

  useEffect(() => {
    if (isUserLoggedInPrev === isUserLoggedIn) return;

    setIsUserLoggedInPrev(isUserLoggedIn);

    if (!isUserLoggedIn) {
      if (socket) {
        socket.close();
        setSocket(null);
      }
      return;
    }

    if (isUserLoggedIn && socket) return;

    console.log(isUserLoggedIn);

    const newSocket = io(apiUrl);

    loggedInUser && newSocket.emit('newUser', loggedInUser.id);

    setSocket(newSocket);
  }, [isUserLoggedIn]);

  return { socket };
}

interface SocketProviderProps {
  children: JSX.Element;
}

export function SocketProvider({ children }: SocketProviderProps) {
  const socket = useSocket();

  return (
    <socketContext.Provider value={socket}>{children}</socketContext.Provider>
  );
}

export default SocketProvider;
