import pandas as pd
import json
import sys
sys.stdout.reconfigure(encoding='utf-8')
# Arquivos
ARQUIVO_CSV = "microdados_ed_basica_2023.csv"
ARQUIVO_JSON = "instituicoes_paraiba.json"

# === Carregar microdados ===
print("Carregando dados...")
df = pd.read_csv(ARQUIVO_CSV, sep=";", encoding="latin1", low_memory=False)

# === Filtrar apenas instituições da Paraíba (UF = 25) ===
df_pb = df[df["CO_UF"] == 25]

# === Selecionar colunas relevantes ===
colunas = [
    "CO_ENTIDADE", "NO_ENTIDADE",
    "CO_UF", "NO_UF",
    "CO_MUNICIPIO", "NO_MUNICIPIO",
    "CO_REGIAO", "NO_REGIAO",
    "QT_MAT_BAS", "QT_MAT_PROF", "QT_MAT_EJA", "QT_MAT_ESP"
]

df_pb = df_pb[colunas]

# === Remover duplicados (se houver mais de um registro por instituição) ===
# Somando matrículas por instituição
df_grouped = df_pb.groupby([
    "CO_ENTIDADE", "NO_ENTIDADE",
    "CO_UF", "NO_UF",
    "CO_MUNICIPIO", "NO_MUNICIPIO",
    "CO_REGIAO", "NO_REGIAO"
], as_index=False).sum(numeric_only=True)

# === Montar lista no formato JSON esperado ===
instituicoes = []

for _, row in df_grouped.iterrows():
    instituicao = {
        "codigo": str(row["CO_ENTIDADE"]),
        "nome": row["NO_ENTIDADE"],
        "estado": {
            "codigo": str(row["CO_UF"]),
            "nome": row["NO_UF"]
        },
        "municipio": {
            "codigo": str(row["CO_MUNICIPIO"]),
            "nome": row["NO_MUNICIPIO"]
        },
        "regiao": {
            "codigo": str(row["CO_REGIAO"]),
            "nome": row["NO_REGIAO"]
        },
        "qt_mat_bas": int(row["QT_MAT_BAS"]),
        "qt_mat_prof": int(row["QT_MAT_PROF"]),
        "qt_mat_eja": int(row["QT_MAT_EJA"]),
        "qt_mat_esp": int(row["QT_MAT_ESP"])
    }
    instituicoes.append(instituicao)

# === Exportar para JSON ===
with open(ARQUIVO_JSON, "w", encoding="utf-8") as f:
    json.dump(instituicoes, f, ensure_ascii=False, indent=2)

print(f"✅ Arquivo {ARQUIVO_JSON} gerado com sucesso!")
