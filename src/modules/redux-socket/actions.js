import { SOCKET_EMIT } from './types';

export const socketEmit = (eventName, payload) => console.log(eventName) || ({ type: SOCKET_EMIT, eventName, payload });
