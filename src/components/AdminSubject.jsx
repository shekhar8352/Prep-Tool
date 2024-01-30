import React, { useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import AddSubject from './AddSubject';
import ViewSubject from './ViewSubject';

const AdminSubject = () => {
    const [activeTab, setActiveTab] = useState('add-subject');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'add-subject':
        return <AddSubject />;
      case 'view-subject':
        return <ViewSubject />;
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
                  className={`nav-link ${activeTab === 'add-subject' ? 'active' : ''}`}
                  onClick={() => handleTabClick('add-subject')}
                >
                  Add Subject
                </div>
              </div>
              <div className="nav-item">
                <div
                  className={`nav-link ${activeTab === 'view-subject' ? 'active' : ''}`}
                  onClick={() => handleTabClick('view-subject')}
                >
                  Subject
                </div>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        {renderActiveTab()}

      </Container>
  )
}

export default AdminSubject