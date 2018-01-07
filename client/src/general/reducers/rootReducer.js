import { combineReducers } from 'redux';
import { socket } from './socketReducer';

export default combineReducers({
  //put socket into redux store since it should be accessable throughout entire app  
  socket
});

