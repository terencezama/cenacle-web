import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from './styles';
import { Screen, FireTable } from '../../../components';
import { withStyles, Typography, FormControl, InputLabel, Input, Button, Paper } from '@material-ui/core';
import RichTextEditor from 'react-rte';
import { Formik } from 'formik';
import { performAction } from '../../../state';
import { request, create, SHARE } from '../../../state/types';
class ShareEditScreen extends Component {

  constructor(props) {
    super(props);
  }
  state = {
    content: RichTextEditor.createEmptyValue()
  }
  _rteOnChange = (value, handleChange) => {
    this.setState({ content: value });
    const parsed = value.toString('html');
    if (this.props.onChange) {
      // Send the changes up to the parent component as an HTML string.
      // This is here to demonstrate using `.toString()` but in a real app it
      // would be better to avoid generating a string on each change.

      this.props.onChange(
        parsed
      );

    }
    handleChange({
      target: {
        value: parsed,
        id: 'content',
        name: 'content'

      }
    })
  };
  _onSubmit = (values, { setSubmitting }) => {
    // this.setState({ setSubmitting });
    console.log('setSubmiting', values);
    this.props.createShare({values,setSubmitting});

    // setTimeout(() => {
    //   alert(JSON.stringify(values, null, 2));
    //   setSubmitting(false);
    // }, 400);

  }
  render() {
    const { match, classes } = this.props;
    return (
      <Screen match={match} >
        <Paper className={classes.paper}>
          <Formik
            initialValues={{
              title: '',
              content: ''
            }}
            onSubmit={this._onSubmit}
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
                    value={this.state.content}
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
                    Create
                </Button>
                </form>
              )}

          </Formik>
        </Paper>

      </Screen>
    )
  }
}
const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({
  createShare: params => dispatch(performAction(params, request(create(SHARE))))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ShareEditScreen));







