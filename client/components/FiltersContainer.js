import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInstructors, fetchSchools } from "../store";
import { DropdownList } from "../components";
import { daysOfTheWeek } from "../script";
import { Label, Segment, Dropdown } from "semantic-ui-react";

const FiltersContainer = () => {
  const instructors = useSelector(state => state.instructors);
  const schools = useSelector(state => state.schools);
  const dispatch = useDispatch();
  useEffect(
    () => {
      if (!instructors.length || !instructors.error)
        dispatch(fetchInstructors());
      if (!schools.length || !schools.error) dispatch(fetchSchools());
    },
    [instructors.length, schools.length]
  );
  return (
    <div id="filters">
      <div className="filter-container">
        <Label className="filter-label" ribbon color="yellow" content="Day" />
        <DropdownList list={daysOfTheWeek} listName={"Day"} />
      </div>
      {instructors.length && (
        <div className="filter-container">
          <Label
            className="filter-label"
            color="yellow"
            ribbon
            content="Instructor"
          />
          <DropdownList
            list={instructors.map(instructor => instructor.displayName)}
            listName="Instructors"
          />
        </div>
      )}
      {schools.length && (
        <div className="filter-container">
          <Label
            className="filter-label"
            color="yellow"
            pointing="below"
            content="School"
          />
          <DropdownList list={schools} listName="Instructors" />
        </div>
      )}
    </div>
  );
};

export default FiltersContainer;
