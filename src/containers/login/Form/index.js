import React from 'react';
import { Formik } from 'formik';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import PropTypes from 'prop-types';

const Basic = ({ classes, onSubmit }) => (
    <div>
        <Formik
            initialValues={{ email: '', password: '' }}
            validate={values => {
                let errors = {};
                if (!values.email) {
                    errors.email = 'Email Required';
                } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                    errors.email = 'Invalid email address';
                }else if ( !values.password){
                    errors.password = 'Password Required';
                }else if (values.password.length < 5){
                    errors.password = 'Minimum Password Length is 5';
                }
                return  errors;
            }}
            onSubmit={onSubmit}
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
                            <InputLabel htmlFor="email">{(touched.email && errors.email) || "Email Address"}</InputLabel>
                            <Input
                                id="email"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                type="email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email} />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">{(touched.password && errors.password) || "Password"}</InputLabel>
                            <Input
                                name="password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                            />
                        </FormControl>
                        <Button
                            type="submit"
                            disabled={ isSubmitting || Object.keys(errors).length !== 0 }
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign in
        </Button>
                    </form>

                )}
        </Formik>
    </div>
);

Basic.propTypes = {
    onSubmit: PropTypes.func.isRequired
}

export default Basic;