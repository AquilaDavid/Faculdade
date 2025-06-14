import {
  Container,
  Row,
  Col,
  Stack,
  Image,
  Nav,
  NavLink,
} from "react-bootstrap";

function Footer() {
  return (
    <footer>
      <Container fluid>
        <Row className="bg-primary text-white">
          <Col>
            <Stack>
              <Image
              src="
                https://images.pexels.com/photos/20491768/pexels-photo-20491768/free-photo-of-textura-parede-muro-rocha.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Uma images" 
                rounded
                width={150}
                height={150}
                />
                <h2>@dev.run</h2>
                <p>Componente do rodapé</p>

            </Stack>
          </Col>
          <Col>
            <Nav className="flex-column fs-5">
                <h5 className="text-white">Links úteis</h5>
                <NavLink href="#" className="text-white">Início</NavLink>
                <NavLink href="#" className="text-white">Sobre</NavLink>
                <NavLink href="#" className="text-white">Produtos</NavLink>
                <NavLink href="#" className="text-white">Trabalhe conosco</NavLink>

            </Nav>
          </Col>
          <Col>
            <h4>Contato</h4>
            <p>Email: email@gmail.com</p>
            <p>Telefone: (12) 2312-1212</p>

          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
