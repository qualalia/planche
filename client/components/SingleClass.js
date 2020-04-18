import React from "react";
import { connect } from "react-redux";
import { fetchSingleClass } from "../store";
import { Item, Label } from "semantic-ui-react";
import {
  dayAndDateOptions,
  hourAndMinuteOptions,
} from "../script/CONSTANTS.js";

const SingleClass = props => {
  const {
    title,
    description,
    cap,
    startTime,
    endTime,
    instructor,
  } = props.theClass;
  const instructorName = instructor.displayName;
  return (
    <Item className="lesson-card">
      <Item.Content>
        <Item.Header>{title}</Item.Header>
        <Item.Meta>
          <div className="lesson-time-info">
            <span className="lesson-start-and-end">
              {new Date(startTime).toLocaleString(
                undefined,
                hourAndMinuteOptions
              )}
              {" - "}
              {new Date(endTime).toLocaleString(
                undefined,
                hourAndMinuteOptions
              )}
            </span>
            <span className="lesson-duration">
              {(new Date(endTime) - new Date(startTime)) / (1000 * 60)}
              {" minutes"}
            </span>
            <span className="lesson-day-and-date">
              {new Date(startTime).toLocaleString(undefined, dayAndDateOptions)}
            </span>
          </div>
        </Item.Meta>
        <Item.Header>{instructorName}</Item.Header>
        <Item.Description>{description}</Item.Description>
        <Item.Extra />
      </Item.Content>
    </Item>
  );
};

export default SingleClass;

/*
     <div className="single-class">
     <div className="class-title">{title}</div>
     <div className="class-description">{description}</div>
     <div className="class-instructor">{instructorName}</div>
     <div className="class-associated-studio">"studio, if any"</div>
     <div className
     <div className="class-start-time">
     {new Date(startTime).toLocaleDateString(undefined, {
     weekday: "long",
     month: "long",
     day: "numeric",
     timeZoneName: "short",
     hour: "numeric",
     minute: "numeric",
     })}
     </div>
     <div className="class-end-time">{endTime}</div>
     </div>
   */
