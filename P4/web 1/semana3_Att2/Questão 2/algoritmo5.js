// Define os dois arrays de números
const a = [1, 2, 3, 4, 5];
const b = [6, 7, 8, 9, 10];

// Usa o operador spread (...) para juntar os dois arrays
// Em seguida, usa reduce() para somar todos os números
const somaTotal = [...a, ...b].reduce((soma, item) => soma + item, 0);

// Exibe no console o valor total da soma dos dois arrays
console.log(`A soma total dos arrays a e b é: ${somaTotal}`);
