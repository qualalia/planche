import React from "react";
import { AllLessonsOnGivenDay, DropdownList } from "../components";
import { daysOfTheWeek, defaultDay } from "../script";
import { Button } from "semantic-ui-react";
import queryString from "query-string";

const Homepage = props => {
  const searchQuery = location.search;
  if (!searchQuery) {
    const today = defaultDay();
    console.log(today);
    const query = queryString.parse(location.search);
    query.date = today;
    location.search = queryString.stringify(query);
  }
  const date = queryString.parse(location.search).date;

  // TODO: default first three days to today, tomorrow, next day
  // TODO: paginate by day
  // TODO: different time frames: today, 3-day, week, custom?
  // TODO: research scrolling loading?
  return (
    <div id="homepage">
      {/*      <div id="filters">
        <div id="filters-label">Filter by:</div>
        <div className="filter-container">
          <div className="filter-label">Day</div>
          <DropdownList
            list={daysOfTheWeek}
            listType="Day"
            defaultValue={new Date().getDay()}
          />
        </div>
      </div>*/}
      <div id="display-classes">
        <div>
          <Button content="Prev" />
        </div>
        <AllLessonsOnGivenDay date={date} />
        <div>
          <Button content="Next" />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
