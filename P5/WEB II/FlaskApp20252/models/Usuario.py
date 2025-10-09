import json
import os

class Usuario():
    _contador_id = 1  # controle interno de IDs

    def __init__(self, nome, cpf, nascimento, id_usuario=None):
        # ID privado — não pode ser alterado externamente
        if id_usuario is not None:
            self._id_usuario = id_usuario
        else:
            self._id_usuario = Usuario._contador_id
            Usuario._contador_id += 1

        self.nome = nome
        self.cpf = cpf
        self.nascimento = nascimento

    @property
    def id_usuario(self):
        return self._id_usuario  # só leitura

    def to_json(self):
        return {
            "id_usuario": self._id_usuario,
            "nome": self.nome,
            "cpf": self.cpf,
            "nascimento": self.nascimento
        }


# Ler o arquivo existente e os manipulas

arquivo_json_usuarios = "usuarios.json"


def salvar_usuarios(lista_usuarios):
    with open(arquivo_json_usuarios, "w", encoding="utf-8") as arquivo:
        json.dump([u.to_json() for u in lista_usuarios], arquivo, ensure_ascii=False, indent=4)


def carregar_usuarios():
    if os.path.exists(arquivo_json_usuarios):
        with open(arquivo_json_usuarios, "r", encoding="utf-8") as arquivo:
            dados = json.load(arquivo)
            lista = []
            for d in dados:
                usuario = Usuario(
                    nome=d.get("nome", ""),
                    cpf=d.get("cpf", ""),
                    nascimento=d.get("nascimento", ""),
                    id_usuario=d.get("id_usuario")
                )
                lista.append(usuario)

            # Atualiza contador interno com base no último ID
            if lista:
                Usuario._contador_id = max(u.id_usuario for u in lista) + 1
            return lista
    return []


# Caso não tenha arquivo, criar

lista_usuarios = carregar_usuarios()

if not lista_usuarios:
    usuario_padrao = Usuario("Usuário Padrão", "00000000000", "2000-01-01")
    lista_usuarios.append(usuario_padrao)
    salvar_usuarios(lista_usuarios)
