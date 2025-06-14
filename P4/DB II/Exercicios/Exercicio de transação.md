
# 📝 Atividade – Transações

## 1. O que é uma transação?

Uma **transação** é uma sequência de operações realizadas como uma única unidade lógica de trabalho. Ela deve ser executada completamente ou não executada nenhuma de suas partes. É usada para garantir integridade e consistência dos dados em bancos de dados.

---

## 2. Qual é o significado da sigla ACID?

ACID representa as quatro propriedades que garantem a confiabilidade de uma transação:

- **A**tomacidade: garante que todas as operações de uma transação sejam concluídas com sucesso ou nenhuma delas seja aplicada.
- **C**onsistência: assegura que o banco de dados permaneça em um estado válido antes e depois da transação.
- **I**solamento: garante que as transações concorrentes não interfiram entre si.
- **D**urabilidade: assegura que os efeitos da transação sejam permanentes após o commit, mesmo em caso de falhas.

---

## 3. Explique o funcionamento dos seguintes comandos:

- **BEGIN**: inicia uma transação.
- **SAVEPOINT**: define um ponto de salvamento dentro de uma transação para possível retorno parcial.
- **COMMIT**: aplica permanentemente todas as operações da transação.
- **ROLLBACK**: desfaz todas as operações realizadas desde o último `BEGIN` ou `SAVEPOINT`.

---

## 4. Quais são os problemas de isolamento que podem acontecer quando existem transações concorrentes?

1. **Dirty Read (Leitura Suja)**: uma transação lê dados que ainda não foram confirmados por outra transação.
2. **Non-Repeatable Read (Leitura Não Repetível)**: uma transação lê a mesma linha duas vezes e obtém resultados diferentes.
3. **Phantom Read (Leitura Fantasma)**: uma transação executa a mesma consulta duas vezes e obtém conjuntos de resultados diferentes devido a inserções/remoções por outras transações.

---

## 5. Quais são os níveis de isolamento que podem ser utilizados em uma transação? Explique cada um deles.

1. **Read Uncommitted**: permite leitura de dados não confirmados (possível dirty read).
2. **Read Committed**: só permite leitura de dados confirmados (evita dirty read).
3. **Repeatable Read**: garante que as leituras de uma transação sempre retornem os mesmos dados (evita dirty e non-repeatable reads).
4. **Serializable**: simula que as transações foram executadas em série, evitando todos os problemas de concorrência.

Fonte: [DevMedia](https://www.devmedia.com.br/transacoes-no-postgresql-niveis-de-isolamento/32464?authuser=1)

---

## 6. Como configurar o nível de isolamento de uma transação? Dê exemplo.

Utiliza-se o comando `SET TRANSACTION ISOLATION LEVEL`. Exemplo:

```sql
BEGIN;
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;
-- comandos SQL
COMMIT;
```

---

## 7. Experimento com READ COMMITTED e REPEATABLE READ

Execute os comandos em duas sessões:

### Sessão 1

```sql
BEGIN;
SET TRANSACTION ISOLATION LEVEL READ COMMITTED; -- ou REPEATABLE READ
SELECT * FROM pedidos WHERE id = 1;
```

### Sessão 2

```sql
BEGIN;
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
UPDATE pedidos SET quantidade = 5 WHERE id = 1;
COMMIT;
```

### Sessão 1 repete a consulta

```sql
SELECT * FROM pedidos WHERE id = 1;
COMMIT;
```

- **READ COMMITTED**: nova leitura reflete atualização.
- **REPEATABLE READ**: mantém o valor original da primeira leitura.

---

## 8. Phantom Read

### a) READ COMMITTED:

```sql
BEGIN;
SELECT * FROM pedidos WHERE quantidade >= 1;
-- Sessão 2 insere uma nova linha
-- Repetir a consulta exibe o novo registro
```

### b) REPEATABLE READ:

```sql
BEGIN;
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;
SELECT * FROM pedidos WHERE quantidade >= 1;
-- Mesmo após inserção em outra sessão, a consulta não mostra a nova linha
```

---

## 9. Conflito de atualizações

### a) READ COMMITTED

- Sessão 1: atualiza e segura a transação.
- Sessão 2: bloqueada até a 1ª fazer commit.
- Após commit da 1ª, a 2ª continua.

### b) SERIALIZABLE

- Sessão 2 tentará fazer commit, mas receberá erro de serialização.

### c) SERIALIZABLE + ROLLBACK

- Sessão 1 faz rollback.
- Sessão 2 pode continuar normalmente.

---

## 🧪 Script SQL com três tabelas e dados

```sql
CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100)
);

CREATE TABLE produtos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100),
    preco NUMERIC(10, 2)
);

CREATE TABLE pedidos (
    id SERIAL PRIMARY KEY,
    cliente_id INT REFERENCES clientes(id),
    produto_id INT REFERENCES produtos(id),
    quantidade INT
);

INSERT INTO clientes (nome) VALUES
('Ana'), ('Bruno'), ('Carlos');

INSERT INTO produtos (nome, preco) VALUES
('Notebook', 3500.00),
('Teclado', 150.00),
('Mouse', 75.00);

INSERT INTO pedidos (cliente_id, produto_id, quantidade) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 3, 3);
```
