import React, { useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import AddExam from './AddExam';
import ViewExam from './ViewExam';

const AdminExam = () => {
  const [activeTab, setActiveTab] = useState('add-exam');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'add-exam':
        return <AddExam />;
      case 'view-exam':
        return <ViewExam />;
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
                  className={`nav-link ${activeTab === 'add-exam' ? 'active' : ''}`}
                  onClick={() => handleTabClick('add-exam')}
                >
                  Add Exam
                </div>
              </div>
              <div className="nav-item">
                <div
                  className={`nav-link ${activeTab === 'view-exam' ? 'active' : ''}`}
                  onClick={() => handleTabClick('view-exam')}
                >
                  Exam
                </div>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        {renderActiveTab()}

      </Container>
  )
}

export default AdminExam