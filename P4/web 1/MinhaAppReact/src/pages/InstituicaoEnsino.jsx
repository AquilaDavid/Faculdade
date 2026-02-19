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
  const [dadosOriginais, setDadosOriginais] = useState([]);
  const [dadosFiltrados, setDadosFiltrados] = useState([]);
  const [instituicoes, setInstituicoes] = useState([]);

  const [busca, setBusca] = useState('');

  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [totalElements, setTotalElements] = useState(0);

  const [editando, setEditando] = useState(false);

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

  const [estados] = useState(estadosDataset);
  const [municipios, setMunicipios] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    fetch('/instituicoes_paraiba.json')
      .then((response) => response.json())
      .then((data) => {
        setDadosOriginais(data);
        setDadosFiltrados(data);
        aplicarPaginacao(data, 0, size);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    aplicarPaginacao(dadosFiltrados, page, size);
  }, [page, dadosFiltrados]);

  const aplicarPaginacao = (data, page, size) => {
    const start = page * size;
    const end = start + size;
    const paginado = data.slice(start, end);

    setInstituicoes(paginado);
    setTotalElements(data.length);
  };

  const totalPages = Math.ceil(totalElements / size);

  const handleBusca = (valor) => {
    setBusca(valor);
    setPage(0);

    if (!valor) {
      setDadosFiltrados(dadosOriginais);
      return;
    }

    const buscaLower = valor.toLowerCase();

    const filtrado = dadosOriginais.filter((inst) => {
      return (
        inst.nome?.toLowerCase().includes(buscaLower) ||
        inst.municipio?.nome?.toLowerCase().includes(buscaLower) ||
        inst.regiao?.codigo?.toString().includes(valor)
      );
    });

    setDadosFiltrados(filtrado);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInstituicaoEnsino((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeEstado = (event) => {
    const codigo = event.target.value;
    const estado = getEstadoByCodigo(codigo);
    const regiao = estado?.regiao || { codigo: '', nome: '' };

    const municipiosSelecionados = getMunicipiosByEstado(codigo);

    setInstituicaoEnsino((prev) => ({
      ...prev,
      estado,
      regiao,
      municipio: { codigo: '', nome: '' },
    }));

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

  const handleEditar = (inst) => {
    setInstituicaoEnsino(inst);
    setEditando(true);
    setShow(true);

    const municipiosSelecionados = getMunicipiosByEstado(
      inst.estado?.codigo
    );
    setMunicipios(municipiosSelecionados);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (editando) {
      const atualizado = dadosOriginais.map((inst) =>
        inst.codigo === instituicaoEnsino.codigo
          ? instituicaoEnsino
          : inst
      );

      setDadosOriginais(atualizado);
      setDadosFiltrados(atualizado);

      toast('Instituição atualizada com sucesso!');
    }

    setShow(false);
    setEditando(false);
  };

  return (
    <Container className="mt-2">
      <Row className="mb-3">
        <Col sm={8}>
          <Form.Control
            type="text"
            placeholder="Buscar por escola, município ou código da região"
            value={busca}
            onChange={(e) => handleBusca(e.target.value)}
          />
        </Col>
      </Row>

      <Row>
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
              {instituicoes.map((inst, i) => (
                <tr key={i}>
                  <td>{inst.codigo}</td>
                  <td>{inst.nome}</td>
                  <td>{inst.estado?.nome}</td>
                  <td>{inst.municipio?.nome}</td>
                  <td>{inst.regiao?.nome}</td>
                  <td>{inst.qt_mat_bas}</td>
                  <td>{inst.qt_mat_prof}</td>
                  <td>{inst.qt_mat_eja}</td>
                  <td>{inst.qt_mat_esp}</td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      className="me-2"
                      onClick={() => handleEditar(inst)}
                    >
                      Editar
                    </Button>

                    <Button variant="danger" size="sm">
                      Apagar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="d-flex justify-content-center mt-3 gap-3">
            <Button
              disabled={page === 0}
              onClick={() => setPage(page - 1)}
            >
              Anterior
            </Button>

            <span>
              Página {page + 1} de {totalPages || 1}
            </span>

            <Button
              disabled={page + 1 >= totalPages}
              onClick={() => setPage(page + 1)}
            >
              Próxima
            </Button>
          </div>
        </Col>
      </Row>

      <Modal show={show} onHide={() => setShow(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Editar Instituição</Modal.Title>
        </Modal.Header>

        <Form onSubmit={handleSubmit}>
          <Modal.Body>

            <Form.Group className="mb-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                name="nome"
                value={instituicaoEnsino.nome}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Estado</Form.Label>
                  <Form.Select
                    value={instituicaoEnsino.estado?.codigo}
                    onChange={handleChangeEstado}
                    required
                  >
                    <option value="">Selecione</option>
                    {estados.map((estado) => (
                      <option
                        key={estado.codigo}
                        value={estado.codigo}
                      >
                        {estado.nome}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Município</Form.Label>
                  <Form.Select
                    value={instituicaoEnsino.municipio?.codigo}
                    onChange={handleChangeMunicipio}
                    required
                  >
                    <option value="">Selecione</option>
                    {municipios.map((municipio) => (
                      <option
                        key={municipio.codigo}
                        value={municipio.codigo}
                      >
                        {municipio.nome}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Região</Form.Label>
              <Form.Control
                type="text"
                value={instituicaoEnsino.regiao?.nome}
                disabled
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Matrículas Básico</Form.Label>
                  <Form.Control
                    type="number"
                    name="qt_mat_bas"
                    value={instituicaoEnsino.qt_mat_bas}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Matrículas Profissional</Form.Label>
                  <Form.Control
                    type="number"
                    name="qt_mat_prof"
                    value={instituicaoEnsino.qt_mat_prof}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Matrículas EJA</Form.Label>
                  <Form.Control
                    type="number"
                    name="qt_mat_eja"
                    value={instituicaoEnsino.qt_mat_eja}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Matrículas Especial</Form.Label>
                  <Form.Control
                    type="number"
                    name="qt_mat_esp"
                    value={instituicaoEnsino.qt_mat_esp}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

          </Modal.Body>

          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShow(false)}
            >
              Cancelar
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
