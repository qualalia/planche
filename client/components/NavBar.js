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
  //  backgroundColor: "rgba(253, 241, 211, 1)",
  //  backgroundColor: "rgba(81, 106, 186, 1)",
  boxShadow: "0px 2px 2px 2px rgba(255, 245, 175, 0.7)",
};

const Navbar = ({ isLoggedIn, history, handleClick }) => {
  const [isOpen, toggleIsOpen] = useState(false);
  const handlePopup = () => {
    toggleIsOpen(!isOpen);
  };
  return (
    <nav id="navbar">
      <div id="nav-left-side">
        <div className="nav option">Browse</div>
        <div className="nav option">Other Option</div>
        <div className="nav option">Third Option</div>
      </div>
      <div id="title" onClick={() => history.push("/")}>
        S A L T O
      </div>
      {isLoggedIn ? (
        <div id="logged-in-links">
          <Button
            color="purple"
            className="less-opacity"
            content="Profile"
            onClick={() => history.push("/profile")}
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

export default withRouter(connect(mapState)(Navbar));

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  history: PropTypes.object,
};
