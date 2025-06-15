import { Navbar, Nav, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Contato from '../pages/Contato';
import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as = {NavLink} to = "/Home">MinhaAppReact</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to = "/Home">Início</Nav.Link>
            <Nav.Link href="#sobre">Sobre</Nav.Link>
            
            <Nav.Link as={NavLink} to= "/Contato">Contato</Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;