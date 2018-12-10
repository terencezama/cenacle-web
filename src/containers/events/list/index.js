import React, { Component } from 'react'
import styles from './styles';
import { Screen, FireTable } from '../../../components';
import { withStyles, Typography } from '@material-ui/core';
import { connect } from 'react-redux'
import { performAction } from '../../../state';
import { request, list, EVENT, remove, NOTIFY } from '../../../state/types';
import { withRouter } from 'react-router-dom';
import { CStorage } from '../../../lib';

class EventListScreen extends Component {

  state = {
    headers: [ 'title', 'desc', 'contact', 'date', 'time', 'location', 'id'],
    rows: [],
    rowsPerPage: 10,
    page: 0,
    count: 0,
    orderBy: 'title',
    order: 'asc',
    delete: undefined
  }

  static getDerivedStateFromProps(props, state) {
    const { listEvent, deleteEvent } = props;

    if (listEvent.response && state.rows != listEvent.response.docs && !listEvent.fetching) {
      console.log('listEvent >>>');
      const count = listEvent.response.count;
      return {
        rows: listEvent.response.docs,
        count,
        last: listEvent.response.last
      };
    } else if (deleteEvent.response && state.delete != deleteEvent.response && !deleteEvent.fetching) {
      console.log('deleteEvent >>>');
      let nrows = state.rows;
      const deleteId = deleteEvent.response.id
      nrows = nrows.filter(el => el.id !== deleteId);
      props.listEventRequest({
        ...state
      })
      return {
        delete: deleteEvent.response,
        rows: nrows,
        count: nrows.length
      }

    }

    return false;

  }

  componentDidMount() {
    this.props.listEventRequest({
      ...this.state
    })
  }


  // componentDidUpdate(prevProps){
  //   const {listEvent} = this.props;
  //   if(prevProps.listEvent != listEvent && !listEvent.fetching){

  //   }
  // }



  render() {
    const { match } = this.props;
    const { headers, rows, rowsPerPage, page, count, orderBy, order } = this.state

    return (
      <Screen match={match} history={this.props.history}>
        <FireTable
          title={"Events"}
          headers={headers}
          rows={rows}
          rowsPerPage={rowsPerPage}
          page={page}
          count={count}
          orderBy={orderBy}
          order={order}
          onPageChange={value => {
            this.setState({
              page: value,
            })
            this.props.listEventRequest({
              ...this.state,
              page: value
            })
          }}
          onRowsPerPageChange={value => {
            console.log("onRowsPerPageChange", value);
          }}
          sort={(orderBy, order) => {
            const nstate = {
              orderBy,
              order,
              page: 0,
            }
            this.setState({
              ...nstate
            })
            this.props.listEventRequest({
              ...this.state,
              ...nstate
            })
          }}
          edit={row => {
            this.props.history.push({
              pathname: `/events/${row.id}`,
              state: { ...row }
            })
          }}
          delete={row => {
            this.props.deleteEventRequest(row)
          }}
          notify={row => {
            // console.log('notify',row);
            const env = CStorage.getItem('prod') ? 'prod' : 'qa';
            let message = {
              to: `/topics/${env}_all`,
              data: {
                type: "notif",
                message: row.title,
                title: "Nouvelle Évenement"
              },
              priority: "high"
            }
            this.props.notifyRequest(message);
          }}
          search={value => {
            const nstate = {
              orderBy,
              order,
              page: 0,
              search: value
            }
            this.setState({
              ...nstate
            })
            this.props.listEventRequest({
              ...this.state,
              ...nstate
            })
          }}
        />

      </Screen>
    )
  }
}

const mapStateToProps = (state) => ({
  listEvent: state.event.list,
  deleteEvent: state.event.delete

})
const mapDispatchToProps = (dispatch) => ({
  listEventRequest: params => dispatch(performAction(params, request(list(EVENT)))),
  deleteEventRequest: params => dispatch(performAction(params, request(remove(EVENT)))),
  notifyRequest: params => dispatch(performAction(params, request(NOTIFY)))

})
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EventListScreen))

