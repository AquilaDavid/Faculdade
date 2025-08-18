import pandas as pd
import json

# Carregar CSV
df = pd.read_csv("microdados_ed_basica_2023.csv", sep=';', encoding='latin1', low_memory=False)

# Filtrar apenas Paraíba
df_pb = df[df['NO_UF'] == 'Paraíba']

print(df_pb.head())
print("Número de instituições na Paraíba:", len(df_pb))

# Criar lista de dicionários
lista_instituicoes = []

for _, row in df_pb.iterrows():
    matriculas = 0 if pd.isna(row['QT_MAT_BAS']) else int(row['QT_MAT_BAS'])
    instituicao = {
        "nome_instituicao": row['NO_ENTIDADE'],
        "quantidade_matriculas_basico": matriculas,
        "codigo_uf": int(row['CO_UF']),
        "nome_uf": row['NO_UF'],
        "municipio": row['NO_MUNICIPIO'],
        "mesorregiao": row['NO_MESORREGIAO'],
        "microrregiao": row['NO_MICRORREGIAO']
    }
    lista_instituicoes.append(instituicao)

# Gravar JSON **fora do for**
with open('instituicoes_pb.json', 'w', encoding='utf-8') as f:
    json.dump(lista_instituicoes, f, ensure_ascii=False, indent=4)

print("Arquivo JSON gerado com sucesso!")
