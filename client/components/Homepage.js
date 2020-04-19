import React from "react";
import { AllLessonsOnGivenDay, DropdownList } from "../components";
import { daysOfTheWeek } from "../script/CONSTANTS.js";
import { Button } from "semantic-ui-react";

const Homepage = () => {
  // TODO: default first three days to today, tomorrow, next day
  // TODO: paginate by day
  // TODO: different time frames: today, 3-day, week, custom?
  const threeDays = [
    { id: 0, date: new Date("April 18, 2020") },
    { id: 1, date: new Date("April 19, 2020") },
    { id: 2, date: new Date("April 20, 2020") },
  ];
  // TODO: research scrolling loading?
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
      <div id="display-classes">
        <div>
          <Button content="Prev" />
        </div>
        <AllLessonsOnGivenDay date={threeDays[0].date} />
        <div>
          <Button content="Next" />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
