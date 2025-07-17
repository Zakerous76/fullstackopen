import React from "react";

const Header = (props) => <h1>{props.course}</h1>;

const Content = (props) => (
  <div>
    {props.parts.map((part) => (
      <Part part={part} key={part.id} />
    ))}
  </div>
);

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
);

const Total = (props) => (
  <p>
    <b>Number of exercises: {props.total}</b>
  </p>
);

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total
        // Already did it with reduce ;)
        total={course.parts.reduce((sum, part) => {
          return sum + part.exercises;
        }, 0)}
      />
    </div>
  );
};

export default Course;
