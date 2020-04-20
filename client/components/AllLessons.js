import React, { useState, useEffect } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { fetchLessons } from "../store";
import { SingleLesson } from "../components";
import { todayDay, todayDate } from "../script";
import { Grid, Label, Header } from "semantic-ui-react";
import queryString from "query-string";

console.log("local storage outside of all lessons: ", localStorage);

const AllLessons = props => {
  const lessons = useSelector(state => state.lessons.data);
  const status = useSelector(state => state.lessons.status);
  const [loading, setLoading] = useState(true);
  const [noLessons, setNoLessons] = useState(false);
  const dispatch = useDispatch();
  const { date } = props;
  const parsed = queryString.parse(location.search);
  useEffect(
    () => {
      if (localStorage.getItem(location.search)) {
        console.log(
          "already has that query: ",
          localStorage.getItem(location.search)
        );
      } else {
        (async () => {
          await dispatch(fetchLessons(location.search));
          console.log(lessons);
          await localStorage.setItem(location.search, JSON.stringify(lessons));
        })();
        console.log("new query: ", localStorage.getItem(location.search));
      }

      if (status) setLoading(false);
      if (status === 204) setNoLessons(true);
    },
    [lessons.length]
  );

  return (
    <div className="day-container">
      <div>
        <div className="day-of-the-week">
          <Header inverted as="h1" className="day-of-the-week">
            {todayDay(date)}
            {", "}
            {todayDate(date)}
          </Header>
        </div>
        {lessons.error && <h2>Error: {lessons.error}</h2>}
        {lessons && (
          <Grid className="days-classes" columns="equal">
            {!noLessons ? (
              lessons.map(lesson => (
                <SingleLesson key={`lesson${lesson.id}`} lesson={lesson} />
              ))
            ) : (
              <Header as="h1" inverted content="No classes scheduled yet." />
            )}
          </Grid>
        )}
      </div>
    </div>
  );
};

export default AllLessons;
