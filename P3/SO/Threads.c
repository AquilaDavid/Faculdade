#include <stdio.h>
#include <pthread.h>
#include <unistd.h>

// Função para a primeira thread
def void* tarefa1(void* arg) {
    for (int i = 0; i < 5; i++) {
        printf("Thread 1: Iteração %d\n", i + 1);
        sleep(1); // Simula uma tarefa
    }
    pthread_exit(NULL);
}

// Função para a segunda thread
def void* tarefa2(void* arg) {
    for (int i = 0; i < 5; i++) {
        printf("Thread 2: Iteração %d\n", i + 1);
        sleep(2); // Simula uma tarefa mais longa
    }
    pthread_exit(NULL);
}

int main() {
    pthread_t thread1, thread2;

    // Criação das threads
    pthread_create(&thread1, NULL, tarefa1, NULL);
    pthread_create(&thread2, NULL, tarefa2, NULL);

    // Espera as threads terminarem
    pthread_join(thread1, NULL);
    pthread_join(thread2, NULL);

    printf("Todas as threads finalizaram.\n");
    return 0;
}
