// criação da vareavel tamanho atribuindo o valor 3
const tamanho = 3;
/*
    criação da vareavel lista, onde ela irá armazenar uma lista; 
    o new server para alocação de memoraria, o metodo Array já por sua vez server para gerar a lista;
    na criação foi passado um paramentro tamanho e o metodo fill, estar servindo para colocar
    algo nos espaços criados 
*/ 
const lista = new Array(tamanho).fill(null);
// criação da vareavel total, onde ela vai receber a manipulação feita da vareavel lista, pelos metodos map e reduce
let total = lista
/*
    o map gera uma nova lista com o mesmo index e tem o seu callback, pegando o valor atual e o indece, nesse caso o que ele esta interando é sobre o indece e não pelo o valor.
 */
 .map(function (item, index) {
   return index + 1;
 })
 // o reduce vai criar uma nova lista porem voltando apenas um valor, o seu callback é o acummilador e o valor atual e retornando a multiplicação deles dois
 .reduce(function (acumulador, item) {
   return acumulador * item;
 });
 console.log(total)

// cruação da vareavel total, que está recebendo o resultado da manupulação dos metodos fill, map e reduce
let total2 = new Array(tamanho)
 .fill(null)
 .map((item, index) => index + 1)
 .reduce((acumulador, item) => acumulador + item);

 // os dois jeitos daram o mesmo resultado, a unica diferença é que um é menos verboso do que o outro
console.log(total);