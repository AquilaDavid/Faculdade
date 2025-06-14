#include <iostream>
#include <vector>
#include <pthread.h>
#include <chrono>  // Biblioteca para medir o tempo de execução

std::vector<int> array(4, 0);
pthread_mutex_t mutex_array[4] = {PTHREAD_MUTEX_INITIALIZER, PTHREAD_MUTEX_INITIALIZER, PTHREAD_MUTEX_INITIALIZER, PTHREAD_MUTEX_INITIALIZER};
pthread_mutex_t mutex_console = PTHREAD_MUTEX_INITIALIZER;

void* executar_tarefa(void* argumentos) {
    int* params = (int*)argumentos;
    int indice_a = params[0], operacao_a = params[1];
    int indice_b = params[2], operacao_b = params[3];

    for (int i = 0; i < 2000; i++) {
        pthread_mutex_lock(&mutex_array[indice_a]);
        array[indice_a] += operacao_a;
        pthread_mutex_lock(&mutex_console);
        std::cout << "Thread modificando índice " << indice_a << ": novo valor = " << array[indice_a] << std::endl;
        pthread_mutex_unlock(&mutex_console);
        pthread_mutex_unlock(&mutex_array[indice_a]);

        pthread_mutex_lock(&mutex_array[indice_b]);
        array[indice_b] += operacao_b;
        pthread_mutex_lock(&mutex_console);
        std::cout << "Thread modificando índice " << indice_b << ": novo valor = " << array[indice_b] << std::endl;
        pthread_mutex_unlock(&mutex_console);
        pthread_mutex_unlock(&mutex_array[indice_b]);
    }
    return nullptr;
}

int main() {
    auto inicio = std::chrono::high_resolution_clock::now();  // Início da medição do tempo

    pthread_t threads[3];
    int parametros_threads[3][4] = {
        {0, 1, 1, 1},   // Thread1: incrementa índices 0 e 1
        {1, -1, 2, -1}, // Thread2: decrementa índices 1 e 2
        {2, 1, 3, 1}    // Thread3: incrementa índices 2 e 3
    };

    for (int i = 0; i < 3; i++) {
        pthread_create(&threads[i], nullptr, executar_tarefa, parametros_threads[i]);
    }

    for (int i = 0; i < 3; i++) {
        pthread_join(threads[i], nullptr);
    }

    std::cout << "Array final: ";
    for (int valor : array) {
        std::cout << valor << " ";
    }
    std::cout << std::endl;

    for (int i = 0; i < 4; i++) {
        pthread_mutex_destroy(&mutex_array[i]);
    }
    pthread_mutex_destroy(&mutex_console);

    auto fim = std::chrono::high_resolution_clock::now();  // Fim da medição do tempo
    std::chrono::duration<double> duracao = fim - inicio;  // Calcula a duração

    std::cout << "Tempo de execução: " << duracao.count() << " segundos." << std::endl;

    return 0;
}
