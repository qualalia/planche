import React from "react";
import { Item, Label, Grid, Header } from "semantic-ui-react";
import {
  dayAndDateOptions,
  hourAndMinuteOptions,
} from "../script/CONSTANTS.js";

const SingleLesson = props => {
  const {
    title,
    description,
    cap,
    startTime,
    endTime,
    instructor,
  } = props.lesson;
  const instructorName = instructor.displayName;
  const studio = "Studio Name";
  return (
    <Grid.Row columns={3} className="lesson-row">
      {/* Time Info */}
      <Grid.Column rows={2} width={3}>
        <Grid.Row>
          <Item.Group relaxed>
            <Item>
              <Item.Content verticalAlign="middle">
                <Item.Header>
                  <Header inverted as="h3" textAlign="center">
                    {new Date(startTime).toLocaleString(
                      undefined,
                      hourAndMinuteOptions
                    )}
                    {" - "}
                    {new Date(endTime).toLocaleString(
                      undefined,
                      hourAndMinuteOptions
                    )}
                  </Header>
                </Item.Header>
              </Item.Content>
            </Item>
            <Item>
              <Item.Content verticalAlign="middle">
                <Item.Header>
                  <Header inverted as="h3" textAlign="center">
                    {(new Date(endTime) - new Date(startTime)) / (1000 * 60)}
                    {" mins"}
                  </Header>
                </Item.Header>
              </Item.Content>
            </Item>
          </Item.Group>
        </Grid.Row>
        <Grid.Row />
      </Grid.Column>
      {/*  */}
      {/* Lesson Info */}
      {/*  */}
      <Grid.Column width={10}>
        <Item.Group relaxed>
          <Item>
            <Item.Content verticalAlign="middle">
              <Item.Header>
                <Header inverted textAlign="center" as="h1">
                  {title}
                </Header>
              </Item.Header>
            </Item.Content>
          </Item>
          <Item>
            <Item.Content>
              <Item.Header>
                <Header inverted textAlign="left" as="h3">
                  {description}
                </Header>
              </Item.Header>
            </Item.Content>
          </Item>
        </Item.Group>
      </Grid.Column>
      <Grid.Column width={2}>
        <Item.Group relaxed className="coach-and-studio">
          <Item>
            <Item.Content verticalAlign="middle">
              <Item.Header>
                <Header inverted textAlign="left" as="h3">
                  {instructorName}
                </Header>
              </Item.Header>
            </Item.Content>
          </Item>
          <Item>
            <Item.Content verticalAlign="middle">
              <Item.Header>
                <Header inverted textAlign="left" as="h3">
                  {studio}
                </Header>
              </Item.Header>
            </Item.Content>
          </Item>
        </Item.Group>
      </Grid.Column>
    </Grid.Row>
  );
};

export default SingleLesson;
