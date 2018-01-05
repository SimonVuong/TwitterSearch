import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import SearchPage from './searchPage/SearchPage';

export default class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <SearchPage />
      </Provider>
    )
  }
}