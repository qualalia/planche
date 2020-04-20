import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInstructors, fetchSchools } from "../store";
import { DropdownList } from "../components";
import { daysOfTheWeek } from "../script";
import { Label, Button, Dropdown } from "semantic-ui-react";
import queryString from "query-string";

const FiltersContainer = () => {
  const instructors = useSelector(state => state.instructors) || [];
  const schools = useSelector(state => state.schools.data) || [];
  const dispatch = useDispatch();
  const [choices, setChoices] = useState({
    days: [],
    instructors: [],
    schools: [],
  });
  const [chosenSchools, setChosenSchools] = useState([]);
  const [chosenInstructors, setChosenInstructors] = useState([]);
  const [chosenDays, setChosenDays] = useState([]);

  useEffect(
    () => {
      if (!instructors.length || !instructors.error)
        dispatch(fetchInstructors());
      if (!schools.length || !schools.error) dispatch(fetchSchools());
    },
    [instructors.length, schools.length]
  );

  const handleChoose = (e, data) => {
    const currentChoice = data.value;
    console.log(data.name);
    switch (data.name) {
      case "Schools":
        setChosenSchools(currentChoice);
        return;
      case "Instructors":
        setChosenInstructors(currentChoice);
        return;
      case "Day":
        setChosenDays(currentChoice);
        return;
      default:
        return;
    }
  };

  const handleSubmit = () => {
    const day = chosenDays.length ? chosenDays : null;
    const instructor = chosenInstructors.length ? chosenInstructors : null;
    const school = chosenSchools.length ? chosenSchools : null;
    const query = queryString.stringify(
      {
        day,
        instructor,
        school,
      },
      { skipNull: true }
    );
    location.search = query;
  };

  return (
    <div id="filters">
      <div className="filter-container">
        <Label className="filter-label" ribbon color="yellow" content="Day" />
        <DropdownList
          list={daysOfTheWeek}
          listName={"Day"}
          handleChoose={handleChoose}
        />
      </div>
      <div className="filter-container">
        <Label
          className="filter-label"
          color="yellow"
          ribbon
          content="Instructor"
        />
        <DropdownList
          list={
            instructors.length
              ? instructors.map(instructor => instructor.displayName)
              : []
          }
          listName="Instructors"
          handleChoose={handleChoose}
        />
      </div>
      <div className="filter-container">
        <Label
          className="filter-label"
          color="yellow"
          ribbon
          content="School"
        />
        <DropdownList
          list={schools.length > 0 ? schools.map(school => school.name) : []}
          listName="Schools"
          handleChoose={handleChoose}
        />
      </div>
      <Button onClick={handleSubmit} content={"Submit"} color="purple" />
    </div>
  );
};

export default FiltersContainer;
