import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { auth } from "../store";
import { Form, Button } from "semantic-ui-react";

/**
 * COMPONENT
 */
const AuthForm = props => {
  const { name, submitType, handleSubmit, error } = props;
  return (
    <div id="auth-form-container">
      <form id="auth-form" onSubmit={handleSubmit} name={name}>
        <div className="form-field">
          <input name="email" type="text" placeholder="Email" />
        </div>
        <div className="form-field">
          <input name="password" type="password" placeholder="Password" />
        </div>
        <div id="submit-or-toggle">
          <Button color="purple" type="submit">
            {submitType}
          </Button>
        </div>
      </form>
      {error &&
        error.response && <div id="auth-error">{error.response.data}</div>}
    </div>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for LogIn, and one for SignUp. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogIn = state => {
  return {
    name: "signin",
    submitType: "Sign in",
    error: state.user.error,
  };
};

const mapSignUp = state => {
  return {
    name: "signup",
    submitType: "Sign up",
    error: state.user.error,
  };
};

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      dispatch(auth(email, password, formName));
    },
  };
};

export const LogIn = connect(mapLogIn, mapDispatch)(AuthForm);
export const SignUp = connect(mapSignUp, mapDispatch)(AuthForm);

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  submitType: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object,
};

/*

   <Form id="auth-form" onSubmit={handleSubmit} name={name}>
   <Form.Group inline>
   <Form.Input fluid label="Email" placeholder="Email" />
   <Form.Input fluid label="Password" placeholder="Password" />
   </Form.Group>
   <Button inverted color="orange">
   {submitType}
   </Button>
   {error && error.response && <div> {error.response.data} </div>}
   </Form>
   <NavLink to="/auth/google">{submitType} with Google</NavLink>
   </div>

 */
