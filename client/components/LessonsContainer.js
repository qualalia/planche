import React, { useEffect, useState } from "react";
import { AllLessons, DropdownList } from "../components";
import { daysOfTheWeek, defaultDay, addADay, subtractADay } from "../script";
import { Button, Header } from "semantic-ui-react";
import queryString from "query-string";

const LessonsContainer = props => {
  const [loading, setLoading] = useState(true);
  const searchQuery = location.search;
  if (!searchQuery && location.pathname === "/browse") {
    const today = defaultDay();
    const query = queryString.parse(location.search);
    query.date = today;
    location.search = queryString.stringify(query);
  }
  const date = queryString.parse(location.search).date;

  useEffect(
    () => {
      if (date) setLoading(false);
      else setLoading(true);
    },
    [location.search]
  );

  const handleClickPrev = evt => {
    const currentQuery = location.search;
    if (evt.target.name === "prev") {
      const yesterday = subtractADay(new Date(date));
      location.search = queryString.stringify({ date: yesterday });
    }
  };
  const handleClickNext = evt => {
    if (evt.target.name === "next") {
      const tomorrow = addADay(new Date(date));
      location.search = queryString.stringify({ date: tomorrow });
    }
  };

  return (
    <div id="display-classes">
      {!loading ? (
        <React.Fragment>
          <div>
            <Button name="prev" onClick={handleClickPrev} content="Prev" />
          </div>
          <AllLessons date={date} />
          <div>
            <Button name="next" onClick={handleClickNext} content="Next" />
          </div>
        </React.Fragment>
      ) : (
        <Header as="h1" inverted content="Loading..." />
      )}
    </div>
  );
};

export default LessonsContainer;
