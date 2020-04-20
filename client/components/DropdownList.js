import React from "react";
import Select from "react-select";
import { Dropdown, Loader, Segment } from "semantic-ui-react";

const DropdownList = ({ list, listName, defaultValue }) => {
  const options = list.map(item => ({
    key: `${listName}${item}`,
    text: item,
    value: item,
  }));

  return (
    <Dropdown
      name={listName}
      placeholder={
        list.length ? (
          `Select or Search`
        ) : (
          <Loader active size="tiny" inline="centered" />
        )
      }
      options={options}
      selection
      multiple
      search
      fluid
    />
  );
};

export default DropdownList;
