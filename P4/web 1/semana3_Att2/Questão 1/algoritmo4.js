// Lista de funcionários com nome, salário e departamento
const funcionarios = [
 { nome: 'João', salario: 30000, departamento: 'TI' },
 { nome: 'Janete', salario: 70000, departamento: 'RH' },
 { nome: 'Sofia', salario: 100000, departamento: 'RH' },
];

// Agrupa os funcionários por departamento usando reduce()
const funcionariosPorDepartamento = funcionarios.reduce(
 (acumulador, funcionario) => {  
    // Pega o departamento do funcionário
   const departamento = funcionario.departamento;
   // Se o departamento ainda não existe no acumulador, cria um array vazio
   if (!acumulador[departamento]) {
    // Adiciona o funcionário ao array do departamento correspondente
     acumulador[departamento] = [];
   }
   acumulador[departamento].push(funcionario);
   return acumulador; // Retorna o acumulador atualizado
 },
 {},  // Começa com um objeto vazio
);

// Calcula a média salarial de cada departamento
const mediasSalarioPorDepartamento = Object.keys(
 funcionariosPorDepartamento,
).map((departamento) => { // Soma todos os salários do departamento usando reduce()
 const total = funcionariosPorDepartamento[departamento].reduce(
   (acumulador, funcionario) => acumulador + funcionario.salario,
   0,
 );
 return {  // Retorna um objeto com o nome do departamento e a média salarial
   departamento: departamento,
   media: total / funcionariosPorDepartamento[departamento].length,
 };
});

// Filtra os departamentos que têm média salarial acima de 65.000
const maioresPagamentos = mediasSalarioPorDepartamento.filter(
 (departamento) => departamento.media > 65000,
);

// Exibe no console os departamentos com médias salariais maiores que 65.000
console.log(maioresPagamentos);
