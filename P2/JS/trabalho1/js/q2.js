// crie uma função para identificar se a String estar vazia ou não

// Criando função principal
function isEmpty(string){ // Função responsavel para saber se a algo no parametro passado ou não
    vazio = string.length // Variavel responsavel de verificar quantos elementos a no paramentro
    if(vazio === 0){ // condição de melhor caso. quando o paramentro estiver vazio
        return "True" // return para a função
    }
    else{ // condiçao de pior caso. quando o parametro for maior que 0
        return "False" // return da função
    }
}
// chamadas da função
console.log(isEmpty("")) // exibi se a string estiver vazia, mostrando True
console.log(isEmpty("abc")) // chama a função e exibi o return da função, se esiver vazia, mostra True,se não, mostra False 