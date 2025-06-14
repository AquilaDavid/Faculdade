// Cria uma lista de objetos com nome e notas de estudantes
const estudantes = [
 { nome: 'Alice', notas: [100, 60, 92] },
 { nome: 'João', notas: [75, 30, 85] },
 { nome: 'Charles', notas: [90, 95, 85] },
 { nome: 'Paulo', notas: [100, 100, 100] },
];

// Mapeia cada estudante para calcular sua média
const estudantesMedias = estudantes.map((estudante) => {
// Soma todas as notas usando reduce()
 const total = estudante.notas.reduce((soma, nota) => soma + nota);
 let {nome} = estudante;
// Retorna um novo objeto com o nome e a média calculada
 return { nome, media: total / estudante.notas.length };
});

// Filtra os estudantes que têm média maior que 90
const melhoresMedias = estudantesMedias.filter(
 (student) => student.media > 90,
);

// Exibe no console os estudantes com médias superiores a 90
console.log(melhoresMedias);