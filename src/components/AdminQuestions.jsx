import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import ViewQuestions from './ViewQuestions'; // Import the component for viewing questions
import AddQuestion from './AddQuestion'; // Import the component for adding questions

const AdminQuestions = () => {
  const [activeTab, setActiveTab] = useState('add-question');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'add-question':
        return <AddQuestion />;
      case 'view-question':
        return <ViewQuestions />;
      default:
        return null;
    }
  };

  return (
      <Container>
        <Navbar bg="light" expand="lg">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            <div className="nav-item">
                <div
                  className={`nav-link ${activeTab === 'add-question' ? 'active' : ''}`}
                  onClick={() => handleTabClick('add-question')}
                >
                  Add Question
                </div>
              </div>
              <div className="nav-item">
                <div
                  className={`nav-link ${activeTab === 'view-question' ? 'active' : ''}`}
                  onClick={() => handleTabClick('view-question')}
                >
                  Questions
                </div>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        {renderActiveTab()}

      </Container>
  );
};

export default AdminQuestions;
