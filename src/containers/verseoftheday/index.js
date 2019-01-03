import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from './styles';

import { withStyles, FormControl, InputLabel, Input, Button, Paper, Snackbar, LinearProgress, TextField, InputAdornment, IconButton } from '@material-ui/core';
import LocationIcon from '@material-ui/icons/LocationOn'
import RichTextEditor from 'react-rte';
import { Formik } from 'formik';
import { performAction } from '../../state';
import { request, create, remove, update, list, EVENT, VERSE } from '../../state/types';
import { Redirect } from 'react-router-dom'
import moment from 'moment';
import { Screen } from '../../components';

const initialValues = {
  title: "",
  verse: "",
}
class VerseOfTheDayScreen extends Component {
  constructor(props) {
    super(props);


    console.log('state', props.location);
    const { pathname } = props.location;

    let nstate = {
      notify: false,
      notificationMessage: '',
      redirect: undefined,
      initialValues
    }

    
    this.state = nstate;

  }

  componentWillMount() {
    this.props.getVerse();
  }



  componentDidUpdate(prevProps, prevState) {
    const { getVerseState, updateVerseState} = this.props;
    if(getVerseState != prevProps.getVerseState && !getVerseState.fetching){
      if(getVerseState.response){
        const { verse, title} = getVerseState.response;
        this.formik.setFieldValue('title',title);
        this.formik.setFieldValue('verse',verse);
      }
    }else if (updateVerseState != prevProps.updateVerseState && !updateVerseState.fetching){
      if(updateVerseState.response){
        // console.log('update verse state',updateVerseState.response);
        const { setSubmitting} = updateVerseState.response.extra;
        setSubmitting();
      }
    }
    
  }

 

  _notifyClose = () => {
    this.setState({ notify: false })
  }

  
  _onSubmit = (values, { setSubmitting, resetForm }) => {
    console.log(values);

    this.props.updateVerse({
        values,
        extra: {
          setSubmitting,
          resetForm
        }
      })

  }
  render() {
    const { match, classes } = this.props;
    const { notify, notificationMessage, redirect, gscript } = this.state;

    if (redirect) {
      return (<Redirect to={redirect} />)
    }
    return (
      <Screen match={match} history={this.props.history} >
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
                  <FormControl margin="normal" fullWidth>
                    <InputLabel htmlFor="title">{"Title"}</InputLabel>
                    <Input
                      id="title"
                      name="title"
                      type="default"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.title} />
                  </FormControl>
                  <TextField
                    id="verse"
                    name="verse"
                    label="Verse"
                    // placeholder="Placeholder"
                    multiline
                    className={classes.textField}
                    margin="normal"
                    rowsMax="100"
                    rows="4"
                    fullWidth
                    value={values.verse}
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
                    { 'Update'}
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
  getVerseState: state.verse.get,
  updateVerseState: state.verse.update,
  

})

const mapDispatchToProps = (dispatch) => ({
  getVerse: params => dispatch(performAction(params, request(list(VERSE)))),
  updateVerse: params => dispatch(performAction(params, request(update(VERSE)))),
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(VerseOfTheDayScreen));







