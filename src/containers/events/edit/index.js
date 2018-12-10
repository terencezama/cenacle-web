import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from './styles';
import { Screen } from '../../../components';
import { withStyles, FormControl, InputLabel, Input, Button, Paper, Snackbar, LinearProgress, TextField, InputAdornment, IconButton } from '@material-ui/core';
import LocationIcon from '@material-ui/icons/LocationOn'
import RichTextEditor from 'react-rte';
import { Formik } from 'formik';
import { performAction } from '../../../state';
import { request, create, remove, update, list, EVENT } from '../../../state/types';
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
class EventEditScreen extends Component {
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

    if (pathname === "/events/add") {
      //nothing to do with nstate
    } else {
      const { eventId } = this.props.match.params;
      console.log('eventId:', eventId);
      this.props.listEvent({ id: eventId })
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
    const { createEventState, updateEventState, listEventState } = this.props;
    if (prevProps.createEventState != createEventState && !createEventState.fetching) {
      console.log('createShare', createEventState);
      const response = createEventState.response;
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
    } else if (prevProps.updateEventState != updateEventState && !updateEventState.fetching) {
      console.log('updateShare', updateEventState);
      const { response, response: { opts: { values } } } = updateEventState;
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
      prevProps.listEventState != listEventState && 
      !listEventState.fetching && 
      this.props.location.pathname !== "/events/add"
      ) {
      console.log('listShare', listEventState);
      if (listEventState.error) {
        this.setState({
          redirect: '/events'
        })
      } else {
        const doc = listEventState.response.docs[0];
        console.log('doc',doc);
        const { eventId } = this.props.match.params;
        //   nstate.content = RichTextEditor.createValueFromString(lstate.content, 'html');
        //   nstate.title = lstate.title;
        //   nstate.update = lstate.id;
        this.setState({
          initialValues:{...doc},
          update: eventId
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
      this.props.createEvent({
        values,
        extra: {
          setSubmitting,
          resetForm
        }
      })
    } else {
      console.log(values);
      this.props.updateEvent({
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
                  <FormControl margin="normal" fullWidth>
                    <InputLabel htmlFor="contact">{"Contact"}</InputLabel>
                    <Input
                      id="contact"
                      name="contact"
                      type="tel"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.contact} />
                  </FormControl>
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
                  <br />
                  <FormControl margin="normal" required>
                    <TextField
                      id="time"
                      label="Time"
                      type="time"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.time}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        step: 300, // 5 min
                      }}
                    />
                  </FormControl>
                  <FormControl margin="normal" fullWidth>
                    <InputLabel htmlFor="location">{"Location 'lat, lng'"}</InputLabel>
                    <Input
                      id="location"
                      name="location"
                      type="default"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.location}
                      endAdornment={
                        <InputAdornment variant="filled" position="end">
                          <IconButton
                            aria-label="Toggle password visibility"
                            onClick={() => {
                              window.open('https://www.google.com/maps/place/Cenacle+Du+Saint+Esprit/@-20.326586,57.4727943,17z/data=!3m1!4b1!4m5!3m4!1s0x217c5d27ceec3a55:0xe22ed39625160918!8m2!3d-20.326591!4d57.474983', "_blank")
                            }}
                          >
                            <LocationIcon />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>







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
  createEventState: state.event.create,
  updateEventState: state.event.update,
  listEventState: state.event.list

})

const mapDispatchToProps = (dispatch) => ({
  listEvent: params => dispatch(performAction(params, request(list(EVENT)))),
  createEvent: params => dispatch(performAction(params, request(create(EVENT)))),
  updateEvent: params => dispatch(performAction(params, request(update(EVENT)))),
  deleteEvent: params => dispatch(performAction(params, request(remove(EVENT))))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EventEditScreen));







