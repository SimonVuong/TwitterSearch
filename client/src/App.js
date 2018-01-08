import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import store from './store';
import SearchPage from './searchPage/SearchPage';
import HomePage from './homePage/HomePage';

export default class App extends Component {

  componentDidMount () {
    window.addEventListener("beforeunload", (e) => {
      store.getState().socket.close();  
    });
  }

  render () {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Route exact path="/" component={HomePage} />
            <Route path="/search" component={SearchPage} />
          </div>
        </Router>
      </Provider>
    )
  }
}