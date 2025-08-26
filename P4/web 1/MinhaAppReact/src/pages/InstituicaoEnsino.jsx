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
import { ToastContainer, toast } from 'react-toastify';
import './InstituicaoEnsino.css';
import { estadosDataset, getEstadoByCodigo } from '../datasets/estados';
import {
  getMunicipiosByEstado,
  getMunicipioByCodigo,
} from '../datasets/cidades';

const InstituicaoEnsino = () => {
  const [instituicoesEnsino, setInstituicoesEnsino] = useState([]);

  const [instituicaoEnsino, setInstituicaoEnsino] = useState({
    codigo: '',
    nome: '',
    estado: { codigo: '', nome: '' },
    municipio: { codigo: '', nome: '' },
    regiao: { codigo: '', nome: '' },
    qt_mat_bas: '',
    qt_mat_prof: '',
    qt_mat_eja: '',
    qt_mat_esp: '',
  });

  const [estados, setEstados] = useState(estadosDataset);
  const [municipios, setMunicipios] = useState([]);
  const [show, setShow] = useState(false);

  // Carregar dados do LocalStorage
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('instituicoesEnsino')) || [];
    setInstituicoesEnsino(data);
  }, []);

  const handleShow = () => setShow(!show);

  // Salvar instituição
  const handleSubmit = (event) => {
    event.preventDefault();

    const novasInstituicoes = [...instituicoesEnsino, instituicaoEnsino];

    setInstituicoesEnsino(novasInstituicoes);
    localStorage.setItem('instituicoesEnsino', JSON.stringify(novasInstituicoes));

    toast('Instituição inserida com sucesso!');
    handleShow();

    // Limpar formulário
    setInstituicaoEnsino({
      codigo: '',
      nome: '',
      estado: { codigo: '', nome: '' },
      municipio: { codigo: '', nome: '' },
      regiao: { codigo: '', nome: '' },
      qt_mat_bas: '',
      qt_mat_prof: '',
      qt_mat_eja: '',
      qt_mat_esp: '',
    });
    setMunicipios([]);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInstituicaoEnsino({ ...instituicaoEnsino, [name]: value });
  };

  const handleChangeEstado = (event) => {
    const codigo = event.target.value;
    const estado = getEstadoByCodigo(codigo);
    const regiao = estado?.regiao || { codigo: '', nome: '' };
    setInstituicaoEnsino((prev) => ({
      ...prev,
      estado,
      regiao,
      municipio: { codigo: '', nome: '' }, // Resetar município ao mudar estado
    }));
    const municipiosSelecionados = getMunicipiosByEstado(codigo);
    setMunicipios(municipiosSelecionados);
  };

  const handleChangeMunicipio = (event) => {
    const codigo = event.target.value;
    const municipio = getMunicipioByCodigo(codigo);
    setInstituicaoEnsino((prev) => ({
      ...prev,
      municipio,
    }));
  };

  // Apagar instituição
  const handleDelete = (codigo) => {
    const filtradas = instituicoesEnsino.filter((i) => i.codigo !== codigo);
    setInstituicoesEnsino(filtradas);
    localStorage.setItem('instituicoesEnsino', JSON.stringify(filtradas));
    toast('Instituição apagada com sucesso!');
  };

  return (
    <Container className="mt-2">
      <Row>
        <Col sm={8}>Buscar</Col>
        <Col sm={4}>
          <Button variant="primary" style={{ float: 'right' }} onClick={handleShow}>
            +
          </Button>
        </Col>
      </Row>

      {/* Tabela */}
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
                <th>Mat. Profissional</th>
                <th>Mat. EJA</th>
                <th>Mat. Especial</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {instituicoesEnsino.map((inst, i) => (
                <tr key={i}>
                  <td>{inst.codigo}</td>
                  <td>{inst.nome}</td>
                  <td>{inst.estado.nome}</td>
                  <td>{inst.municipio.nome}</td>
                  <td>{inst.regiao.nome}</td>
                  <td>{inst.qt_mat_bas}</td>
                  <td>{inst.qt_mat_prof}</td>
                  <td>{inst.qt_mat_eja}</td>
                  <td>{inst.qt_mat_esp}</td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(inst.codigo)}
                    >
                      Apagar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      {/* Modal */}
      <Modal show={show} onHide={handleShow} dialogClassName="modal-80w">
        <Modal.Header closeButton>
          <Modal.Title>Instituição de Ensino</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
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
                  <Form.Label>Estado</Form.Label>
                  <Form.Select
                    value={instituicaoEnsino.estado.codigo}
                    onChange={handleChangeEstado}
                  >
                    <option value="">-</option>
                    {estados.map((estado, i) => (
                      <option key={i} value={estado.codigo}>
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
                    value={instituicaoEnsino.municipio.codigo}
                    onChange={handleChangeMunicipio}
                  >
                    <option value="">-</option>
                    {municipios.map((municipio, i) => (
                      <option key={i} value={municipio.codigo}>
                        {municipio.nome}
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
                    value={instituicaoEnsino.regiao.nome}
                    readOnly
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col sm={3}>
                <Form.Group className="mb-3">
                  <Form.Label>Matrícula Básico</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Matrícula Básico"
                    name="qt_mat_bas"
                    value={instituicaoEnsino.qt_mat_bas}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col sm={3}>
                <Form.Group className="mb-3">
                  <Form.Label>Matrícula Profissional</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Matrícula Profissional"
                    name="qt_mat_prof"
                    value={instituicaoEnsino.qt_mat_prof}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col sm={3}>
                <Form.Group className="mb-3">
                  <Form.Label>Matrícula EJA</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Matrícula EJA"
                    name="qt_mat_eja"
                    value={instituicaoEnsino.qt_mat_eja}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col sm={3}>
                <Form.Group className="mb-3">
                  <Form.Label>Matrícula Especial</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Matrícula Especial"
                    name="qt_mat_esp"
                    value={instituicaoEnsino.qt_mat_esp}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleShow}>
              Fechar
            </Button>
            <Button
              variant="danger"
              onClick={() => handleDelete(instituicaoEnsino.codigo)}
            >
              Apagar
            </Button>
            <Button type="submit" variant="primary">
              Salvar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <ToastContainer />
    </Container>
  );
};

export default InstituicaoEnsino;
