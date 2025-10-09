from flask import Flask, request, jsonify
from models.InstituicaoEnsino import InstituicaoEnsino, lista_instituicoes
from models.Usuario import Usuario, carregar_usuarios, salvar_usuarios
import json

app = Flask(__name__)

usuarios = carregar_usuarios()

@app.get("/")
def index():
    return '{"versao":"2.0.0"}', 200

'''@app.get("/usuarios")
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
    return usuario, 201'''

@app.get("/instituicoesensino")
def get_instituicoes_ensino():
    instituicoes_json = [i.to_json() for i in lista_instituicoes]
    return jsonify(instituicoes_json), 200

@app.get("/instituicoesensino/<int:id>")
def get_instituicao_ensino_por_id(id: int):
    instituicao_json = lista_instituicoes[id].to_json()
    return jsonify(instituicao_json), 200

@app.post("/instituicoesensino")
def adicionar_instituicao_ensino():
    data = request.get_json()
    inst = InstituicaoEnsino(
        codigo_instituicao=data.get("codigo_instituicao", ""),
        nome_instituicao=data.get("nome_instituicao", ""),
        codigo_estado=data.get("codigo_estado", ""),
        nome_estado=data.get("nome_estado", ""),
        codigo_municipio=data.get("codigo_municipio", ""),
        nome_municipio=data.get("nome_municipio", ""),
        codigo_regiao=data.get("codigo_regiao", ""),
        nome_regiao=data.get("nome_regiao", ""),
        matriculas_educacao_basica=data.get("matriculas_educacao_basica", 0),
        matriculas_profissionalizante=data.get("matriculas_profissionalizante", 0),
        matriculas_eja=data.get("matriculas_eja", 0),
        matriculas_especiais=data.get("matriculas_especiais", 0)
    )
    lista_instituicoes.append(inst)
    return inst.to_json(), 201


@app.put("/instituicoesensino/<int:id>")
def atualizar_instituicao_ensino(id: int):
    if 0 <= id < len(lista_instituicoes):
        data = request.get_json()
        inst = lista_instituicoes[id]
        inst.codigo_instituicao = data.get("codigo_instituicao", inst.codigo_instituicao)
        inst.nome_instituicao = data.get("nome_instituicao", inst.nome_instituicao)
        inst.codigo_estado = data.get("codigo_estado", inst.codigo_estado)
        inst.nome_estado = data.get("nome_estado", inst.nome_estado)
        inst.codigo_municipio = data.get("codigo_municipio", inst.codigo_municipio)
        inst.nome_municipio = data.get("nome_municipio", inst.nome_municipio)
        inst.codigo_regiao = data.get("codigo_regiao", inst.codigo_regiao)
        inst.nome_regiao = data.get("nome_regiao", inst.nome_regiao)
        inst.matriculas_educacao_basica = data.get("matriculas_educacao_basica", inst.matriculas_educacao_basica)
        inst.matriculas_profissionalizante = data.get("matriculas_profissionalizante", inst.matriculas_profissionalizante)
        inst.matriculas_eja = data.get("matriculas_eja", inst.matriculas_eja)
        inst.matriculas_especiais = data.get("matriculas_especiais", inst.matriculas_especiais)
        return inst.to_json(), 200
    else:
        return {"error": "Instituição não encontrada"}, 404


@app.delete("/instituicoesensino/<int:id>")
def deletar_instituicao_ensino(id: int):
    if 0 <= id < len(lista_instituicoes):
        instituicao_removida = lista_instituicoes.pop(id)
        return instituicao_removida.to_json(), 200
    else:
        return {"error": "Instituição não encontrada"}, 404

## Adicionando o CRUD para Usuários

@app.get("/usuarios")
def get_usuarios():
    return jsonify([u.to_json() for u in usuarios]), 200


@app.get("/usuarios/<int:id>")
def get_usuario_por_id(id: int):
    usuario = next((u for u in usuarios if u.id_usuario == id), None)
    if not usuario:
        return jsonify({"erro": "Usuário não encontrado"}), 404
    return jsonify(usuario.to_json()), 200


@app.post("/usuarios")
def adicionar_usuario():
    data = request.get_json()
    novo = Usuario(data["nome"], data["cpf"], data["nascimento"])
    usuarios.append(novo)
    salvar_usuarios(usuarios)
    return jsonify(novo.to_json()), 201


@app.delete("/usuarios/<int:id>")
def deletar_usuario(id: int):
    global usuarios
    usuarios = [u for u in usuarios if u.id_usuario != id]
    salvar_usuarios(usuarios)
    return jsonify({"mensagem": "Usuário removido com sucesso"}), 200


if __name__ == "__main__":
    app.run(debug=True)
