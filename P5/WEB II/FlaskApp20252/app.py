from flask import Flask, request, jsonify
from models.InstituicaoEnsino import InstituicaoEnsino, lista_instituicoes
import json

app = Flask(__name__)

usuarios = [{'nome': 'João'}]

@app.get("/")
def index():
    return '{"versao":"2.0.0"}', 200

@app.get("/usuarios")
def get_usuarios():
    return jsonify(usuarios)

@app.get("/usuarios/<int:id>")
def get_usuario_por_id(id: int):
    return jsonify(usuarios[id])

@app.post("/usuarios")
def adicionar_usuario():
    data = request.get_json()
    usuario = {"nome": data['nome']}
    usuarios.append(usuario)
    return usuario, 201

@app.get("/instituicoesensino")
def get_instituicoes_ensino():
    instituicoes_json = [i.to_json() for i in lista_instituicoes]
    return jsonify(instituicoes_json), 200

@app.get("/instituicoesensino/<int:id>")
def get_instituicao_ensino_por_id(id: int):
    instituicao_json = lista_instituicoes[id].to_json()
    return jsonify(instituicao_json), 200

#TODO Fazer um metodo post depois para adicionar mais instituições

if __name__ == "__main__":
    app.run(debug=True)
