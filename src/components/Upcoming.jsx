import React from "react";
import { Card } from "react-bootstrap";

const Upcoming = () => {
  return (
    <Card>
      <Card.Header>
        <h3>Upcoming Exams</h3>
      </Card.Header>
      <Card.Body>
        <ul>
          <li>Physics Exam - October 15, 2023</li>
          <li>Math Exam - October 20, 2023</li>
          {/* Add more upcoming exams */}
        </ul>
      </Card.Body>
    </Card>
  );
};

export default Upcoming;
