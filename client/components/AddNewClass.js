import React from "react";
import { Form } from "semantic-ui-react";
import { submitFormData} from "../store";

class AddNewClass extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      capacity: 0,
      duration: 0,
    }
  }
  handleChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value })
  }
  handleSubmit = () => {
    this.props.submitFormData(this.state)
  }
  render {
    const { name, capacity } = this.state
    return (
      <Form>
	<Form.Group>
	  <Form.Input
	    placeholder="Class Name"
	    name="name"
	    value={name}
	    onChange={this.handleChange}
	  />
	  <Form.Input
	    placeholder="Capacity"
	    name="capacity"
	    value={capacity}
	  onChange={this.handleChange}
	  />
	</Form.Group>
      </Form>
    )
  }
};

const mapDispatchToProps = dispatch => {
  return {
    submitFormData: state => submitFormData(state)
  }
}

export default AddNewClass;
