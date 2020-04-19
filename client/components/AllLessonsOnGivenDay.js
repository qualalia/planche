import React, { useState, useEffect } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { fetchLessons } from "../store";
import { SingleLesson } from "../components";
import { todayDay, todayDate } from "../script";
import { Grid, Label, Header } from "semantic-ui-react";

const AllLessonsOnGivenDay = props => {
  /* TODO : Refactor into All Lessons for the Given Day */
  const allLessons = useSelector(state => state.allLessons) || [];
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { date } = props;

  useEffect(
    () => {
      dispatch(fetchLessons()); // todo: FOR THIS DAY
      setLoading(false);
    },
    [allLessons.length]
  );

  return (
    <div className="day-container">
      {allLessons.error && <h2>Error: {allLessons.error}</h2>}
      {loading && <h2>Loading...</h2>}
      {allLessons.length && (
        <div>
          <div className="day-of-the-week">
            <Header as="h1" inverted className="day-of-the-week">
              {todayDay(date)}
              {", "}
              {todayDate(date)}
            </Header>
          </div>
          <Grid className="days-classes" columns="equal">
            {allLessons.map(lesson => (
              <SingleLesson key={`lesson${lesson.id}`} lesson={lesson} />
            ))}
          </Grid>
        </div>
      )}
    </div>
  );
};

export default AllLessonsOnGivenDay;

/*
   <Grid.Row className="lesson-list-header">
   <Grid.Column width={3}>
   <Header as="h3" textAlign="left">
   Time
   </Header>
   </Grid.Column>
   <Grid.Column width={10}>
   <Header as="h3" textAlign="left">
   Class
   </Header>
   </Grid.Column>
   <Grid.Column width={2}>
   <Header as="h3" textAlign="left">
   Instructor Studio
   </Header>
   </Grid.Column>
   </Grid.Row>
 */
