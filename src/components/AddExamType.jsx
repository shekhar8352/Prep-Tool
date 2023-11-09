import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import sampleExams from '../Sample Data/exam-name.json'; // Import your JSON file

const AddExamType = () => {
  const [examName, setExamName] = useState('');
  const [numSections, setNumSections] = useState(1);
  const [sections, setSections] = useState([]);
  const [isFixedQuestions, setIsFixedQuestions] = useState(true);
  const [numQuestionsPerSection, setNumQuestionsPerSection] = useState(0);

  const handleNumSectionsChange = (value) => {
    setNumSections(value);
    const updatedSections = new Array(value).fill({ name: '', numQuestions: 0 });
    setSections(updatedSections);
  };

  const handleSectionNameChange = (index, value) => {
    const updatedSections = [...sections];
    updatedSections[index] = { name: value, numQuestions: 0 };
    setSections(updatedSections);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newExam = {
      examName: examName,
      numSections: numSections,
      isFixedQuestions: isFixedQuestions,
      numQuestionsPerSection: isFixedQuestions ? numQuestionsPerSection : 0,
      sections: sections,
    };

    const updatedExams = [...sampleExams, newExam];

    // Optionally, you can log the updated data for verification
    console.log(updatedExams);

    // You can use the updatedExams array as needed in your application

    // If you want to save the updated data to a JSON file, you will need server-side code to handle this.
  };

  return (
    <Container>
      <h1>Add Exam Type</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="examName">
          <Form.Label>Exam Name:</Form.Label>
          <Form.Control
            type="text"
            value={examName}
            onChange={(e) => setExamName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="numSections">
          <Form.Label>Number of Sections:</Form.Label>
          <Form.Control
            type="number"
            value={numSections}
            onChange={(e) => handleNumSectionsChange(parseInt(e.target.value, 10))}
          />
        </Form.Group>

        <Form.Group controlId="sections">
          <Form.Label>Section Names:</Form.Label>
          {sections.map((section, index) => (
            <Form.Control
              key={index}
              type="text"
              placeholder={`Section ${index + 1} Name`}
              value={section.name}
              onChange={(e) => handleSectionNameChange(index, e.target.value)}
            />
          ))}
        </Form.Group>

        <Form.Group controlId="isFixedQuestions">
          <Form.Check
            type="checkbox"
            label="Fixed Number of Questions per Section"
            checked={isFixedQuestions}
            onChange={(e) => setIsFixedQuestions(e.target.checked)}
          />
        </Form.Group>

        {isFixedQuestions && (
          <Form.Group controlId="numQuestionsPerSection">
            <Form.Label>Number of Questions per Section:</Form.Label>
            <Form.Control
              type="number"
              value={numQuestionsPerSection}
              onChange={(e) => setNumQuestionsPerSection(parseInt(e.target.value, 10))}
            />
          </Form.Group>
        )}

        <Button variant="primary" type="submit">
          Add Exam Type
        </Button>
      </Form>
    </Container>
  );
};

export default AddExamType;
