import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import LoginForm from './Form/index'
import styles from './styles';
import { connect } from 'react-redux';
import action from '../../state/action';
import { request, LOGIN } from '../../state/types';
import {Redirect} from 'react-router-dom';

class LoginScreen extends Component {

  state = {
    redirect:false
  }
  _onSubmit = (values, { setSubmitting }) => {
    // setTimeout(() => {
    //   alert(JSON.stringify(values, null, 2));
    //   setSubmitting(false);
    // }, 400);
    this.props.loginRequest(values);
  }

  componentDidUpdate = (prevProps, prevState) => {
    if(prevProps.login != this.props.login && !this.props.login.fetching){
      setTimeout(() => {
        this.setState({redirect:true})
      }, 300);
      console.log('login')
    }
  };
  

  render() {
    const { classes } = this.props
    if(this.state.redirect){
      return(<Redirect
        to={{
          pathname: "/summaries",
          state: { from: this.props.location }
        }}
      />)
    }
    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Cenacle Du St Esprit
          </Typography>
            <LoginForm classes={classes} onSubmit={this._onSubmit} />

          </Paper>
        </main>
      </React.Fragment>
    )
  }
}


LoginScreen.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return {
    login:state.login
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loginRequest : params => dispatch(action(params,request(LOGIN)))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(LoginScreen)) ;