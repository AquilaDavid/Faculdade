import { useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import instituicoesEnsino from "../../datasets/cencoescolar";
import ufs from "../../datasets/estados";
import municipiosData from "../../datasets/estados"; // JSON local
import "./InstituicaoEnsino.css";

const Instituicao_Ensino = () => {
  const [instituicaoEnsino, setInstituicaoEnsino] = useState({
    codigo: "",
    nome: "",
    uf: "",
    municipio: "",
    regiao: "",
  });

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(!show);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInstituicaoEnsino({ ...instituicaoEnsino, [name]: value });
  };

  const handleUFChange = (e) => {
    const siglaUF = e.target.value;
    const ufSelecionada = ufs.find((uf) => uf.sigla === siglaUF);
    setInstituicaoEnsino({
      ...instituicaoEnsino,
      uf: siglaUF,
      regiao: ufSelecionada?.regiao || "",
      municipio: "",
    });
  };

  const handleMunicipioChange = (e) => {
    setInstituicaoEnsino({
      ...instituicaoEnsino,
      municipio: e.target.value,
    });
  };

  return (
    <Container className="mt-2">
      <Row>
        <Col sm={8}>Buscar</Col>
        <Col sm={4}>
          <Button
            variant="primary"
            style={{ float: "right" }}
            onClick={handleShow}
          >
            +
          </Button>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Código</th>
                <th>Nome</th>
                <th>UF</th>
                <th>Município</th>
                <th>Região</th>
                <th>Mat. Básico</th>
                <th>Mat. da Educação Profissional</th>
                <th>Mat. da Educação de Jovens e Adultos (EJA)</th>
                <th>Mat. da Educação Especial</th>
              </tr>
            </thead>
            <tbody>
              {instituicoesEnsino.map((instituicaoEnsino, i) => (
                <tr key={i}>
                  <td>{instituicaoEnsino.codigo}</td>
                  <td>{instituicaoEnsino.nome}</td>
                  <td>{instituicaoEnsino.no_uf}</td>
                  <td>{instituicaoEnsino.no_municipio}</td>
                  <td>{instituicaoEnsino.no_regiao}</td>
                  <td>{instituicaoEnsino.qt_mat_bas}</td>
                  <td>{instituicaoEnsino.qt_mat_prof}</td>
                  <td>{instituicaoEnsino.qt_mat_eja}</td>
                  <td>{instituicaoEnsino.qt_mat_esp}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      <Modal show={show} onHide={handleShow} dialogClassName="modal-80w">
        <Modal.Header closeButton>
          <Modal.Title>Instituição de Ensino</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <Row>
              <Col sm={3}>
                <Form.Group className="mb-3" controlId="formGroupCodigo">
                  <Form.Label>Código</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Código"
                    name="codigo"
                    value={instituicaoEnsino.codigo}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col sm={9}>
                <Form.Group className="mb-3" controlId="formGroupNome">
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nome"
                    name="nome"
                    value={instituicaoEnsino.nome}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formUF">
                  <Form.Label>UF</Form.Label>
                  <Form.Select
                    name="uf"
                    value={instituicaoEnsino.uf}
                    onChange={handleUFChange}
                    required
                  >
                    <option value="">Selecione uma UF</option>
                    {ufs.map((uf) => (
                      <option key={uf.sigla} value={uf.sigla}>
                        {uf.estado} ({uf.sigla})
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formMunicipio">
                  <Form.Label>Município</Form.Label>
                  <Form.Select
                    name="municipio"
                    value={instituicaoEnsino.municipio}
                    onChange={handleMunicipioChange}
                    required
                    disabled={!instituicaoEnsino.uf}
                  >
                    <option value="">Selecione um município</option>
                    {(municipiosData[instituicaoEnsino.uf] || []).map((m, i) => (
                      <option key={i} value={m}>
                        {m}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formRegiao">
                  <Form.Label>Região</Form.Label>
                  <Form.Control
                    type="text"
                    name="regiao"
                    value={instituicaoEnsino.regiao}
                    readOnly
                  />
                </Form.Group>
              </Col>
            </Row>

            <Button
              variant="warning"
              onClick={() => console.log(instituicaoEnsino)}
            >
              Exibir
            </Button>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleShow}>
              Fechar
            </Button>
            <Button variant="danger">Apagar</Button>
            <Button type="submit" variant="primary" onClick={handleShow}>
              Salvar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default Instituicao_Ensino;
