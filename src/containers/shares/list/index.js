import React, { Component } from 'react'
import styles from './styles';
import { Screen, FireTable } from '../../../components';
import { withStyles, Typography } from '@material-ui/core';


class ShareListScreen extends Component {

  render() {
    const { match } = this.props;
    return (
      <Screen match={match} >
        <FireTable />

      </Screen>
    )
  }
}

export default withStyles(styles)(ShareListScreen);