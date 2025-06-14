// 4° questão

// Como você define um array no JSON?

// As listas são definidos entre colchetes [], e os valores são separados por vírgulas.
// Exemplo:

// Definir um lista
const lista_de_frutas = ["maçã", "banana", "laranja"];

// Converter para JSON string
const lista = JSON.stringify(lista_de_frutas);

console.log(lista);
// Saída: '["maçã","banana","laranja"]'