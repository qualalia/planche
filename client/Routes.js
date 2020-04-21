import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import {
  LogIn,
  SignUp,
  UserHome,
  Homepage,
  LessonsContainer,
  FiltersContainer,
} from "./components";
import { me } from "./store";

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn, history } = this.props;
    return (
      <Switch>
        <Route
          exact
          path="/browse"
          render={routeProps => (
            <>
              <FiltersContainer {...routeProps} />
              <LessonsContainer {...routeProps} />
            </>
          )}
        />
        {isLoggedIn && (
          <Switch>
            <Route exact path="/profile" render={() => <UserHome />} />
            <Route
              path="/"
              render={routeProps => <Homepage {...routeProps} />}
            />
            <Route path="*" render={() => <h2>Not found</h2>} />
          </Switch>
        )}
        <Route path="/" render={routeProps => <Homepage {...routeProps} />} />
        <Route path="*" render={() => <h2>Not found</h2>} />
      </Switch>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
  };
};

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  history: PropTypes.object,
};
