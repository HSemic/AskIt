import { socketTypes } from '../../actiontypes/socketTypes';
import { SocketState, SocketAction } from './types';

import { io } from 'socket.io-client';

import { apiUrl } from '../../../api/askIt';

const initialState: SocketState = {
  socket: null
};

const socketReducer = (
  state = initialState,
  action: SocketAction
): SocketState => {
  switch (action.type) {
    case socketTypes.CREATE_SOCKET:
      if (state.socket !== null)
        return {
          ...state
        };
      const newSocket = io(apiUrl);
      newSocket.on('firstEvent', (msg: string) => console.log(msg));
      return {
        ...state,
        socket: newSocket
      };
    case socketTypes.DESTROY_SOCKET:
      if (!state.socket || state.socket === null) {
        return {
          ...state
        };
      } else {
        state.socket.close();
        return {
          ...state,
          socket: null
        };
      }

    default:
      return {
        ...state
      };
  }
};

export default socketReducer;
