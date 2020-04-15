import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { LoginOrSignup } from '../components';
import { logout } from '../store';

const Navbar = ({ isLoggedIn, history }) => {
  return (
    <nav id="navbar">
      <div
	id="planche"
	onClick={() => history.push("/")}
      >
	Planche
      </div>
      {isLoggedIn ? (
	<div id="logged-in-links">
          <NavLink to="/my-account">
	    Account
	  </NavLink>
	</div>
      ) : (
	<div id="guest-links">
	  <div
	    onClick={() => history.push("/join")}
	  >
	    Login/Signup
	  </div>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/signup">Sign Up</NavLink>
	</div>
      )}
    </nav>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(Navbar));

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  history: PropTypes.object
}
