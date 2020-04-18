import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect, useSelector } from "react-redux";
import { withRouter, NavLink } from "react-router-dom";
import { LogIn, SignUp } from "../components";
import { logout } from "../store";

const Navbar = ({ isLoggedIn, history, handleClick }) => {
  const [isGuest, toggleIsGuest] = useState(false);
  return (
    <nav id="navbar">
      <div id="title" onClick={() => history.push("/")}>
        Salto
      </div>
      {isLoggedIn ? (
        <div id="logged-in-links">
          <div className="logged-in" onClick={() => history.push("/profile")}>
            Profile
          </div>
          <div className="logged-in" onClick={handleClick}>
            Logout
          </div>
        </div>
      ) : (
        <div id="sign-up-or-in">
          {!isGuest ? (
            <React.Fragment>
              <div className="top-row-msg-hidden">
                {"To sign up, all we need is an email and password."}
              </div>
              <LogIn />
              <div className="bottom-row-login">
                {/* NavLink to `/auth/google` didn't work */}
                <a href="/auth/google">{"Or sign in with Google."}</a>
                <div
                  className="bottom-row-msg"
                  onClick={() => toggleIsGuest(!isGuest)}
                >
                  {"Need an account?"}
                </div>
              </div>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <div className="top-row-msg">
                {"To sign up, all we need is an email and password."}
              </div>
              <SignUp />
              <div className="bottom-row-login">
                <a href="/auth/google">{"Or sign up with Google."}</a>
                <div
                  className="bottom-row-msg"
                  onClick={() => toggleIsGuest(!isGuest)}
                >
                  {"Already have an account?"}
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
