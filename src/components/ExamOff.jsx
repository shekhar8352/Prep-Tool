import React from 'react'
import { Container, Card, CardGroup} from 'react-bootstrap';

const ExamOff = () => {
  const exams = [
    { title: 'JEE', description: 'Joint Entrance Examination' },
    { title: 'NEET', description: 'National Eligibility Cum Entrance Test' },
    { title: 'CAT', description: 'Common Admission Test' },
    { title: 'GATE', description: 'Graduate Aptitude Test in Engineering' },
    // Add more exam details as needed
  ];

  return (
    <Container className="mt-5" id="exams">
        <h2>Exams Offered</h2>
        <CardGroup>
          {exams.map((exam, index) => (
            <Card key={index}>
              <Card.Body>
                <Card.Title>{exam.title}</Card.Title>
                <Card.Text>{exam.description}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </CardGroup>
      </Container>
  )
}

export default ExamOff;