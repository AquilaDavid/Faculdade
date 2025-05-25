#include <stdio.h>
#include <stdlib.h>
#include <windows.h>

// Variáveis compartilhadas
int shared_var1 = 0;
int shared_var2 = 0;

// Objeto para sincronização
CRITICAL_SECTION critical_section;

// Número de iterações por thread
#define ITERATIONS 10

// Função para thread 1
DWORD WINAPI thread_function1(LPVOID arg) {
    for (int i = 0; i < ITERATIONS; i++) {
        EnterCriticalSection(&critical_section);  // Bloqueia acesso às variáveis compartilhadas
        shared_var1++;
        printf("[Thread 1] Iteração %d: shared_var1 = %d\n", i, shared_var1);
        LeaveCriticalSection(&critical_section);  // Libera acesso às variáveis compartilhadas
    }
    return 0;
}

// Função para thread 2
DWORD WINAPI thread_function2(LPVOID arg) {
    for (int i = 0; i < ITERATIONS; i++) {
        EnterCriticalSection(&critical_section);  // Bloqueia acesso às variáveis compartilhadas
        shared_var2 += 2;
        printf("[Thread 2] Iteração %d: shared_var2 = %d\n", i, shared_var2);
        LeaveCriticalSection(&critical_section);  // Libera acesso às variáveis compartilhadas
    }
    return 0;
}

int main() {
    HANDLE thread1, thread2;  // Handles para as threads
    DWORD thread1_id, thread2_id;

    // Inicializar a seção crítica
    InitializeCriticalSection(&critical_section);

    // Criar as threads
    thread1 = CreateThread(NULL, 0, thread_function1, NULL, 0, &thread1_id);
    if (thread1 == NULL) {
        perror("Erro ao criar thread 1");
        exit(EXIT_FAILURE);
    }

    thread2 = CreateThread(NULL, 0, thread_function2, NULL, 0, &thread2_id);
    if (thread2 == NULL) {
        perror("Erro ao criar thread 2");
        exit(EXIT_FAILURE);
    }

    // Aguardar o término das threads
    WaitForSingleObject(thread1, INFINITE);
    WaitForSingleObject(thread2, INFINITE);

    // Fechar os handles das threads
    CloseHandle(thread1);
    CloseHandle(thread2);

    // Exibir os resultados finais
    printf("\n[Main Thread] Execução concluída.\n");
    printf("Valor final de shared_var1: %d\n", shared_var1);
    printf("Valor final de shared_var2: %d\n", shared_var2);

    // Deletar a seção crítica
    DeleteCriticalSection(&critical_section);

    return 0;
}
