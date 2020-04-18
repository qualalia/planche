import React from "react";
import { AllLessons, DropdownList } from "../components";
import { daysOfTheWeek } from "../script/CONSTANTS.js";

const Homepage = () => {
  return (
    <div id="homepage">
      <div id="filters">
        <div id="filters-label">Filter by:</div>
        <div className="filter-container">
          <div className="filter-label">Day</div>
          <DropdownList
            list={daysOfTheWeek}
            listType="Day"
            defaultValue={new Date().getDay()}
          />
        </div>
      </div>
      <AllLessons />
    </div>
  );
};

export default Homepage;
