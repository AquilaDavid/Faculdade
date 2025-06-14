from cryptography.fernet import Fernet
from cryptography.hazmat.primitives.asymmetric import rsa, padding
from cryptography.hazmat.primitives import serialization, hashes
import os

def gerar_chave_simetrica():
    chave = Fernet.generate_key()
    with open("chave_simetrica.key", "wb") as f:
        f.write(chave)
    return chave

def carregar_chave_simetrica():
    if not os.path.exists("chave_simetrica.key"):
        return gerar_chave_simetrica()
    with open("chave_simetrica.key", "rb") as f:
        return f.read()

def criptografar_simetrica():
    chave = carregar_chave_simetrica()
    fernet = Fernet(chave)

    mensagem = input("Digite a mensagem: ").encode()
    criptografada = fernet.encrypt(mensagem)

    with open("mensagem_simetrica.txt", "wb") as f:
        f.write(criptografada)

    print("Mensagem criptografada e salva.")

    descriptografada = fernet.decrypt(criptografada)
    print("Mensagem descriptografada:", descriptografada.decode())

def gerar_chaves_rsa():
    chave_privada = rsa.generate_private_key(public_exponent=65537, key_size=2048)
    chave_publica = chave_privada.public_key()

    with open("chave_privada.pem", "wb") as f:
        f.write(
            chave_privada.private_bytes(
                encoding=serialization.Encoding.PEM,
                format=serialization.PrivateFormat.PKCS8,
                encryption_algorithm=serialization.NoEncryption()
            )
        )

    with open("chave_publica.pem", "wb") as f:
        f.write(
            chave_publica.public_bytes(
                encoding=serialization.Encoding.PEM,
                format=serialization.PublicFormat.SubjectPublicKeyInfo
            )
        )

    return chave_privada, chave_publica

def carregar_chaves():
    if not os.path.exists("chave_privada.pem") or not os.path.exists("chave_publica.pem"):
        return gerar_chaves_rsa()
    
    with open("chave_privada.pem", "rb") as f:
        chave_privada = serialization.load_pem_private_key(f.read(), password=None)

    with open("chave_publica.pem", "rb") as f:
        chave_publica = serialization.load_pem_public_key(f.read())

    return chave_privada, chave_publica

def criptografar_rsa():
    chave_privada, chave_publica = carregar_chaves()

    mensagem = input("Digite a mensagem: ").encode()

    criptografada = chave_publica.encrypt(
        mensagem,
        padding.OAEP(
            mgf=padding.MGF1(algorithm=hashes.SHA256()),
            algorithm=hashes.SHA256(),
            label=None
        )
    )

    with open("mensagem_rsa.txt", "wb") as f:
        f.write(criptografada)

    print("Mensagem criptografada salva.")

    descriptografada = chave_privada.decrypt(
        criptografada,
        padding.OAEP(
            mgf=padding.MGF1(algorithm=hashes.SHA256()),
            algorithm=hashes.SHA256(),
            label=None
        )
    )

    print("Mensagem descriptografada:", descriptografada.decode())

def menu():
    while True:
        print("\nMENU")
        print("1. Criptografia Simétrica")
        print("2. Criptografia Assimétrica")
        print("0. Sair")

        opcao = input("Escolha: ")

        if opcao == "1":
            criptografar_simetrica()
        elif opcao == "2":
            criptografar_rsa()
        elif opcao == "0":
            break
        else:
            print("Opção inválida.")

if __name__ == "__main__":
    menu()
