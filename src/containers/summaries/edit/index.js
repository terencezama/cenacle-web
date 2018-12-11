import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from './styles';
import { Screen, BibleLink } from '../../../components';
import { withStyles, FormControl, InputLabel, Input, Button, Paper, Snackbar, LinearProgress, TextField, InputAdornment, IconButton, Chip } from '@material-ui/core';
import LocationIcon from '@material-ui/icons/LocationOn'
import RichTextEditor from 'react-rte';
import { Formik } from 'formik';
import { performAction } from '../../../state';
import { request, create, remove, update, list, SUMMARY } from '../../../state/types';
import { Redirect } from 'react-router-dom'
import moment from 'moment';

const initialValues = {
  title: "",
  desc: "",
  contact: "",
  date: moment().format('YYYY-MM-DD'),
  time: "14:00",
  location: ""
}
class SummaryEditScreen extends Component {
  constructor(props) {
    super(props);


    console.log('state', props.location);
    const { pathname } = props.location;

    let nstate = {
      update: undefined,
      notify: false,
      notificationMessage: '',
      redirect: undefined,
      initialValues
    }

    if (pathname === "/summaries/add") {
      //nothing to do with nstate
    } else {
      const { summaryId } = this.props.match.params;
      console.log('summaryId:', summaryId);
      this.props.listSummary({ id: summaryId })
      const lstate = props.location.state;
      console.log('lstate:', lstate);
      if (!lstate) {
        
      } else {
        nstate.update = lstate.id;
        nstate = {
          ...nstate,
          initialValues:{...lstate},
          update: lstate.id
        }
      }
    }
    this.state = nstate;

  }

  componentWillMount() {

  }



  componentDidUpdate(prevProps, prevState) {
    const { createSummaryState, updateSummaryState, listSummaryState } = this.props;
    if (prevProps.createSummaryState != createSummaryState && !createSummaryState.fetching) {
      console.log('createShare', createSummaryState);
      const response = createSummaryState.response;
      if (response) {
        const { setSubmitting, resetForm } = response.extra;
        setSubmitting(false);
        // resetForm(initialValues);
        resetForm({
          ...initialValues
        })
        this.setState({
          notify: true,
          notificationMessage: 'Created'
        })
      }
    } else if (prevProps.updateSummaryState != updateSummaryState && !updateSummaryState.fetching) {
      console.log('updateShare', updateSummaryState);
      const { response, response: { opts: { values } } } = updateSummaryState;
      if (response) {
        const { setSubmitting } = response.extra;
        setSubmitting(false);
        console.log(this.props.history)
        const { history } = this.props;

        history.replace({
          pathname: history.location.pathname,
          state: {
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
      prevProps.listSummaryState != listSummaryState && 
      !listSummaryState.fetching && 
      this.props.location.pathname !== "/summaries/add"
      ) {
      console.log('listSummary', listSummaryState);
      if (listSummaryState.error) {
        this.setState({
          redirect: '/summaries'
        })
      } else {
        const doc = listSummaryState.response.docs[0];
        console.log('doc',doc);
        const { summaryId } = this.props.match.params;
        //   nstate.content = RichTextEditor.createValueFromString(lstate.content, 'html');
        //   nstate.title = lstate.title;
        //   nstate.update = lstate.id;
        this.setState({
          initialValues:{...doc},
          update: summaryId
        })
        // this.formik.setFieldValue('title', title);
        // this.formik.setFieldValue('content', RichTextEditor.createValueFromString(content, 'html'));
        // for (const key in doc) {
        //   const element = doc[key];
        //   this.formik.setFieldValue(key, element);
          
        // }
        const formValues = doc;
        if(typeof formValues.date !== "string" ){
          formValues.date = moment(formValues.date.toDate()).format('YYYY-MM-DD');
        }
        
        this.formik.resetForm({...doc})
      }

    }
  }

  _handleLocationChange({ position, address }) {

    // Set new location
    // this.setState({ position, address });
    console.log('loc change', position, address);
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
    console.log(values);

    if (!update) {
      this.props.createSummary({
        values,
        extra: {
          setSubmitting,
          resetForm
        }
      })
    } else {
      console.log(values);
      this.props.updateSummary({
        values: {
          ...values,
          update
        },
        extra: {
          setSubmitting,
          resetForm
        }
      })
    }

  }
  render() {
    const { match, classes } = this.props;
    const { notify, notificationMessage, update, redirect, gscript } = this.state;

    if (redirect) {
      return (<Redirect to={redirect} />)
    }
    return (
      <Screen match={match} history={this.props.history} >
      <BibleLink />
        <Paper className={classes.paper}>
          <Formik
            initialValues={this.state.initialValues}
            onSubmit={this._onSubmit}
            ref={ref => this.formik = ref}
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
                  <FormControl margin="normal" required>
                    <TextField
                      id="date"
                      label="Date"
                      type="date"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.date}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </FormControl>
                  <TextField
                    id="desc"
                    name="desc"
                    label="Description"
                    // placeholder="Placeholder"
                    multiline
                    className={classes.textField}
                    margin="normal"
                    rowsMax="100"
                    rows="4"
                    fullWidth
                    value={values.desc}
                    onChange={handleChange}
                    onBlur={handleBlur}
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
  createSummaryState: state.summary.create,
  updateSummaryState: state.summary.update,
  listSummaryState: state.summary.list

})

const mapDispatchToProps = (dispatch) => ({
  listSummary: params => dispatch(performAction(params, request(list(SUMMARY)))),
  createSummary: params => dispatch(performAction(params, request(create(SUMMARY)))),
  updateSummary: params => dispatch(performAction(params, request(update(SUMMARY)))),
  deleteSummary: params => dispatch(performAction(params, request(remove(SUMMARY))))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SummaryEditScreen));







