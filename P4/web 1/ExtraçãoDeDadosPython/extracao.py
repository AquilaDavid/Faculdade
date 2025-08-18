import pandas as pd
import json

# --- 1. Carregar o arquivo CSV ---
dados_csv = pd.read_csv("microdados_ed_basica_2023.csv", sep=";", encoding="latin1", low_memory=False)

# --- 2. Filtrar apenas as escolas da Paraíba ---
dados_paraiba = dados_csv.query("NO_UF == 'Paraíba'").copy()

print(dados_paraiba.head())  # mostra as primeiras linhas
print("Número de instituições na Paraíba:", len(dados_paraiba))

# --- 3. Tratar valores nulos na quantidade de matrículas ---
dados_paraiba["QT_MAT_BAS"] = dados_paraiba["QT_MAT_BAS"].fillna(0).astype(int)

# --- 4. Renomear colunas para nomes mais amigáveis ---
dados_paraiba = dados_paraiba.rename(columns={
    "NO_ENTIDADE": "nome_escola",
    "QT_MAT_BAS": "qtd_matriculas_basico",
    "CO_UF": "codigo_estado",
    "NO_UF": "nome_estado",
    "NO_MUNICIPIO": "cidade",
    "NO_MESORREGIAO": "mesorregiao",
    "NO_MICRORREGIAO": "microrregiao"
})

# --- 5. Transformar em lista de dicionários ---
escolas_paraiba = dados_paraiba[[
    "nome_escola",
    "qtd_matriculas_basico",
    "codigo_estado",
    "nome_estado",
    "cidade",
    "mesorregiao",
    "microrregiao"
]].to_dict(orient="records")

# --- 6. Salvar em JSON ---
with open("escolas_paraiba.json", "w", encoding="utf-8") as arquivo_json:
    json.dump(escolas_paraiba, arquivo_json, ensure_ascii=False, indent=4)

print("Arquivo JSON criado com sucesso!")
