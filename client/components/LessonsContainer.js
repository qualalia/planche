import React, { useEffect, useState } from "react";
import { AllLessons, DropdownList } from "../components";
import { daysOfTheWeek, defaultDay, addADay, subtractADay } from "../script";
import { Button, Header, Loader } from "semantic-ui-react";
import queryString from "query-string";

const LessonsContainer = props => {
  const [loading, setLoading] = useState(true);
  const searchQuery = location.search;
  if (!searchQuery && location.pathname === "/browse") {
    const today = defaultDay();
    const query = queryString.parse(location.search);
    query.date = today;
    props.history.push(`/browse?${queryString.stringify(query)}`);
  }
  let date = queryString.parse(location.search).date;

  useEffect(
    () => {
      if (date) setLoading(false);
      else setLoading(true);
    },
    [location.search]
  );

  const handleClickPrev = evt => {
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
      <div>
        <Button name="prev" onClick={handleClickPrev} content={"Prev"} />
      </div>
      {loading ? <Loader active /> : <AllLessons date={date} />}
      <div>
        <Button name="next" onClick={handleClickNext} content="Next" />
      </div>
    </div>
  );
};

export default LessonsContainer;
