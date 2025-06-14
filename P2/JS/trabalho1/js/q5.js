// crie uma função para converter uma string em formato abreviado

// função principal
function abbrevName(nome){ // Função responsavel para fazer a abreviação de nomes
    nome = nome.split(" ") // vareavel responsavel por partir a String e colocar em uma array
    abrev = nome // vareavel responsavel por receber a array
    tamanho = abrev.length // vareavel responsavel por saber o tamanho da array 
    return `${abrev[0]} ${abrev[tamanho - 1].charAt(0)}.` // esta retornando para a função o indici 0 da array e o ultimo indici da array com apenas a primeira posição.
}

// chamadas da função
console.log(abbrevName("Robin Hood")) // chama a função, passa o parametro e exibi o return da função
console.log(abbrevName("Francisco Oliveira")) // chama a função, passa o parametro e exibi o return da função
console.log(abbrevName("Marcos Coelho")) // chama a função, passa o parametro e exibi o return da função
console.log(abbrevName("Pedro Henrique")) // chama a função, passa o parametro e exibi o return da função
console.log(abbrevName("José Ricardo de Souza")) // chama a função, passa o parametro e exibi o return da função