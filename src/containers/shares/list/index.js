import React, { Component } from 'react'
import styles from './styles';
import { Screen, FireTable } from '../../../components';
import { withStyles, Typography } from '@material-ui/core';
import { connect } from 'react-redux'
import { performAction } from '../../../state';
import { request, list, SHARE } from '../../../state/types';
import {withRouter} from 'react-router-dom';

class ShareListScreen extends Component {

  state = {
    headers: ['id', 'title', 'content', 'date'],
    rows: [],
    rowsPerPage:10,
    page:0,
    count:0,
    orderBy: 'title',
    order: 'asc',
  }

  static getDerivedStateFromProps(props, state) {
    const { listShare } = props;
    if (state.rows != listShare && listShare.response && !listShare.fetching) {
      const count = listShare.response.count;
      return {
        rows: listShare.response.docs,
        count,
        last: listShare.response.last
      };
    }

    return false;

  }

  componentDidMount() {
    this.props.listShareRequest({
      ...this.state
    })
  }


  // componentDidUpdate(prevProps){
  //   const {listShare} = this.props;
  //   if(prevProps.listShare != listShare && !listShare.fetching){

  //   }
  // }



  render() {
    const { match } = this.props;
    const { headers, rows, rowsPerPage, page, count, orderBy, order } = this.state

    return (
      <Screen match={match} >
        <FireTable
          headers={headers}
          rows={rows}
          rowsPerPage={rowsPerPage}
          page={page}
          count={count}
          orderBy={orderBy}
          order={order}
          onPageChange={value=>{
            this.setState({
              page:value,
            })
            this.props.listShareRequest({
              ...this.state,
              page:value
            })
          }}
          onRowsPerPageChange={value=>{
            console.log("onRowsPerPageChange",value);
          }}
          sort={(orderBy, order)=>{
            const nstate = {
              orderBy,
              order,
              page:0,
            }
            this.setState({
              ...nstate
            })
            this.props.listShareRequest({
              ...this.state,
              ...nstate
            })
          }}
          edit={row=>{
            this.props.history.push({
              pathname:`/shares/${row.id}`,
              state:{...row}
            })
          }}
          delete={row=>{

          }}
          notify={row=>{

          }}
          search={value=>{
            const nstate = {
              orderBy,
              order,
              page:0,
              search:value
            }
            this.setState({
              ...nstate
            })
            this.props.listShareRequest({
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
  listShare: state.share.list

})
const mapDispatchToProps = (dispatch) => ({
  listShareRequest: params => dispatch(performAction(params, request(list(SHARE))))

})
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ShareListScreen))

