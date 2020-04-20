import React from "react";
import Select from "react-select";
import { Dropdown } from "semantic-ui-react";

const DropdownList = ({ list, listName, defaultValue }) => {
  const options = list.map(item => ({
    key: `${listName}${item}`,
    text: item,
    value: item,
  }));

  return <Dropdown options={options} selection multiple search fluid />;
};

export default DropdownList;
