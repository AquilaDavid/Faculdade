// Crie um sistema comercial para carrinho 

// Função carrinho
function Carrinho(unidade){ // Função que calcula o valor total das compras em um carrinho
    valor = 10 // variavel responsavel pelo valor unitário do item
    unidade = unidade // Recebe o array 'unidade' com as quantidades de cada item
    result_compras = [] // Inicializa um array para armazenar os resultados intermediários (custos individuais)
    soma = 0 // Inicializa uma variável para armazenar a soma total das compras
    for(x of unidade){ // Itera sobre cada quantidade no array 'unidades'
        //console.log(unidade[x])
        multiplicador = valor * x // Calcula o custo total para a quantidade atual
        //console.log(multiplicador)
        result_compras += multiplicador + " " // Adiciona o custo total ao array de result_compras (como string)
        soma += multiplicador // Adiciona o custo total à soma das compras
        //console.log(soma)
    }
    total = `Valor total: R$ ${soma.toFixed(2)}` // Formata a soma total com duas casas decimais e cria uma string para o total
    sub = `subtotal: ${result_compras}` // Vareavel responsavel por obter o subtottal
    return `${sub}, ${total}` //  Retorna a string com o subtotal e o total formatado
}

console.log(Carrinho([2,2,2,0])) // Exibe o resultado da função 'Carrinho' ao ser chamada com um array de quantidades