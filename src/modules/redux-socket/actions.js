import { SOCKET_EMIT } from './types';

export const socketEmit = (eventName, payload) => ({ type: SOCKET_EMIT, eventName, payload });
