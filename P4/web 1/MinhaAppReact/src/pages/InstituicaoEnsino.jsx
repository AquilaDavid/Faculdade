import { useEffect, useState } from 'react';
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

  // Carregar UFs
  useEffect(() => {
    axios
      .get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .then((response) => {
        const estadosOrdenados = response.data.sort((a, b) =>
          a.nome.localeCompare(b.nome)
        );
        setUfs(estadosOrdenados);
      });
  }, []);

  // Carregar municípios + região ao mudar UF
  useEffect(() => {
    if (instituicaoEnsino.uf) {
      axios
        .get(
          `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${instituicaoEnsino.uf}/municipios`
        )
        .then((response) => {
          const municipiosOrdenados = response.data.sort((a, b) =>
            a.nome.localeCompare(b.nome)
          );
          setMunicipios(municipiosOrdenados);
        });

      const regioes = {
        Norte: ['AC', 'AP', 'AM', 'PA', 'RO', 'RR', 'TO'],
        Nordeste: ['AL', 'BA', 'CE', 'MA', 'PB', 'PE', 'PI', 'RN', 'SE'],
        'Centro-Oeste': ['DF', 'GO', 'MT', 'MS'],
        Sudeste: ['ES', 'MG', 'RJ', 'SP'],
        Sul: ['PR', 'RS', 'SC'],
      };

      const regiaoEncontrada = Object.entries(regioes).find(([_, estados]) =>
        estados.includes(instituicaoEnsino.uf)
      );

      if (regiaoEncontrada) {
        setInstituicaoEnsino((prev) => ({
          ...prev,
          regiao: regiaoEncontrada[0],
        }));
      }
    } else {
      setMunicipios([]);
      setInstituicaoEnsino((prev) => ({ ...prev, municipio: '', regiao: '' }));
    }
  }, [instituicaoEnsino.uf]);

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
              {instituicoesEnsino.map((item, i) => (
                <tr key={i}>
                  <td>{item.codigo}</td>
                  <td>{item.nome}</td>
                  <td>{item.no_uf}</td>
                  <td>{item.no_municipio}</td>
                  <td>{item.no_regiao}</td>
                  <td>{item.qt_mat_bas}</td>
                  <td>{item.qt_mat_prof}</td>
                  <td>{item.qt_mat_eja}</td>
                  <td>{item.qt_mat_esp}</td>
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
                    <option value="">Selecione o estado</option>
                    {ufs.map((estado) => (
                      <option key={estado.id} value={estado.sigla}>
                        {estado.nome}
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
                    disabled={!municipios.length}
                  >
                    <option value="">Selecione o município</option>
                    {municipios.map((mun) => (
                      <option key={mun.id} value={mun.nome}>
                        {mun.nome}
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
                    name="regiao"
                    value={instituicaoEnsino.regiao}
                    readOnly
                  />
                </Form.Group>
              </Col>
            </Row>

            <Button
              variant="warning"
              onClick={() => {
                console.log(instituicaoEnsino);
              }}
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
