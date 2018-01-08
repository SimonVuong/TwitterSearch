import io from 'socket.io-client';
const socket = io();
//note: in a more complicated app, reducers would typically involve a switch statement based on actions. general actions
//would exist in /client/src/general/actions whereas page specific actions would be in the folder of each page. To call
//more conventional server apis, I would fetch in actions with help from redux-thunk
export default (state = socket) => state;