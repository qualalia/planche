import React, { useState, useEffect } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { fetchLessons } from "../store";
import { SingleLesson } from "../components";
import { Grid, Label, Header } from "semantic-ui-react";

const AllLessons = props => {
  const allLessons = useSelector(state => state.allLessons) || [];
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(
    () => {
      dispatch(fetchLessons());
      setLoading(false);
    },
    [allLessons.length]
  );

  return (
    <div className="display-classes">
      {allLessons.error && <h2>Error: {allLessons.error}</h2>}
      {loading && <h2>Loading...</h2>}
      {allLessons.length && (
        <Grid columns="equal">
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
          {allLessons.map(lesson => (
            <SingleLesson key={`lesson${lesson.id}`} lesson={lesson} />
          ))}
        </Grid>
      )}
    </div>
  );
};

export default AllLessons;
