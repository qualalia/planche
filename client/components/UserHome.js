import React from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { InstructorInfo } from "../components";
import { logout } from "../store";
import { Button } from "semantic-ui-react";

/**
 * COMPONENT
 */
export const UserHome = props => {
  const user = useSelector(state => state.user);
  const name = user.displayName;
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(logout());
  };
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

export default UserHome;
//export default connect(mapState)(UserHome);

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string,
};
