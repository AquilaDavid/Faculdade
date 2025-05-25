// Crier uma função para indentificar se o paramentro passado é uma função

// função tipo_string
function isString(paramentro){ // Função utilizada para identificar se o paramentro passado é uma string ou não.
    tipo = typeof paramentro // vareavel responsavel para identificar o tipo da vareavel
    bool = Boolean(String(tipo)) // verificação de tipo
    if(tipo === "string"){ // condição responsavel para verificar se a vareavel é uma string
        console.log(tipo) // exibi se o parametro passado é uma string
        return `${bool}, O parametro ${paramentro} é uma string` // retorna uma frase monstrando que o parametro passado é uma string
    }
    else{ // condição de pior caso, caso o parametro não seja uma string
        return `false, O parametro ${paramentro} não é uma string` // retorna uma frase informando que o paramentro passado não é uma string
    }
}
// chamadas da função
console.log(isString("Rhavy")) // exibi o return da função isString que verificar se o parametro passado é uma string ou não
console.log(isString(1234)) // exibi o return da função isString que verificar se o parametro passado é uma string ou não
console.log(isString("Guedes")) // exibi o return da função isString que verificar se o parametro passado é uma string ou não
console.log(isString([198273])) // exibi o return da função isString que verificar se o parametro passado é uma string ou não