import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import styles from './styles';
import UserTable from './table';
class UsersScreen extends Component {
  render() {
      const {classes} = this.props;

    return (
        <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={3}>
            <Paper className={classes.paper}>side menu will be here</Paper>
          </Grid>
          <Grid item xs={9}>
            <UserTable />
          </Grid>
        </Grid>
      </div>
    )
  }
}
export default withStyles(styles)(UsersScreen);
