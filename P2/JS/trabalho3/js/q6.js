// 6° questão

// É possível criar chaves duplicadas num objeto JSON?

// Não, não é possível. Se você definir duas chaves iguais em um objeto JSON, a última definição sobrescreve a anterior.

// Exemplo:

let chaves_iguais = '{"nome": "Gustavo", "nome": "Pietro"}';
let obj_j1 = JSON.parse(chaves_iguais);

console.log(obj_j1.nome); // Saída: 'Pietro'
