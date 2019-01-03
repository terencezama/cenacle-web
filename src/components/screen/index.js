import React from 'react';
import styles from './styles';
import { withStyles, Typography } from '@material-ui/core';
import { CAppBar, CDrawer } from '..';

const Screen = (props) => {
    const {classes} = props;
    return (
        <div className={classes.root}>
            <CAppBar title={props.match.url} />
            <CDrawer history={props.history} />
            <main className={classes.content}>
              {/* <div className={classes.toolbar} /> */}
              {props.children}
            </main>
          </div>
    );
}

export default withStyles(styles)(Screen);
