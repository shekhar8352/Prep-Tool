import React from 'react';
import { Container, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const RecentProblemsList = () => {
  const recentProblems = [
    {
      id: 1,
      name: 'Solving Linear Equations',
      tag: 'Easy',
      time: '2 hours ago',
      relatedTo: 'Math Exam 1',
    },
    {
      id: 2,
      name: 'Trigonometry Challenge',
      tag: 'Medium',
      time: '1 day ago',
      relatedTo: 'Math Exam 1',
    },
    {
      id: 3,
      name: 'Probability Simulation',
      tag: 'Hard',
      time: '3 days ago',
      relatedTo: 'Math Exam 2',
    },
    // Add more recent problems as needed
  ];

  // Sort the list by time in descending order (most recent first)
  recentProblems.sort((a, b) => {
    return new Date(b.time) - new Date(a.time);
  });

  return (
    <Container>
      <h2>Recent Problems Solved</h2>
      <Card>
        <ListGroup variant="flush">
          {recentProblems.map((problem, index) => (
            <ListGroupItem key={problem.id}>
              <Link to={`/problem/${problem.id}`}>
                <h5>{problem.name}</h5>
              </Link>
              <p className="text-muted text-right">{problem.time}</p>
              <p>
                {problem.tag} | {problem.relatedTo}
              </p>
            </ListGroupItem>
          ))}
        </ListGroup>
      </Card>
    </Container>
  );
};

export default RecentProblemsList;
