import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


function NavbarTop() {
  return (
    <Navbar bg="light" expand="lg">
    <Container>
      <Navbar.Brand>PrepTool</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link href="#intro">Intro</Nav.Link>
          <Nav.Link href="#exams">Exams Offered</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
        </Nav>
        <Link to="/login">
          <Button variant="primary">Log In</Button>
        </Link>
        <Link to="/signup">
          <Button variant="success">Sign Up</Button>
        </Link>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  );
}

export default NavbarTop;