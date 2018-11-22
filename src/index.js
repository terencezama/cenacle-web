import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reducers from './state/reducers'
import App from './App';
import * as serviceWorker from './serviceWorker';
import firebase from 'firebase'
import * as admin from 'firebase-admin';
import theme from './theme'
import createSagaMiddleware from 'redux-saga'
import rootSagas from './state/sagas';
import { MuiThemeProvider } from '@material-ui/core/styles';

const sagaMiddleware = createSagaMiddleware();

var serviceAccount = require("./terence-838bd-firebase-adminsdk-w629d-782ff6ec28.json");
console.log(serviceAccount)
// Initialize Firebase
var config = {
  apiKey: "AIzaSyCfjcN3F2xol2dKO7xAl6iJKKaEVxuZgY4",
  authDomain: "terence-838bd.firebaseapp.com",
  databaseURL: "https://terence-838bd.firebaseio.com",
  projectId: "terence-838bd",
  storageBucket: "terence-838bd.appspot.com",
  messagingSenderId: "518913624530"
};
firebase.initializeApp(config);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://terence-838bd.firebaseio.com"
});

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
