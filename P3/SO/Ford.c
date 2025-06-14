#include <sys/types.h>
#include <unistd.h>
#include <stdio.h>
#include <stdlib.h>
#include <sys/wait.h>

int main() {
    pid_t pid;

    // Criando um novo processo
    pid = fork();

    if (pid < 0) {
        // Caso ocorra erro ao criar o processo
        fprintf(stderr, "Erro ao criar processo.\n");
        exit(-1);
    } else if (pid == 0) {
        // Bloco executado pelo processo filho
        printf("[Processo Filho] PID: %d, PPID: %d\n", getpid(), getppid());
        // Executa um comando (neste caso, 'ls')
        execlp("/bin/ls", "ls", NULL);

        // Caso execlp falhe
        perror("[Processo Filho] Erro ao executar execlp");
        exit(1);
    } else {
        // Bloco executado pelo processo pai
        printf("[Processo Pai] PID: %d. Aguardando término do processo filho...\n", getpid());
        wait(NULL); // Aguarda o término do processo filho
        printf("[Processo Pai] Processo filho finalizado.\n");
    }

    return 0;
}
