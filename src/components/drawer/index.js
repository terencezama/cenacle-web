import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styles from './styles'
import { withStyles, Drawer, List, ListItemIcon, ListItemText, ListItem } from '@material-ui/core';

import EventIcon from '@material-ui/icons/Event';
import ShareIcon from '@material-ui/icons/Share';

export class CDrawer extends Component {


    render() {
        const { classes } = this.props;
        return (
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.toolbar} />
                <List>
                    {[
                        {
                            text:'Shares',
                            icon:<ShareIcon />
                        },
                        {
                            text:'Events',
                            icon:<EventIcon />
                        }
                    ].map((obj, index) => (
                        <ListItem button key={obj.text}>
                            <ListItemIcon>{obj.icon}</ListItemIcon>
                            <ListItemText primary={obj.text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CDrawer))
