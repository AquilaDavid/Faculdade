import { Col, Container, Nav, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <Container fluid>
        <Row className="bg-primary text-white py-2 text-center">
          <Col md={4}>
            <small>
              <strong>Censo Escolar</strong><br />
              Instituições de ensino no Brasil
            </small>
          </Col>

          <Col md={4}>
            <Nav className="flex-column">
              <Link to="/" className="text-white small">
                Home
              </Link>
              <Link to="/instituicaoensino" className="text-white small">
                Instituição de Ensino
              </Link>
            </Nav>
          </Col>

          <Col md={4}>
            <small>
              email@fakeemail.com <br />
              +1(800)867-5309
            </small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
