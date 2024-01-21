import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Onboarding = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enrolledExams, setEnrolledExams] = useState([]);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchExams = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/exam', {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          console.error('Fetch error:', response.status);
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Fetched Exams:', data);
        setExams(data);
      } catch (error) {
        console.error('Error fetching exams:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, []);

  const enrollInExam = async (examId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token not found in local storage');
        return;
      }

      const response = await fetch(`http://localhost:5000/api/user/enrollUser/${examId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
      });

      if (!response.ok) {
        console.error('Enroll error:', response.status);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      console.log('Enrolled in exam successfully');
      // Handle any additional logic after successful enrollment

      // Update the list of enrolled exams
      setEnrolledExams((prevEnrolledExams) => [...prevEnrolledExams, examId]);
    } catch (error) {
      console.error('Error enrolling in exam:', error.message);
    }
  };

  const handleSubmit = () => {
    // Redirect to "/dashboard"
    navigate('/dashboard');
  };

  // Enable the Submit button if at least one exam is enrolled
  useEffect(() => {
    setIsSubmitDisabled(enrolledExams.length === 0);
  }, [enrolledExams]);

  return (
    <Container className="mt-4">
      <h2>Available Exams</h2>
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : (
        <div>
          {exams.map((exam) => (
            <Card key={exam._id} className="mb-3">
              <Card.Body>
                <Card.Title>{exam.name}</Card.Title>
                <Card.Text>{exam.about_exam}</Card.Text>
                {exam.enrolled ? (
                  <Button variant="success" disabled>
                    Enrolled
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    onClick={() => enrollInExam(exam._id)}
                  >
                    Enroll
                  </Button>
                )}
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
      <Button
        variant="primary"
        onClick={handleSubmit}
        disabled={isSubmitDisabled}
        className="mt-3"
      >
        Submit
      </Button>
      <Button
        variant="primary"
        onClick={handleSubmit}
        className="mt-3"
      >
        Skip
      </Button>
    </Container>
  );
};

export default Onboarding;
