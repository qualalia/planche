import React from "react";
import { connect } from "react-redux";
import { fetchClasses } from "../store";
import { SingleClass } from "../components";

class AllClasses extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
    };
  }
  componentDidMount() {
    this.props.fetchAllClasses();
  }

  componentDidUpdate(prevProps) {
    if (this.props.allClasses.length !== prevProps.allClasses.length)
      this.setState({ loading: false });
    if (this.props.error !== prevProps.error)
      this.setState({ error: this.props.error });
  }
  render() {
    const { allClasses, loading, error } = this.props;
    return (
      <div className="display-classes">
        {loading && <h2>Loading classes...</h2>}
        {error && <h2>Error: {error.message}</h2>}
        {allClasses &&
          allClasses.length &&
          allClasses.map(cc => (
            <SingleClass key={`cc${cc.id}`} theClass={cc} />
          ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  allClasses: state.allClasses,
});
const mapDispatchToProps = dispatch => ({
  fetchAllClasses: () => dispatch(fetchClasses()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AllClasses);
