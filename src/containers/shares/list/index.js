import React, { Component } from 'react'
import styles from './styles';
import { Screen, FireTable } from '../../../components';
import { withStyles, Typography } from '@material-ui/core';
import { connect } from 'react-redux'
import { performAction } from '../../../state';
import { request, list, SHARE, remove, NOTIFY } from '../../../state/types';
import {withRouter} from 'react-router-dom';
import { CStorage } from '../../../lib';

class ShareListScreen extends Component {

  state = {
    headers: ['id', 'title', 'content', 'date'],
    rows: [],
    rowsPerPage:10,
    page:0,
    count:0,
    orderBy: 'title',
    order: 'asc',
    delete: undefined
  }

  static getDerivedStateFromProps(props, state) {
    const { listShare, deleteShare } = props;

    if (listShare.response && state.rows != listShare.response.docs && !listShare.fetching) {
      console.log('listshare >>>');
      const count = listShare.response.count;
      return {
        rows: listShare.response.docs,
        count,
        last: listShare.response.last
      };
    }else if (deleteShare.response && state.delete != deleteShare.response && !deleteShare.fetching){
      console.log('deleteShare >>>');
      let nrows = state.rows;
      const deleteId = deleteShare.response.id
      nrows = nrows.filter(el=>el.id !== deleteId);
      props.listShareRequest({
        ...state
      })
      return{
        delete:deleteShare.response,
        rows:nrows,
        count:nrows.length
      }
      
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
      <Screen match={match} history={this.props.history}>
        <FireTable
          title={"Shares"}
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
            this.props.deleteShareRequest(row)
          }}
          notify={row=>{
            // console.log('notify',row);
            const env = CStorage.getItem('prod') ? 'prod' : 'qa';
            let message = {
              to:`/topics/${env}_all`,
              data:{
                type:"notif",
                message:row.title,
                title:"Nouvelle Partage"
              },
              priority:"high"
            }
            this.props.notifyRequest(message);
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
  listShare: state.share.list,
  deleteShare:state.share.delete

})
const mapDispatchToProps = (dispatch) => ({
  listShareRequest: params => dispatch(performAction(params, request(list(SHARE)))),
  deleteShareRequest: params => dispatch(performAction(params, request(remove(SHARE)))),
  notifyRequest: params => dispatch(performAction(params,request(NOTIFY)))

})
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ShareListScreen))

