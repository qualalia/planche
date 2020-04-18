import React, { useState } from "react";
import { fetchClasses } from "../store";
import { AllClasses, DropdownList } from "../components";
import { daysOfTheWeek } from "../script/CONSTANTS.js";

const Homepage = () => {
  return (
    <div>
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
      <AllClasses />
    </div>
  );
};

export default Homepage;