// Crie um programa para gerar a citação de nomes de modo normal e compacto segundo a Tabela 1. Considere que os nomes simples não possuem preposições.

// Função para o nome normal
function NomeNormal(nome){ // Função responsavel pelo nome normal
    nome = nome.split(" ") // vareavel responsavel por fazer a separação das palavras e colocando em uma lista
    console.log(nome)
    tamanho = nome.length // vareavel responsavel por saber o tamanho dos elementos da lista
    //console.log(nome[tamanho - 1])
    
    return `${nome[tamanho - 1]}; ${nome.slice(0, -1).join(" ")}` // retorna para função a posição do ultimo elemento da lista, também retorna toda a lista menos o seu ultimo elemento e a lista é transformada em uma string retornando a função como uma string
}

// Função para NomeCompacto
function NomeCompacto(nome) { // função responsavel para compactar os nomes
    nome = nome.split(" ") // variável responsável por separar as palavras e colocar em uma array
    console.log(nome)
    tamanho = nome.length // variável responsável por saber o tamanho da array
    iniciais = nome.filter(letra => letra !== "da") // Filtra o array para remover a palavra "da", se presente
    letra_inicial = iniciais.slice(0, -1) // variável responsável por cortar o último elemento da lista
    console.log(letra_inicial)

    res = "" // vareavel que inicia uma string vazia para armazernar as primeiras letras do nome
    for (let i = 0; i < letra_inicial.length; i++) { // Itera sobre cada parte formatada do array 'letra_inicial'
        primaeira_letra = letra_inicial[i][0] // Obtém a primeira letra do elemento atual e armazena na variável 'primeira_letra'
        console.log(primaeira_letra)
        res += primaeira_letra + ". " // // Adiciona a inicial e um ponto à string 'res'
        console.log(res)
    }
    return `${nome[tamanho - 1]}, ${res}` // Retorna a string formatada com o último nome e as iniciais
}

// Chamadas da função NomeNormal
console.log(NomeNormal("João da Silva Melo")) // Saída esperada: "Melo; João da Silva"
console.log(NomeNormal("David da Silva Duarte"))

// Chamadas da função NomeCompactos
console.log(NomeCompacto("João da Silva Melo")) // Exibe o resultado da função quando chamada com a string "João da Silva Melo"