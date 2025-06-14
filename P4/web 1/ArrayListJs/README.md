
# 🚀 Métodos `filter`, `map` e `reduce` no JavaScript

Os métodos `filter`, `map` e `reduce` fazem parte do arsenal funcional do JavaScript para **manipulação de arrays**. Cada um tem uma função específica e deixa teu código **mais limpo e elegante** se bem usado.

Este documento traz **vantagens, desvantagens, callbacks e exemplos comentados** de cada método. Bora quebrar tudo em detalhes 👇

---

## 🔍 **Método filter**

### ✅ Vantagens

- Simples e direto para operações de **filtragem**.
- Não altera o array original (**imutável**).
- Pode ser usado em **encadeamento** com outros métodos.

### ❌ Desvantagens

- Sempre retorna um **novo array**, mesmo se **nenhum item passar** no filtro.
- Pode ser **menos eficiente** em arrays gigantes.

### 🔄 Callback

**Parâmetros:**

| Parâmetro      | O que faz                                               |
|----------------|---------------------------------------------------------|
| `currentValue` | O valor atual do array na iteração.                     |
| `index`        | O índice atual do elemento.                             |
| `array`        | O array original completo.                              |

A função precisa **retornar `true`** para manter o item ou `false` para descartá-lo.

### 📝 Exemplos

```js
// Exemplo 1️⃣: Filtrar números pares
const nums = [1, 2, 3, 4, 5, 6];
const pares = nums.filter(n => n % 2 === 0);
console.log(pares); // [2, 4, 6]

// Exemplo 2️⃣: Filtrar palavras com mais de 5 letras
const palavras = ['casa', 'computador', 'sol', 'programação'];
const longas = palavras.filter(p => p.length > 5);
console.log(longas); // ['computador', 'programação']

// Exemplo 3️⃣: Filtrar objetos por propriedade
const usuarios = [
    { nome: 'Ana', ativo: true },
    { nome: 'Carlos', ativo: false },
    { nome: 'João', ativo: true }
];
const ativos = usuarios.filter(user => user.ativo);
console.log(ativos);
// [{ nome: 'Ana', ativo: true }, { nome: 'João', ativo: true }]
```

---

## 🛠️ **Método map**

### ✅ Vantagens

- Ótimo para **transformar valores** em arrays.
- Mantém o array original **intacto**.
- Sintaxe **simples e declarativa**.

### ❌ Desvantagens

- Sempre retorna um array do **mesmo tamanho** do original.
- Não serve para **efeitos colaterais** (não mexe fora da função).

### 🔄 Callback

**Parâmetros:**

| Parâmetro      | O que faz                                                |
|----------------|----------------------------------------------------------|
| `currentValue` | O valor atual que está sendo processado.                 |
| `index`        | O índice do elemento atual.                              |
| `array`        | O array original inteiro.                                |

A função deve retornar o **novo valor** para substituir o atual no array final.

### 📝 Exemplos

```js
// Exemplo 1️⃣: Dobrar os números
const numeros = [1, 2, 3];
const dobrados = numeros.map(n => n * 2);
console.log(dobrados); // [2, 4, 6]

// Exemplo 2️⃣: Extrair nomes de objetos
const pessoas = [
    { nome: 'Maria', idade: 30 },
    { nome: 'Lucas', idade: 25 }
];
const nomes = pessoas.map(p => p.nome);
console.log(nomes); // ['Maria', 'Lucas']

// Exemplo 3️⃣: Transformar strings em uppercase
const frutas = ['maçã', 'banana', 'uva'];
const maiusculas = frutas.map(f => f.toUpperCase());
console.log(maiusculas); // ['MAÇÃ', 'BANANA', 'UVA']
```

---

## 🔄 **Método reduce**

### ✅ Vantagens

- **Muito versátil**: transforma arrays em qualquer tipo de valor (número, string, objeto...).
- Ótimo para **cálculos acumulativos** e agregações complexas.

### ❌ Desvantagens

- Pode ser **mais difícil de entender** no começo.
- Precisa cuidar do **valor inicial** (muito importante!).

### 🔄 Callback

**Parâmetros:**

| Parâmetro      | O que faz                                               |
|----------------|---------------------------------------------------------|
| `acumulador`   | O resultado parcial acumulado até o momento.            |
| `currentValue` | O valor atual na iteração.                              |
| `index`        | O índice atual do elemento.                             |
| `array`        | O array original inteiro.                               |

Também é possível passar um **valor inicial** como segundo argumento da função.

### 📝 Exemplos

```js
// Exemplo 1️⃣: Somar números
const nums = [1, 2, 3, 4];
const soma = nums.reduce((acc, n) => acc + n, 0);
console.log(soma); // 10

// Exemplo 2️⃣: Contar ocorrências de letras
const letras = ['a', 'b', 'a', 'c', 'b', 'a'];
const contagem = letras.reduce((acc, letra) => {
    acc[letra] = (acc[letra] || 0) + 1;
    return acc;
}, {});
console.log(contagem); // { a: 3, b: 2, c: 1 }

// Exemplo 3️⃣: Criar uma string a partir de array
const palavras = ['Olá', 'mundo', '!'];
const frase = palavras.reduce((acc, palavra) => acc + ' ' + palavra);
console.log(frase); // 'Olá mundo !'
```

---

## 🚦 Resumo rápido

| Método    | O que faz?                                               | Retorna                                     |
|-----------|----------------------------------------------------------|--------------------------------------------|
| `filter`  | Filtra itens com base numa condição.                     | Novo array (pode ter tamanho menor/igual). |
| `map`     | Transforma cada item.                                    | Novo array (mesmo tamanho).                |
| `reduce`  | Acumula tudo em um único valor (pode ser qualquer coisa).| Qualquer tipo (número, objeto, string etc).|

---

## 💡 Dicas finais

- O trio `filter + map + reduce` pode ser **encadeado** pra criar pipelines poderosas de processamento.
- Sempre tenha cuidado com **reduce**: se esquecer o valor inicial e o array estiver vazio, pode dar erro.
- Curtiu a pegada? Brinque com esses métodos em arrays do seu projeto pra ganhar prática rápida!
