import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from './styles';
import { Screen, FireTable } from '../../../components';
import { withStyles, Typography, FormControl, InputLabel, Input, Button, Paper, Snackbar } from '@material-ui/core';
import RichTextEditor from 'react-rte';
import { Formik } from 'formik';
import { performAction } from '../../../state';
import { request, create, SHARE, remove, update, list } from '../../../state/types';
import { Redirect } from 'react-router-dom'

class ShareEditScreen extends Component {

  constructor(props) {
    super(props);
    console.log('state', props.location);
    const { pathname } = props.location;

    let nstate = {
      content: RichTextEditor.createEmptyValue(),
      title: '',
      update: undefined,
      notify: false,
      notificationMessage: '',
      redirect: undefined
    }

    if (pathname === "/shares/add") {
      //nothing to do with nstate
    } else {
      const { shareId } = this.props.match.params;
      console.log('shareId:', shareId);
      this.props.listShare({ id: shareId })
      const lstate = props.location.state;
      if(!lstate){
        // nstate.redirect = "/shares";
      }else{
        nstate.content = RichTextEditor.createValueFromString(lstate.content, 'html');
        nstate.title = lstate.title;
        nstate.update = lstate.id;
      }
    }
    this.state = nstate;
  }



  componentDidUpdate(prevProps, prevState) {
    const { createShareState, updateShareState, listShareState } = this.props;
    if (prevProps.createShareState != createShareState && !createShareState.fetching) {
      console.log('createShare', createShareState);

      const response = createShareState.response;
      if (response) {
        const { setSubmitting, resetForm } = response.extra;
        setSubmitting(false);
        resetForm({
          title: '',
          content: RichTextEditor.createEmptyValue()
        })
        this.setState({
          notify: true,
          notificationMessage: 'Created'
        })
      }
    } else if (prevProps.updateShareState != updateShareState && !updateShareState.fetching) {
      console.log('updateShare', updateShareState);
      const {response, response:{opts:{values}}} = updateShareState;
      if (response) {
        const { setSubmitting } = response.extra;
        setSubmitting(false);
        console.log(this.props.history)
        const {history} = this.props;
        
        history.replace({
          pathname:history.location.pathname,
          state:{
            ...values
          }
        })

        this.setState({
          notify: true,
          notificationMessage: 'Updated'
        })
        // setTimeout(() => {
        //   this.props.history.replaceState({
          
        //   },null,'/')
        // }, 300);
      }

    } else if (
      prevProps.listShareState != listShareState && 
      !listShareState.fetching &&
      this.props.location.pathname !== "/shares/add") {
      console.log('listShare', listShareState);
      if (listShareState.error) {
        this.setState({
          redirect: '/shares'
        })
      } else {
        const {content, title} = listShareState.response.docs[0];
        const { shareId } = this.props.match.params;
        //   nstate.content = RichTextEditor.createValueFromString(lstate.content, 'html');
        //   nstate.title = lstate.title;
        //   nstate.update = lstate.id;
        this.setState({
          content:RichTextEditor.createValueFromString(content, 'html'),
          title,
          update:shareId
        })
        this.formik.setFieldValue('title',title);
        this.formik.setFieldValue('content',RichTextEditor.createValueFromString(content, 'html'));
      }

    }
  }

  _notifyClose = () => {
    this.setState({ notify: false })
  }

  _rteOnChange = (value, handleChange) => {
    handleChange({
      target: {
        value,
        id: 'content',
        name: 'content'
      }
    })
  };
  _onSubmit = (values, { setSubmitting, resetForm }) => {
    const { update } = this.state;

    if (!update) {
      this.props.createShare({
        values: {
          title: values.title,
          content: values.content.toString('html')
        }, extra: {
          setSubmitting,
          resetForm
        }
      });
    } else {
      console.log(values);
      this.props.updateShare({
        values: {
          title: values.title,
          content: values.content.toString('html'),
          update
        }, extra: {
          setSubmitting,
          resetForm
        }
      })
    }

  }
  render() {
    const { match, classes } = this.props;
    const { notify, notificationMessage, content, title, update, redirect } = this.state;

    if (redirect) {
      return (<Redirect to={redirect} />)
    }

    return (
      <Screen match={match} history={this.props.history} >
        <Paper className={classes.paper}>
          <Formik
            initialValues={{
              title,
              content
            }}
            onSubmit={this._onSubmit}
            ref={ref=>this.formik=ref}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
            }) => (
                <form className={classes.form} onSubmit={handleSubmit}>
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="title">{"Title"}</InputLabel>
                    <Input
                      id="title"
                      name="title"
                      type="default"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.title} />
                  </FormControl>
                  <RichTextEditor
                    value={values.content}
                    onChange={value => { this._rteOnChange(value, handleChange) }}
                    name="content"
                    type="content"
                    id="content"
                    placeholder="Content"
                    className={classes.richtexteditor}
                  />

                  <Button
                    type="submit"
                    disabled={isSubmitting || Object.keys(errors).length !== 0}
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    {update ? 'Update' : 'Create'}
                  </Button>
                </form>
              )}

          </Formik>
        </Paper>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={notify}
          onClose={this._notifyClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{notificationMessage}</span>}
        />

      </Screen>
    )
  }
}
const mapStateToProps = (state) => ({
  createShareState: state.share.create,
  updateShareState: state.share.update,
  listShareState: state.share.list

})

const mapDispatchToProps = (dispatch) => ({
  listShare: params => dispatch(performAction(params, request(list(SHARE)))),
  createShare: params => dispatch(performAction(params, request(create(SHARE)))),
  updateShare: params => dispatch(performAction(params, request(update(SHARE)))),
  deleteShare: params => dispatch(performAction(params, request(remove(SHARE))))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ShareEditScreen));







