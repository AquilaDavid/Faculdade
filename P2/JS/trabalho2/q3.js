// Crie 3 funçôes, soma, soma_impar e produtorio

// Função soma
function soma(...sum){ // Função responsavel por somar todos numeros usando o rest parameters(...), com ele é possivel obter varios argumetos com apenas um parametro
    soma_total = 0 // variavel de inicio 0, no final receber o total da soma dos parametros
    for( adição in sum){ // laço de repetição, para cada elemento em sum.
        soma_total += sum[adição] // soma_total recebe ela mesma e soma com o elemento de sum
        //console.log(soma_total)
    }
    return soma_total // retorna o soma_total para a função
}

// Função para somar apenas os numeros impares
function soma_impares(...sumOdds){ // Função responsavel pela soma dos numeros impares. Usando o rest parameters(...), com ela é possivel obter varios argumentos para o mesmo parametro
    soma_total = 0 // variavel de inicio 0, no final receber o total da soma dos parametros
    for( impares in sumOdds){ // laço de repetição, para cada elemento em sumOdds.
        if(sumOdds[impares] % 2 != 0){ // condição. se o elemento de sumOdds divido por dois resultado for diferente de zero. 
            soma_total += sumOdds[impares] // soma_total recebe ela mesma e soma com os elemtos de sumOdds
        }
        //console.log(soma_total)
    }
    return soma_total // retorna o soma_total para a função
}

// Função para Produtorio
function produtorio(...product){ // Função responsavel pela multiplicação dos elementos do paramentro. Usando o rest parameters(...), com ela é possivel obter varios argumentos para o mesmo parametro.
    produto_final = 1 // // Inicializa a variável 'produto_final' com o valor 1. Esta variável será usada para armazenar o produto final dos argumentos.
    for(i = 0; i < product.length;  i++){  // Inicia um loop 'for' para iterar sobre cada elemento no array 'product'.
        produto_final *= product[i] // Multiplica o valor atual de 'produto_final' pelo elemento corrente do array 'product' Atualiza 'produto_final' com o novo produto.
    }
    return produto_final // Retorna o produto final, que é o resultado da multiplicação de todos os argumentos.
}

// Chamada da função soma
console.log(soma(1,2,3)) // Exibi o retorno da função soma. Saida esperada -> 6

console.log(soma(2,2,2)) // Exibi o retorno da função soma. Saida esperada -> 6

console.log(soma(1,2,3,4,5,6)) // Exibi o retorno da função soma. Saida esperada -> 21

// Chamada da função soma_impares
console.log(soma_impares(1,2,3)) // Exibi o retorno da função soma_impares. Saida esperada -> 4

console.log(soma_impares(2,2,2)) // Exibi o retorno da função soma_impares. Saida esperada -> 0

console.log(soma_impares(1,2,3,4,5,6)) // Exibi o retorno da função soma_impares. Saida esperada -> 9

// Chamadas da função produtorio
console.log(produtorio(1,2,3)) // Exibi o retorno da função produtorio. Saida esperada -> 6

console.log(produtorio(2,2,2)) // Exibi o retorno da função produtorio. Saida esperada -> 8

console.log(produtorio(1,2,3,4,5,6)) // Exibi o retorno da função produtorio. Saida esperada -> 720