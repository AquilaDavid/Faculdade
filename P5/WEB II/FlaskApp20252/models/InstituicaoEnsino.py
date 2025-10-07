import json
import os

class InstituicaoEnsino:

    def __init__(self, codigo_instituicao, nome, codigo_estado, codigo_municipio,
                 matriculas_educacao_basica, matriculas_profissionalizante,
                 matriculas_eja, matriculas_especiais):
        self.codigo_instituicao = codigo_instituicao
        self.nome = nome
        self.codigo_estado = codigo_estado
        self.codigo_municipio = codigo_municipio
        self.matriculas_educacao_basica = matriculas_educacao_basica
        self.matriculas_profissionalizante = matriculas_profissionalizante
        self.matriculas_eja = matriculas_eja
        self.matriculas_especiais = matriculas_especiais

    def __repr__(self):
        return f"{self.nome} ({self.codigo_instituicao})"

    def to_json(self):
        return {
            "codigo_instituicao": self.codigo_instituicao,
            "nome": self.nome,
            "codigo_estado": self.codigo_estado,
            "codigo_municipio": self.codigo_municipio,
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
            return [InstituicaoEnsino(**dado) for dado in dados]
    return []

lista_instituicoes = carregar_dados()
if not lista_instituicoes:
    primeira_instituicao = InstituicaoEnsino(
        "25000012", "EMEF JOAO ALVES",
        25, "2501005", 779, 0, 104, 43
    )
    lista_instituicoes.append(primeira_instituicao)
    salvar_arquivo_json(lista_instituicoes)
