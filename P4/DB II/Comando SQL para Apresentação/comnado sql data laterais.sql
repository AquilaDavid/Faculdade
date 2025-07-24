-- Tabela principal com partitioning e chave primária composta
CREATE TABLE vendas (
    id SERIAL,
    data_venda DATE NOT NULL,
    valor NUMERIC,
    PRIMARY KEY (id, data_venda)  -- chave composta obrigatória
) PARTITION BY RANGE (data_venda);

-- Partição para o ano de 2023
CREATE TABLE vendas_2023 PARTITION OF vendas
    FOR VALUES FROM (DATE '2023-01-01') TO (DATE '2024-01-01');

-- Partição para o ano de 2024
CREATE TABLE vendas_2024 PARTITION OF vendas
    FOR VALUES FROM (DATE '2024-01-01') TO (DATE '2025-01-01');

-- Inserção de registros
INSERT INTO vendas (data_venda, valor) VALUES
(DATE '2023-05-01', 100),
(DATE '2024-03-15', 250);

-- Consultas nas partições
SELECT * FROM vendas_2023;
SELECT * FROM vendas_2024;

-- Consulta geral (a partir da tabela principal, engloba todas as partições)
SELECT * FROM vendas;
