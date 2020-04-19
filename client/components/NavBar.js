import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect, useSelector } from "react-redux";
import { withRouter, NavLink } from "react-router-dom";
import { LogIn, SignUp, LoginOrSignup } from "../components";
import { logout } from "../store";
import { Popup, Button } from "semantic-ui-react";

const popupStyle = {
  display: "flex",
  flexDirection: "column",
  backgroundColor: "rgba(255,255,255,0.4)",
  boxShadow: "0px 2px 2px 2px rgba(248, 181, 152, 0.6)",
};

const Navbar = ({ isLoggedIn, history, handleClick }) => {
  const [isOpen, toggleIsOpen] = useState(false);
  const handlePopup = () => {
    toggleIsOpen(!isOpen);
  };
  return (
    <nav id="navbar">
      <div id="title" onClick={() => history.push("/")}>
        Salto!
      </div>
      {isLoggedIn ? (
        <div id="logged-in-links">
          <Button
            color="purple"
            className="less-opacity"
            content="Profile"
            onClick={() => history.push("/profile")}
          />
          <Button
            color="purple"
            className="less-opacity"
            content="Log Out"
            onClick={handleClick}
          />
        </div>
      ) : (
        <Popup
          trigger={
            <Button
              color="purple"
              content="Login/Signup"
              className="less-opacity"
            />
          }
          content={() => <LoginOrSignup />}
          on={["click", "focus"]}
          basic
          open={isOpen}
          onClose={handlePopup}
          onOpen={handlePopup}
          position="bottom right"
          style={popupStyle}
        />
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
