// 2° questão

// Quais são as operações mais comuns com JSON em Javascript?

// Operações mais comum no Json são: 

// Converter um objeto para Json

const obj = { nome: "João", idade: 30 };
const jsonString = JSON.stringify(obj);
console.log(jsonString)  // Saída esperada: '{"nome":"João","idade":30}'

// Converter JSON para Objeto:

const jsonStrin = '{"nome":"João","idade":30}';
const ob = JSON.parse(jsonStrin);
console.log(jsonStrin) // Saída esperada: { nome: 'João', idade: 30 }

// Acessar Dados:

const obj2 = JSON.parse('{"nome":"João","idade":30}');
console.log(obj2.nome); // Saída esperada: 'João'

// Adicionar/Atualizar Propriedades:

const lis = { nome: "João", idade: 30 };
lis.ativo = true; // Adiciona
lis.idade = 31; // Atualiza
console.log(lis) // Saída esperada: { nome: 'João', idade: 31, ativo: true }

// Remover Propriedades:

const itens_ = { nome: "João", idade: 30 };
delete itens_.idade; // Remove
console.log(itens_) // Saída esperada: { nome: 'João' }