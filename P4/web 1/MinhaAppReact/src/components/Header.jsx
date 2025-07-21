import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

const Header = () => {
  return (
    <header>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">Censo Escolar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/instituicaoEnsino">Instituicao Ensino</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
