import React, { useEffect, useState } from "react";
import { FiltersContainer, LessonsContainer } from "../components";
import { daysOfTheWeek, defaultDay, addADay, subtractADay } from "../script";
import { Button, Header } from "semantic-ui-react";
import queryString from "query-string";

const Homepage = props => {
  // TODO: default first three days to today, tomorrow, next day
  // TODO: different time frames: today, 3-day, week, custom?
  const handleClick = () => {
    props.history.push("/browse");
  };
  return (
    <div id="homepage">
      <Header
        id="browse"
        className="lesson-row"
        inverted
        as="h1"
        onClick={handleClick}
        content="Browse"
      />
    </div>
  );
};

export default Homepage;
