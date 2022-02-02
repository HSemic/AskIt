import { socketTypes } from '../../actiontypes/socketTypes';
import { Socket } from 'socket.io-client';

export interface SocketState {
  socket: Socket | null;
}

export interface CreateSocket {
  type: typeof socketTypes.CREATE_SOCKET;
}

export interface DestroySocket {
  type: typeof socketTypes.DESTROY_SOCKET;
}

export type SocketAction = CreateSocket | DestroySocket;
