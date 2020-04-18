import React from "react";
import Select from "react-select";

const DropdownList = ({ list, listType, defaultValue, handleSelect }) => {
  const options = list.map(item => ({
    value: item,
    label: item,
  }));

  return (
    <Select
      defaultValue={[options[defaultValue]]}
      isMulti
      name={listType}
      className="basic-multi-select"
      options={options}
      onInputChange={handleSelect}
    />
  );
};

export default DropdownList;
