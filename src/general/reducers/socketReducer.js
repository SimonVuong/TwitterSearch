import io from 'socket.io-client';

//todo url via env var
export const socket = (state =  io('http://localhost:8080')) => state;