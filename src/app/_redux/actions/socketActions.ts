import { socketTypes } from '../actiontypes/socketTypes';
import { CreateSocket, DestroySocket } from '../reducers/socketReducer/types';

export const createSocket = (): CreateSocket => ({
  type: socketTypes.CREATE_SOCKET
});

export const destroySocket = (): DestroySocket => ({
  type: socketTypes.DESTROY_SOCKET
});
