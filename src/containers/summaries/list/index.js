import React, { Component } from 'react'
import styles from './styles';
import { Screen, FireTable } from '../../../components';
import { withStyles, Typography } from '@material-ui/core';
import { connect } from 'react-redux'
import { performAction } from '../../../state';
import { request, list, SUMMARY, remove, NOTIFY } from '../../../state/types';
import { withRouter } from 'react-router-dom';
import { CStorage } from '../../../lib';

class SummaryListScreen extends Component {

  state = {
    headers: [  'date', 'desc', 'id'],
    rows: [],
    rowsPerPage: 10,
    page: 0,
    count: 0,
    orderBy: 'date',
    order: 'asc',
    delete: undefined
  }

  static getDerivedStateFromProps(props, state) {
    const { listSummary, deleteSummary } = props;

    if (listSummary.response && state.rows != listSummary.response.docs && !listSummary.fetching) {
      console.log('listSummary >>>');
      const count = listSummary.response.count;
      return {
        rows: listSummary.response.docs,
        count,
        last: listSummary.response.last
      };
    } else if (deleteSummary.response && state.delete != deleteSummary.response && !deleteSummary.fetching) {
      console.log('deleteSummary >>>');
      let nrows = state.rows;
      const deleteId = deleteSummary.response.id
      nrows = nrows.filter(el => el.id !== deleteId);
      props.listSummaryRequest({
        ...state
      })
      return {
        delete: deleteSummary.response,
        rows: nrows,
        count: nrows.length
      }

    }

    return false;

  }

  componentDidMount() {
    this.props.listSummaryRequest({
      ...this.state
    })
  }


  // componentDidUpdate(prevProps){
  //   const {listSummary} = this.props;
  //   if(prevProps.listSummary != listSummary && !listSummary.fetching){

  //   }
  // }



  render() {
    const { match } = this.props;
    const { headers, rows, rowsPerPage, page, count, orderBy, order } = this.state

    return (
      <Screen match={match} history={this.props.history}>
        <FireTable
          title={"Summaries"}
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
            this.props.listSummaryRequest({
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
            this.props.listSummaryRequest({
              ...this.state,
              ...nstate
            })
          }}
          edit={row => {
            this.props.history.push({
              pathname: `/summaries/${row.id}`,
              state: { ...row }
            })
          }}
          delete={row => {
            this.props.deleteSummaryRequest(row)
          }}
          notify={row => {
            // console.log('notify',row);
            const env = CStorage.getItem('prod') ? 'prod' : 'qa';
            let message = {
              to: `/topics/${env}_all`,
              data: {
                type: "notif",
                message: row.title,
                title: "Nouvelle Résumé"
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
            this.props.listSummaryRequest({
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
  listSummary: state.summary.list,
  deleteSummary: state.summary.delete

})
const mapDispatchToProps = (dispatch) => ({
  listSummaryRequest: params => dispatch(performAction(params, request(list(SUMMARY)))),
  deleteSummaryRequest: params => dispatch(performAction(params, request(remove(SUMMARY)))),
  notifyRequest: params => dispatch(performAction(params, request(NOTIFY)))

})
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SummaryListScreen))

