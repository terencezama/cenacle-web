import React, { Component } from 'react'
import styles from './styles';
import { CAppBar, CDrawer } from '../../../components';
import { withStyles } from '@material-ui/core';


class ShareEditScreen extends Component {

  render() {
    const {classes} = this.props;    
    return (
      <div className={classes.root}>
         <CAppBar title={this.props.match.url} />
         <CDrawer />
      </div>
    )
  }
}

export default withStyles(styles)(ShareEditScreen);