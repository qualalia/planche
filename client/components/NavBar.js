import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { LogIn, SignUp } from '../components';
import { logout } from '../store';

const Navbar = ({ isLoggedIn, history, handleClick }) => {
  const [isGuest, toggleIsGuest] = useState(false);
  return (
    <nav id="navbar">
      <div id="title" onClick={() => history.push('/')}>
        Salto
      </div>
      {isLoggedIn ? (
        <div id="logged-in-links">
          <div>
            <NavLink to="/profile">Account</NavLink>
          </div>
          <div onClick={handleClick}>Logout</div>
        </div>
      ) : (
        <div id="sign-up-or-in">
          {!isGuest ? (
            <React.Fragment>
              <div className="top-row-msg-hidden">
                To sign up, all we need is an email and password.
              </div>
              <LogIn />
              <div className="bottom-row-login">
                <div className="google-auth-msg">
                  <NavLink className="navlink" to="/auth/google">
                    {'Or sign in with Google.'}
                  </NavLink>
                </div>
                <div className="toggle-msg-and-btn">
                  <div className="have-or-need-account-msg">
                    {'Need an account? '}
                  </div>
                  <button
                    className="toggle-signup-signin-btn"
                    onClick={() => toggleIsGuest(!isGuest)}
                  >
                    {'Sign Up'}
                  </button>
                </div>
              </div>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <div className="top-row-msg">
                To sign up, all we need is an email and password.
              </div>
              <SignUp />
              <div className="bottom-row-login">
                <div className="google-auth-msg">
                  <NavLink className="navlink" to="/auth/google">
                    {'Or sign up with Google.'}
                  </NavLink>
                </div>
                <div className="toggle-msg-and-btn">
                  <div className="have-or-need-account-msg">
                    {'Already have an account? '}
                  </div>
                  <button
                    className="toggle-signup-signin-btn"
                    onClick={() => toggleIsGuest(!isGuest)}
                  >
                    {'Sign In'}
                  </button>
                </div>
              </div>
            </React.Fragment>
          )}
        </div>
      )}
    </nav>
  );
};

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
  };
};

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default withRouter(connect(mapState, mapDispatch)(Navbar));

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  history: PropTypes.object,
};
