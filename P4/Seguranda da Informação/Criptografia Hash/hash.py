import hashlib

def gerar_hash(senha, algoritmo='sha256'):
    senha_bytes = senha.encode('utf-8')
    if algoritmo == 'md5':
        return hashlib.md5(senha_bytes).hexdigest()
    elif algoritmo == 'sha1':
        return hashlib.sha1(senha_bytes).hexdigest()
    elif algoritmo == 'sha256':
        return hashlib.sha256(senha_bytes).hexdigest()
    else:
        raise ValueError("Algoritmo não suportado. Use: md5, sha1 ou sha256.")

def verificar_senha(senha_tentativa, hash_armazenado, algoritmo):
    return gerar_hash(senha_tentativa, algoritmo) == hash_armazenado

def explicacoes():
    print("\n=== Diferenças entre os algoritmos ===")
    print("1. MD5: Algoritmo rápido, mas inseguro, pois colisões já foram encontradas.")
    print("2. SHA-1: Mais seguro que MD5, mas também considerado obsoleto (quebrado).")
    print("3. SHA-256: Muito mais seguro e amplamente usado em sistemas modernos, como blockchain.")
    print("========================================\n")

def main():
    print("=== SISTEMA DE HASH ===")
    explicacoes()
    
    senha_cadastrada = input("Cadastre uma nova senha: ")
    
    hash_md5 = gerar_hash(senha_cadastrada, "md5")
    hash_sha1 = gerar_hash(senha_cadastrada, 'sha1')
    hash_sha256 = gerar_hash(senha_cadastrada, 'sha256')
    
    print(f"\nHash MD5: {hash_md5}")
    print(f"Hash SHA-1: {hash_sha1}")
    print(f"Hash SHA-256: {hash_sha256}")
    
    senha_tentativa = input("\nDigite sua senha para login: ")
    
    print("\nResultados:")
    print(f"MD5: {'Correta' if verificar_senha(senha_tentativa, hash_md5, 'md5') else 'Incorreta'}")
    print(f"SHA-1: {'Correta' if verificar_senha(senha_tentativa, hash_sha1, 'sha1') else 'Incorreta'}")
    print(f"SHA-256: {'Correta' if verificar_senha(senha_tentativa, hash_sha256, 'sha256') else 'Incorreta'}")

if __name__ == "__main__":
    main()
