import json
import os

class InstituicaoEnsino():

    def __init__(self, codigo_instituicao, nome_instituicao, codigo_estado, nome_estado, codigo_municipio, nome_municipio, codigo_regiao, nome_regiao,
                 matriculas_educacao_basica, matriculas_profissionalizante,
                 matriculas_eja, matriculas_especiais):
        
        self.codigo_instituicao = codigo_instituicao
        self.nome_instituicao = nome_instituicao
        self.codigo_estado = codigo_estado
        self.nome_estado = nome_estado
        self.codigo_municipio = codigo_municipio
        self.nome_municipio = nome_municipio
        self.codigo_regiao = codigo_regiao
        self.nome_regiao = nome_regiao
        self.matriculas_educacao_basica = matriculas_educacao_basica
        self.matriculas_profissionalizante = matriculas_profissionalizante
        self.matriculas_eja = matriculas_eja
        self.matriculas_especiais = matriculas_especiais

    def __repr__(self):
        return f"{self.nome} ({self.codigo_instituicao})"

    def to_json(self):
        return {
            "codigo_instituicao": self.codigo_instituicao,
            "nome_instituicao": self.nome_instituicao,
            "codigo_estado": self.codigo_estado,
            "nome_estado": self.nome_estado,
            "codigo_municipio": self.codigo_municipio,
            "nome_municipio": self.nome_municipio,
            "codigo_regiao": self.codigo_regiao,
            "nome_regiao": self.nome_regiao,
            "matriculas_educacao_basica": self.matriculas_educacao_basica,
            "matriculas_profissionalizante": self.matriculas_profissionalizante,
            "matriculas_eja": self.matriculas_eja,
            "matriculas_especiais": self.matriculas_especiais
        }

arquivo_json = "instituicoesEnsino.json"

def salvar_arquivo_json(lista_instituicoes):
    with open(arquivo_json, "w", encoding="utf-8") as arquivo:
        json.dump([i.to_json() for i in lista_instituicoes], arquivo, ensure_ascii=False, indent=4)

def carregar_dados():
    if os.path.exists(arquivo_json):
        with open(arquivo_json, "r", encoding="utf-8") as arquivo:
            dados = json.load(arquivo)
            lista = []
            for d in dados:
                inst = InstituicaoEnsino(
                    codigo_instituicao=d.get("codigo", ""),
                    nome_instituicao=d.get("nome", ""),
                    codigo_estado=d.get("estado", {}).get("codigo", ""),
                    nome_estado=d.get("estado", {}).get("nome", ""),
                    codigo_municipio=d.get("municipio", {}).get("codigo", ""),
                    nome_municipio=d.get("municipio", {}).get("nome", ""),
                    codigo_regiao=d.get("regiao", {}).get("codigo", ""),
                    nome_regiao=d.get("regiao", {}).get("nome", ""),
                    matriculas_educacao_basica=d.get("qt_mat_bas", 0),
                    matriculas_profissionalizante=d.get("qt_mat_prof", 0),
                    matriculas_eja=d.get("qt_mat_eja", 0),
                    matriculas_especiais=d.get("qt_mat_esp", 0)
                )
                lista.append(inst)
            return lista

    return []

lista_instituicoes = carregar_dados()
if not lista_instituicoes:
    primeira_instituicao = InstituicaoEnsino(
        "25000012", "EMEF JOAO ALVES",
        25, "2501005", 779, 0, 104, 43
    )
    lista_instituicoes.append(primeira_instituicao)
    salvar_arquivo_json(lista_instituicoes)
