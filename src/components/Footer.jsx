import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4">
      <Container>
        <div className="text-center">
          <h3>PrepTool</h3>
          <p>Your go-to platform for exam preparation</p>
          <p>&copy; 2023 PrepTool. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
