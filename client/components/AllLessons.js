import React, { useState, useEffect } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { fetchLessons } from "../store";
import { SingleLesson } from "../components";
import { todayDay, todayDate } from "../script";
import { Grid, Label, Header, Button } from "semantic-ui-react";
import queryString from "query-string";

/* TODO: only fetch lessons if they aren't already in the store */
const AllLessons = props => {
  const lessons = useSelector(state => state.lessons.data);
  const status = useSelector(state => state.lessons.status);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { date } = props;
  const parsed = queryString.parse(location.search);

  useEffect(
    () => {
      dispatch(fetchLessons(location.search));
      if (status) setLoading(false);
    },
    [lessons.length, location.search]
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
        {status === 204 && (
          <div>
            <Header as="h1" inverted content="No classes scheduled yet." />
            <div className="add-new">
              <Header
                as="h3"
                inverted
                content="If you are an instructor or company: "
              />
              <Button
                onClick={() => history.push("/add-class")}
                content={
                  <div>
                    <i className="plus icon" />
                    {"Add New Class"}
                  </div>
                }
                color="purple"
              />
              <Header
                inverted
                as="h3"
                content="Soon, you will be able to request a class. Stay tuned!"
              />
            </div>
          </div>
        )}
        {lessons && (
          <Grid className="days-classes" columns="equal">
            {lessons.map(lesson => (
              <SingleLesson key={`lesson${lesson.id}`} lesson={lesson} />
            ))}
          </Grid>
        )}
      </div>
    </div>
  );
};

export default AllLessons;
