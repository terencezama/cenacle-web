import React, { Component } from 'react'
import styles from './styles';
import { withStyles, AppBar, Toolbar, IconButton, Typography, MenuItem, Menu, FormControlLabel, Switch } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import PropTypes from 'prop-types';
import { CStorage } from '../../lib';

class CAppBar extends Component {
  state = {
    auth: true,
    anchorEl: null,
    prod:CStorage.getItem('prod')
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  componentWillMount(){
      
    //   console.log('env',env);
    // CStorage.setItem('prod',true);
  }

  _toggleProdSwitch =()=>{
    const nprod = !this.state.prod;
    CStorage.setItem('prod',nprod);
    console.log(typeof nprod, nprod)
    this.setState({prod:!this.state.prod})
    
  }

  render() {
    const {classes, title} = this.props;
    const { auth, anchorEl } = this.state;
    
    return (
        <AppBar position="fixed" className={classes.appBar} color="primary">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            {title}
          </Typography>
          <FormControlLabel
          control={
            <Switch
              checked={this.state.prod}
              onChange={this._toggleProdSwitch}
              value="checkedB"
              color="secondary"
              
            />
          }
          classes={{
            label:classes.switchLabel
        }}
          label="production"
          
          
        />
        </Toolbar>
      </AppBar>
    )
  }
}

CAppBar.propTypes = {
    title: PropTypes.string.isRequired
}
export default withStyles(styles)(CAppBar);


