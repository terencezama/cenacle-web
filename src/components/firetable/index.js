import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Moment from 'react-moment';
import { TablePagination, TableSortLabel, Tooltip, IconButton, Toolbar, Typography, InputBase } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import NotifyIcon from '@material-ui/icons/Notifications';
import SearchIcon from '@material-ui/icons/Search';
import { fade } from '@material-ui/core/styles/colorManipulator';


const styles = theme => ({
  root: {
    width: '100%',
    // marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  actionCell: {
    textAlign: 'center'
  },
  tableCell: {
    height: '3em',
    lineHeight: '1em',
    width: 200,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    // whiteSpace:'nowrap'
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.primary.main, 0.75),
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color:'white'
  },
  inputRoot: {
    color: 'white',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
});



class FireTable extends Component {

  _handleChangePage = (event, page) => {
    // this.setState({ page });
    this.props.onPageChange(page);
  };

  _handleChangeRowsPerPage = event => {
    // this.setState({ rowsPerPage: event.target.value });
    this.props.onRowsPerPageChange(event.target.value);
  };

  _handleSort = header => {
    if (header == 'id') {
      return;
    }
    const { orderBy, order } = this.props;
    if (orderBy == header) {
      const norder = order == 'asc' ? 'desc' : 'asc';
      this.props.sort(orderBy, norder);
    } else {
      this.props.sort(header, 'asc');
    }
  }

  _deleteAction = row => {
    console.log('delete', row);
    this.props.delete(row);
  }
  _editAction = row => {
    console.log('edit', row);
    this.props.edit(row);
  }
  _notifyAction = row => {
    console.log('notify', row);
    this.props.notify(row);
  }

  _searchAction = e =>{
    console.log('search',e.target.value);
    if(this.props.search)this.props.search(e.target.value);

  }

  _renderAction = row => {
    return (
      <TableCell>
        <IconButton color="primary" onClick={() => this._deleteAction(row)}>
          <DeleteIcon />
        </IconButton>
        <IconButton onClick={() => this._editAction(row)} >
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => this._notifyAction(row)}>
          <NotifyIcon />
        </IconButton>
      </TableCell>

    )
  }

  render() {
    const { classes, headers, rows, page, rowsPerPage, count, order, orderBy } = this.props;
    return (
      <Paper className={classes.root}>
        <Toolbar>
          <Typography variant="h6" id="tableTitle" >
            Shares
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon color="white" />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              onChange={this._searchAction}

            />
          </div>
        </Toolbar>
        <div>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                {headers.map(header => {
                  const headerStr = header.charAt(0).toUpperCase() + header.substr(1)
                  return (
                    <TableCell
                      sortDirection={order} >
                      <Tooltip
                        title="Sort"
                        enterDelay={300}>
                        <TableSortLabel
                          active={orderBy === header}
                          direction={order}
                          onClick={() => { this._handleSort(header) }}
                        >
                          {headerStr}
                        </TableSortLabel>
                      </Tooltip>
                    </TableCell>
                  )
                })}
                <TableCell className={classes.actionCell} >{'Action'}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => {
                return (
                  <TableRow key={row.id}>
                    {headers.map(header => {
                      let value = row[header];
                      if (typeof value != 'string') {
                        if (value.constructor.name == 'Timestamp') {
                          return (<TableCell><Moment format="DD/MM/YYYY">{value.toDate()}</Moment></TableCell>)
                        } else {
                          value = value.toString()
                        }
                        value = value.toString()
                      }

                      return (
                        <TableCell>
                          <div className={classes.tableCell} >
                            {value}
                          </div>
                        </TableCell>)
                    })}
                    {this._renderAction(row)}
                  </TableRow>
                );
              })}

            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          count={count}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this._handleChangePage}
          onChangeRowsPerPage={this._handleChangeRowsPerPage}
        />
      </Paper>
    );
  }


}

FireTable.propTypes = {
  classes: PropTypes.object.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  orderBy: PropTypes.string,
  order: PropTypes.string,
  sort: PropTypes.func.isRequired,
  delete: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  notify: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
};

export default withStyles(styles)(FireTable);