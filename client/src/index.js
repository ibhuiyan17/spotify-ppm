import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';

// eslint-disable-next-line import/no-unresolved
import App from './Components/app';
import * as serviceWorker from './serviceWorker';
import tokensReducer from './redux/reducers/tokens-reducer';
import startButtonReducer from './redux/reducers/start-button-reducer';

const allReducers = combineReducers({
  tokens: tokensReducer,
  startButton: startButtonReducer,
});

const store = createStore(
  allReducers,
  window.devToolsExtension && window.devToolsExtension(),
);
console.log(store.getState());

const updateTokensAction = {
  type: 'updateTokens',
  payload: {
    access_token: 'access',
    refresh_token: 'refresh',
  },
};
store.dispatch(updateTokensAction);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
