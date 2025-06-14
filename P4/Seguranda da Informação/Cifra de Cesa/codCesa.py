def cifra_cesar(mensagem, chave):
    resultado = ""
    for letra in mensagem:
        if letra.isalpha():
            base = ord('A')if letra.isupper() else ord('a')
            deslocada = (ord(letra) - base + chave) % 26 + base
            resultado += chr(deslocada)
        else:
            resultado += letra
    return resultado

mensagem = input('Digite sua mensagem: ')
chave = int(input('Digite sua chave (ex: 3): '))

mensagem_codificada = cifra_cesar(mensagem, chave)
print('Codificada:', mensagem_codificada)

mensagem_descodificada = cifra_cesar(mensagem_codificada, - chave)
print('Descodificada: ',mensagem_descodificada)