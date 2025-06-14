import App from "../App"
import { useState } from "react";
import { Button } from 'react-bootstrap';


function Hadler(){
    
    let [pessoas, setPessoas] = useState([
        {nome : 'Miguel'},
        {nome : 'José'},
        {nome : 'Daniel'}
    ])
    
    let hadlerAdiconarNome = () => {
        setPessoas([...pessoas, {nome: 'Novo Nome'}])
    }

    let hadlerRemoverNome = () => {
        if(pessoas.length > 0){
            setPessoas(pessoas.slice(0,-1))
        }
    }
    
    
    return(
        <>
            <h2>Inicio da Atividade em sala</h2>
            <p>
                Adicionar e remover nomes da lista
            </p>
            
            <ul>
                {pessoas.map((pessoa, index)=>{
                   return <li key={index}>{pessoa.nome}</li>
                })}
            </ul>
            

            <span className="rounded me-2"><Button variant="success" onClick={hadlerAdiconarNome}>Adicionar Nome</Button></span>
            <span><Button variant="danger" onClick={hadlerRemoverNome}>Remover Nome</Button></span>
        </>
    )
}

export default Hadler;