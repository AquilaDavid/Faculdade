// crie uma função para extrair um número em específico de caracteres de uma String partindo do inicio

// função principal
function initCut(inicio,fim){ // Função com dois parametros responsavel para extrair um numero especifico de caracteres em uma String
    inicio = inicio.slice(0,fim) // variavel responsavel de fazer o fatiamento da String
    return inicio // return da função
}
// chamadas da função
console.log(initCut("Round Robin",4)) // chama a função, passa os parametros e exibi o return da função
console.log(initCut("paralelepipado",6)) // chama a função, passa os parametros e exibi o return da função
console.log(initCut("Formula de baskara",8)) // chama a função, passa os parametros e exibi o return da função