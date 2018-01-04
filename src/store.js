import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import rootReducer from './rootReducer';

const logger = createLogger({
  collapsed: true
});

//todo: remove logger when not in dev
let store = createStore(rootReducer, applyMiddleware(logger));

export default store;