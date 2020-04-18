import React, { useState, useEffect } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { fetchLessons } from "../store";
import { SingleLesson } from "../components";
import { Grid } from "semantic-ui-react";

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
        <Grid>
          {allLessons.map(lesson => (
            <Grid.Row>
              <SingleLesson key={`lesson${lesson.id}`} lesson={lesson} />
            </Grid.Row>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default AllLessons;
