// Define a lista de cidades que queremos exibir
const itens = ['Guarabira', 'Belém', 'Sapé'];

// Cria um elemento <ol> (lista ordenada) usando o método createElement()
const ol = document.createElement('ol');

// Percorre cada item do array 'itens' usando forEach()
itens.forEach((item) => {
  // Para cada item, cria um elemento <li> (item da lista)
  const li = document.createElement('li');
  
  // Define o conteúdo de texto do <li> com o nome da cidade atual
  li.textContent = item;
  
  // Adiciona o <li> criado dentro da lista <ol>
  ol.appendChild(li);
});

// Depois que a lista <ol> está montada, adicionamos ela no corpo da página (body)
document.body.appendChild(ol);
