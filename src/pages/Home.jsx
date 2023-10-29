import React from 'react';
import { Container} from 'react-bootstrap';
import NavbarTop from '../components/NavbarTop';
import ExamOff from '../components/ExamOff';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div>
      <NavbarTop />

      <Container className="mt-5" id="intro">
        <h1>Welcome to PrepTool</h1>
        <p>Your path to success starts here.</p>
      </Container>

      <ExamOff />

      <Container className="mt-5" id="features">
        <h2>Features</h2>
        <ul>
          <li>Practice for various competitive exams.</li>
          <li>Track your progress and performance with detailed analytics.</li>
          {/* Add more features as needed */}
        </ul>
      </Container>

      <Footer />
    </div>
  );
};

export default HomePage;
