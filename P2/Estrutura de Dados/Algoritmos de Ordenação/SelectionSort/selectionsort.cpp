#include <iostream>
#include <vector>
#include <algorithm> // Para a função sort, usada na busca binária

using namespace std;

// Função de busca sequencial
int buscaSequencial(const vector<int>& v, int chave) {
    // Percorre todo o vetor procurando o valor da chave
    for (int i = 0; i < v.size(); ++i) {
        if (v[i] == chave) {
            return i; // Retorna o índice se a chave for encontrada
        }
    }
    return -1; // Retorna -1 se a chave não for encontrada
}

// Função de busca binária
int buscaBinaria(const vector<int>& v, int chave) {
    int inicio = 0;
    int fim = v.size() - 1;

    // Enquanto o intervalo de busca não estiver vazio
    while (inicio <= fim) {
        int meio = inicio + (fim - inicio) / 2; // Encontra o índice do meio

        if (v[meio] == chave) {
            return meio; // Retorna o índice se a chave for encontrada
        } else if (v[meio] < chave) {
            inicio = meio + 1; // Ajusta o início se a chave for maior que o meio
        } else {
            fim = meio - 1; // Ajusta o fim se a chave for menor que o meio
        }
    }
    return -1; // Retorna -1 se a chave não for encontrada
}

int main() {
    // Cria um vetor de inteiros
    vector<int> v = {10, 20, 30, 40, 50, 60, 70, 80, 90, 100};

    // Valor que queremos encontrar no vetor
    int chave = 70;

    // Busca sequencial
    int resultadoSeq = buscaSequencial(v, chave);
    if (resultadoSeq != -1) {
        cout << "Busca Sequencial: Valor encontrado no índice " << resultadoSeq << endl;
    } else {
        cout << "Busca Sequencial: Valor não encontrado" << endl;
    }

    // Busca binária
    // Nota: Busca binária requer que o vetor esteja ordenado. No exemplo, o vetor já está ordenado.
    int resultadoBin = buscaBinaria(v, chave);
    if (resultadoBin != -1) {
        cout << "Busca Binária: Valor encontrado no índice " << resultadoBin << endl;
    } else {
        cout << "Busca Binária: Valor não encontrado" << endl;
    }

    return 0;
}
