import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styles from './styles'
import { withStyles, Drawer, List, ListItemIcon, ListItemText, ListItem } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';

import EventIcon from '@material-ui/icons/Event';
import ShareIcon from '@material-ui/icons/Share';
import NotesIcon from '@material-ui/icons/Notes';
import BookIcon from '@material-ui/icons/BookTwoTone';

export class CDrawer extends Component {

    _onItemClick = (obj, index,e) => {
        this.props.history.push({
            pathname: obj.action,

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
                            text: 'Verse Of The Day',
                            icon: <BookIcon />,
                            action: '/verse_of_the_day',
                            add:false
                        },
                        {
                            text: 'Shares',
                            icon: <ShareIcon />,
                            action: '/shares',
                            add:true
                        },
                        {
                            text: 'Events',
                            icon: <EventIcon />,
                            action: '/events',
                            add:true
                        },
                        {
                            text: 'Summaries',
                            icon: <NotesIcon />,
                            action: '/summaries',
                            add:true
                        },
                        
                    ].map((obj, index) => (
                        <ListItem button key={obj.text} onClick={(e) => this._onItemClick(obj, index,e)}>
                            <ListItemIcon>{obj.icon}</ListItemIcon>
                            <ListItemText primary={obj.text} />
                            {obj.add?(<IconButton className={classes.button} aria-label="Add" onClick={e=>{
                                e.stopPropagation();
                                this.props.history.push({
                                    pathname:`${obj.action}/add`
                                })
                            }}>
                                <AddIcon />
                            </IconButton>):undefined}
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
