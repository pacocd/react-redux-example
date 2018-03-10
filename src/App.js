import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import './App.css';
import IndexPage from './components/IndexPage';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <IndexPage />
      </Provider>
    );
  }
}

export default App;
