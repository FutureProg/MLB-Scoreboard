import React, { Component } from 'react';
import {createStore,applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import reducers from './Reducers';

import {Route,Switch} from 'react-router';
import createHistory from 'history/createBrowserHistory';
import {routerMiddleware, ConnectedRouter} from 'react-router-redux';

import Home from './Pages/Home';

import './App.css';


const composeEnhancers = process.env.NODE_ENV !== 'production' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : compose;
const history = createHistory();
const store = createStore(
  reducers,   
  composeEnhancers(applyMiddleware(thunk, routerMiddleware(history)))
  );

class App extends Component {
  render() {
    return (      
      <Provider store={store}>  
        <ConnectedRouter history={history}>
          <Switch> 
            <Route name="home" exact path="/" component={Home}/>                   
          </Switch>
        </ConnectedRouter>      
      </Provider>            
    );
  }
}

export default App;
