import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styles from './styles'
import { withStyles, Drawer, List, ListItemIcon, ListItemText, ListItem } from '@material-ui/core';

import EventIcon from '@material-ui/icons/Event';
import ShareIcon from '@material-ui/icons/Share';

export class CDrawer extends Component {

    _onItemClick = (obj,index) => {
        console.log('itemclick',obj,index);
        this.props.history.push({
            pathname:obj.action,
            
        })
    }

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
                            icon:<ShareIcon />,
                            action: '/shares'
                        },
                        {
                            text:'Events',
                            icon:<EventIcon />,
                            action: '/events'
                        }
                    ].map((obj, index) => (
                        <ListItem button key={obj.text} onClick={()=>this._onItemClick(obj,index)}>
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
