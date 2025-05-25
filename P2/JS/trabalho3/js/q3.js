// 3° questão

// Como converter um JSON para string?

// Usamos o metodo JSON.stringfy()

// EXemplo:

const obj_json = { nome: "João", idade: 30 };

// Converter objeto para string JSON
const json_string = JSON.stringify(obj_json);

console.log(json_string);
// Saída: '{"nome":"João","idade":30}'
