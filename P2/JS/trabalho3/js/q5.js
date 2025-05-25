//  5° questão

//Como você pode extrair dados armazenados em um objeto JSON?

// Usamos os [] ou o "." , para extrair um dado armazenado em um objeto JSON

// Exemplo:

const lista1 = '{"nome":"João","idade":30 }';
// Converter em um objeto JSON
const Obj_json = JSON.parse(lista1);
// Extrair elementos do objeto
console.log(Obj_json.nome); // Saida: "João"

// Usando os colchetes

console.log(Obj_json['idade']) // Saida: 30