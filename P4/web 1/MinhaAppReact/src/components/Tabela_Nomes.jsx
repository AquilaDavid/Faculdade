import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import React, { useState } from 'react';
import pessoasDataBases from '../../datasets/pessoas';
import 'bootstrap/dist/css/bootstrap.min.css';



function Tabela_Nomes() {

    let [pessoas, setPessoas] = useState(pessoasDataBases)

        let hadlerEditar = () =>{

        }
      

      const removerPessoa = (id) => {
        let pessoasAtualizadas = pessoas.filter((pessoas, i ) => {
          return pessoas.id == id ? false:true
        } )
        setPessoas(pessoasAtualizadas)
      }



  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Nome</th>
          <th>Sobrenome</th>
          <th>Nascimento</th>
          <th>CPF</th>
          <th>Opções</th>
        </tr>
      </thead>
      <tbody>
        {pessoas.map((pessoa, i)=>{
          return(
            <tr key={i}>
          <td>{i+1}</td>
          <td>{pessoa.nome}</td>
          <td>{pessoa.sobrenome}</td>
          <td>{pessoa.nascimento}</td>
          <td>{pessoa.cpf}</td>
          <td>
            <Button variant="secondary" className='m-2' onClick={hadlerEditar}>Editar</Button>
            <Button variant="danger" className='m-2' onClick={(event) => {removerPessoa(pessoa.id)}}>Remover</Button>
          </td>
        </tr>
          )})}
      </tbody>
    </Table>
  );
}

export default Tabela_Nomes;