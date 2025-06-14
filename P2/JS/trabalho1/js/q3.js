// crie uma função para dividir string(espaços vazios) e convertê-la em uma array de palavras

// função principal
function toArray(separa){ //função responsavel para separar string e colocar em uma array
    separa = separa.split(" ") // vareavel responsavel de separar e adicionar em uma arraz cada palavra
    return separa // return da função

}
// Chamadas da função
console.log(toArray("Round Robin")) // exibi o return da função
console.log(toArray("Nome Composto")) // exibi o return da função