import { useState, useEffect } from 'react';
import {
  Button,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Table,
} from 'react-bootstrap';
import axios from 'axios';
import instituicoesEnsino from '../../datasets/cencoescolar';
import './InstituicaoEnsino.css';

const InstituicaoEnsino = () => {
  const [instituicaoEnsino, setInstituicaoEnsino] = useState({
    codigo: '',
    nome: '',
    uf: '',
    municipio: '',
    regiao: '',
  });

  const [ufs, setUfs] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(!show);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInstituicaoEnsino((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Buscar UFs ao carregar o componente
  useEffect(() => {
    axios
      .get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .then((res) => {
        const estadosOrdenados = res.data.sort((a, b) =>
          a.sigla.localeCompare(b.sigla)
        );
        setUfs(estadosOrdenados);
      });
  }, []);

  // Buscar municípios quando UF mudar
  useEffect(() => {
    if (instituicaoEnsino.uf) {
      axios
        .get(
          `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${instituicaoEnsino.uf}/municipios`
        )
        .then((res) => setMunicipios(res.data));

      const estadoSelecionado = ufs.find(
        (uf) => uf.sigla === instituicaoEnsino.uf
      );
      if (estadoSelecionado) {
        setInstituicaoEnsino((prev) => ({
          ...prev,
          regiao: estadoSelecionado.regiao.nome,
        }));
      }
    } else {
      setMunicipios([]);
      setInstituicaoEnsino((prev) => ({ ...prev, regiao: '' }));
    }
  }, [instituicaoEnsino.uf, ufs]);

  return (
    <Container className="mt-2">
      <Row>
        <Col sm={8}>Buscar</Col>
        <Col sm={4}>
          <Button
            variant="primary"
            style={{ float: 'right' }}
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
              {instituicoesEnsino.map((instituicao, i) => (
                <tr key={i}>
                  <td>{instituicao.codigo}</td>
                  <td>{instituicao.nome}</td>
                  <td>{instituicao.no_uf}</td>
                  <td>{instituicao.no_municipio}</td>
                  <td>{instituicao.no_regiao}</td>
                  <td>{instituicao.qt_mat_bas}</td>
                  <td>{instituicao.qt_mat_prof}</td>
                  <td>{instituicao.qt_mat_eja}</td>
                  <td>{instituicao.qt_mat_esp}</td>
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
                <Form.Group className="mb-3">
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
                <Form.Group className="mb-3">
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
                <Form.Group className="mb-3">
                  <Form.Label>UF</Form.Label>
                  <Form.Select
                    name="uf"
                    value={instituicaoEnsino.uf}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecione...</option>
                    {ufs.map((uf) => (
                      <option key={uf.id} value={uf.sigla}>
                        {uf.sigla}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Município</Form.Label>
                  <Form.Select
                    name="municipio"
                    value={instituicaoEnsino.municipio}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecione...</option>
                    {municipios.map((m) => (
                      <option key={m.id} value={m.nome}>
                        {m.nome}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Região</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Região"
                    name="regiao"
                    value={instituicaoEnsino.regiao}
                    readOnly
                  />
                </Form.Group>
              </Col>
            </Row>

            <Button
              variant="warning"
              onClick={(e) => console.log(instituicaoEnsino)}
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

export default InstituicaoEnsino;
