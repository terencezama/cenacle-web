import React, { Component } from 'react'
import { withStyles, Typography } from '@material-ui/core';
import styles from './styles';
class NoMatch extends Component {
  render() {
    return (
      <div>
        <Typography>{'9 Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.”'}</Typography>
      </div>
    )
  }
}

export default withStyles(styles)(NoMatch)
