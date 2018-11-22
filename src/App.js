import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
// const Index = () => <h2>Home</h2>;

import firebase from 'firebase'
import { LoginScreen, MainScreen, UsersScreen, IndexScreen, ShareListScreen, ShareEditScreen } from './containers';
const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        authed ? (
          <Component {...props} />
        ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          )
      }
    />
  )
}


class App extends Component {

  state = {
    authed: true
  }
  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        console.log("logged in");
        this.setState({
          authed: true
        })
      } else {
        // No user is signed in.
        console.log("logged out");
        this.setState({
          authed: false
        })
      }
    });
  }
  render() {
    const { authed } = this.state;
    return (
      <Router>
        <div>
          <Route path="/login" component={LoginScreen} />
          
          <Route exact authed={authed} path='/users' component={UsersScreen} />
          <PrivateRoute exact authed={authed} path='/main' component={MainScreen} />
          <PrivateRoute exact authed={authed} path='/' component={IndexScreen} />
          <PrivateRoute exact authed={authed} path='/shares' component={ShareListScreen} />
          <PrivateRoute exact authed={authed} path='/shares/add' component={ShareEditScreen} />
          <PrivateRoute exact authed={authed} path='/shares/:shareId' component={ShareEditScreen} />
        </div>
      </Router>
    );
  }
}

export default App;
