import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import SearchPage from './searchPage/SearchPage';

export default () => (
  <Provider store={store}>
    <SearchPage />
  </Provider>
)