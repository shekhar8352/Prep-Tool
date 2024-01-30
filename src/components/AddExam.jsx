import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import Select from 'react-select';

const AddExam = () => {
    const [examData, setExamData] = useState({
        name: '',
        subject_ids: [],
        test_ids: [],
        about_exam: '',
    });

    const [subjects, setSubjects] = useState([]);

    useEffect(() => {
        fetchSubjects();
    }, []);

    const fetchSubjects = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/subject', {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': localStorage.getItem('token'),
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setSubjects(data);
        } catch (error) {
            console.error('Error fetching subjects:', error.message);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setExamData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSelectChange = (selectedOptions, field) => {
        setExamData((prevData) => ({
            ...prevData,
            [field]: selectedOptions.map(option => option.value),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const requestBody = {
            name: examData.name,
            subject_ids: examData.subject_ids,
            test_ids: examData.test_ids,
            about_exam: examData.about_exam,
        };

        try {
            const response = await fetch('http://localhost:5000/api/exam/createExam', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': localStorage.getItem('token'),
                    // Add any additional headers as needed
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Exam added successfully:', data);

            // Clear form fields after successful submission
            setExamData({
                name: '',
                subject_ids: [],
                test_ids: [],
                about_exam: '',
            });

            // Add any additional logic or state updates as needed
        } catch (error) {
            console.error('Error adding exam:', error.message);
            // Handle errors, display a message to the user, etc.
        }
    };

    return (
        <div className="container mt-4">
            <h2>Add Exam</h2>
            <Form onSubmit={handleSubmit}>
                {/* Name */}
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter the exam name"
                        name="name"
                        value={examData.name}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                {/* Subject IDs */}
                <Form.Group controlId="subject_ids">
                    <Form.Label>Subject IDs</Form.Label>
                    <Select
                        isMulti
                        name="subject_ids"
                        options={subjects.map((subject) => ({
                            value: subject._id,
                            label: subject.name,
                        }))}
                        value={examData.subject_ids.map((subject_id) => ({
                            value: subject_id,
                            label: subjects.find(subject => subject._id === subject_id).name,
                        }))}
                        onChange={(selectedOptions) =>
                            handleSelectChange(selectedOptions, "subject_ids")
                        }
                    />
                </Form.Group>

                {/* Test IDs */}
                <Form.Group controlId="test_ids">
                    <Form.Label>Test IDs</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter test IDs (comma-separated)"
                        name="test_ids"
                        value={examData.test_ids.join(',')}
                        onChange={handleChange}
                    />
                </Form.Group>

                {/* About Exam */}
                <Form.Group controlId="about_exam">
                    <Form.Label>About Exam</Form.Label>
                    <Form.Control
                        as="textarea"
                        placeholder="Enter information about the exam"
                        name="about_exam"
                        value={examData.about_exam}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default AddExam;
