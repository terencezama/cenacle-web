import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reducers from './state/reducers'
import App from './App';
import * as serviceWorker from './serviceWorker';
import theme from './theme'
import createSagaMiddleware from 'redux-saga'
import rootSagas from './state/sagas';
import { MuiThemeProvider } from '@material-ui/core/styles';
import './lib/firebase'
const sagaMiddleware = createSagaMiddleware();




const store = createStore(reducers, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSagas);

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
