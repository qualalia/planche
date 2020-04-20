import React, { useState, useEffect } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { fetchLessons } from "../store";
import { SingleLesson } from "../components";
import { todayDay, todayDate } from "../script";
import { Grid, Label, Header } from "semantic-ui-react";
import queryString from "query-string";

const AllLessons = props => {
  const allLessons = useSelector(state => state.allLessons) || [];
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { date } = props;
  const parsed = queryString.parse(location.search);
  useEffect(
    () => {
      dispatch(fetchLessons(location.search));
      setLoading(false);
    },
    [allLessons.length]
  );

  return (
    <div className="day-container">
      {allLessons.error && <h2>Error: {allLessons.error}</h2>}
      {loading && <h2>Loading...</h2>}
      {allLessons && (
        <div>
          <div className="day-of-the-week">
            <Header inverted as="h1" className="day-of-the-week">
              {todayDay(date)}
              {", "}
              {todayDate(date)}
            </Header>
          </div>
          <Grid className="days-classes" columns="equal">
            {allLessons.length > 0 ? (
              allLessons.map(lesson => (
                <SingleLesson key={`lesson${lesson.id}`} lesson={lesson} />
              ))
            ) : (
              <Header as="h1" inverted content="No classes scheduled yet." />
            )}
          </Grid>
        </div>
      )}
    </div>
  );
};

export default AllLessons;
