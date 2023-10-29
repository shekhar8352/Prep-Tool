import React from 'react';
import { Container, Card, Row, Col, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NavbarNormal from '../components/NavbarNormal';
import Upcoming from '../components/Upcoming';
import RecentProb from '../components/RecentProb';
import Footer from '../components/Footer';

const Dashboard = () => {
  const recentExams = [
    { title: 'Mock Exam 1', score: 85, id: 1},
    { title: 'Practice Test 2', score: 78, id: 2},
    { title: 'Sample Exam 3', score: 92, id: 3},
    // Add more recent exams as needed
  ];

  const enrolledExams = [
    {
      title: 'Physics Exam',
      solvedProblems: 50,
      mockExams: 3,
      easySolved: 20,
      mediumSolved: 15,
      hardSolved: 15,
    },
    {
      title: 'Math Exam',
      solvedProblems: 45,
      mockExams: 2,
      easySolved: 18,
      mediumSolved: 14,
      hardSolved: 13,
    },
    // Add more enrolled exams as needed
  ];

  return (
    <div>

    <NavbarNormal />

      <Container className="mt-4">
        <h2>Welcome, John Doe</h2>
        <p>Your upcoming exams and recent performance:</p>
      </Container>

      <Container className="mt-4">
        <Row>
          <Col lg={8}>
            <Upcoming />
          </Col>

          <Col lg={4}>
            <Card>
              <Card.Header>
                <h3>Recent Exams</h3>
              </Card.Header>
              <Card.Body>
                <ul>
                  {recentExams.map((exam) => (
                    <li key={exam.id}>
                      <Link to={`/exam-analysis/${exam.id}`}>{exam.title}</Link> - Score: {exam.score}
                    </li>
                  ))}
                </ul>
                <Link to="/exam-history">
                  <Button variant="primary">View More</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Container className="mt-4">
        <h2>Your Enrolled Exams</h2>
        <Row>
          {enrolledExams.map((exam, index) => (
            <Col key={index} lg={4}>
              <Card>
                <Card.Header>
                  <h4>{exam.title}</h4>
                </Card.Header>
                <Card.Body>
                  <p>Total Problems Solved: {exam.solvedProblems}</p>
                  <p>Total Mock Exams Attempted: {exam.mockExams}</p>
                  <p>Easy Solved: {exam.easySolved}</p>
                  <p>Medium Solved: {exam.mediumSolved}</p>
                  <p>Hard Solved: {exam.hardSolved}</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <Container className="mt-4">
        <Button as={Link} to="/home" variant="primary" className="mr-3">
          Start a New Exam
        </Button>
      </Container>

      <RecentProb />

      <Footer />
    </div>
  );
};

export default Dashboard;
