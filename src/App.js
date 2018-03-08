import React, { Component } from 'react';
import {createStore,combineReducers,applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';


import './App.css';


const composeEnhancers = process.env.NODE_ENV !== 'production' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : compose;
const store = createStore(
  combineReducers({}),
  composeEnhancers(applyMiddleware(thunk))
);


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        
      </Provider>
    );
  }
}

export default App;
