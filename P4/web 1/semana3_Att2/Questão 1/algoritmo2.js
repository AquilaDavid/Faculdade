// foi criada uma vareal, onde ela recebe um conjunto de listas
const letras = [
 ['a', 'b', 'c'],
 ['c', 'd', 'f'],
 ['d', 'f', 'g'],
];

// Cria a variável 'resultado' para armazenar o objeto final
// flat() transforma a matriz em um único array plano
// reduce() conta quantas vezes cada letra aparece e cria um objeto de frequência
let resultado = letras.flat().reduce((objeto, numero) => {
// Se a letra já existe no objeto, incrementa o valor
 if (objeto[numero]) {
   objeto[numero] += 1;
 // Se não existe, cria a chave e coloca 1 como valor inicial  
 } else {
   objeto[numero] = 1;
 }
  // Retorna o objeto atualizado para a próxima iteração
 return objeto;
}, {});  // O objeto começa vazio

// Exibe no console o objeto final com as contagens de cada letra
console.log(resultado);