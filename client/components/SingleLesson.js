import React from "react";
import { Item, Label, Grid, Header } from "semantic-ui-react";
import {
  dayAndDateOptions,
  hourAndMinuteOptions,
} from "../script/CONSTANTS.js";

const SingleLesson = props => {
  const { circusClass, cap, startTime, endTime } = props.lesson;
  const { description, title, company, instructor } = circusClass;
  const instructorName = instructor.displayName;
  return (
    <Grid.Row columns={3} className="lesson-row">
      {/* Time Info */}
      <Grid.Column rows={2} width={3}>
        <Grid.Row>
          <Item.Group relaxed>
            <Item>
              <Item.Content verticalAlign="middle">
                <Item.Header>
                  <Header inverted as="h3" textAlign="left">
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
                  <Header inverted as="h3" textAlign="left">
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
      <Grid.Column width={8}>
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
          {company !== "n/a" && (
            <Item>
              <Item.Content verticalAlign="middle">
                <Item.Header>
                  <Header inverted textAlign="left" as="h3">
                    {company}
                  </Header>
                </Item.Header>
              </Item.Content>
            </Item>
          )}
        </Item.Group>
      </Grid.Column>
    </Grid.Row>
  );
};

export default SingleLesson;
