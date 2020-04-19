import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { InstructorInfo } from "../components";

/**
 * COMPONENT
 */
export const UserHome = props => {
  const user = useSelector(state => state.user);
  const name = user.displayName;
  return (
    <div className="profile">
      <h3>Welcome, {name}</h3>
      <InstructorInfo />
      <Button
        color="purple"
        className="less-opacity"
        content="Log Out"
        onClick={handleClick}
      />
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
  };
};

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default UserHome;
//export default connect(mapState)(UserHome);

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string,
};
