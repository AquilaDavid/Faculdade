import java.util.Random;
import java.util.concurrent.locks.ReentrantLock;

public class ProdutorConsumidor {

    private static final int[] vetor = new int[5];
    private static final ReentrantLock[] locks = new ReentrantLock[5];
    private static final Random random = new Random();

    public static void main(String[] args) {

        
        for (int i = 0; i < 5; i++) {
            locks[i] = new ReentrantLock();
        }

        Thread produtor = new Thread(() -> {
            int producoes = 0;
            while (producoes < 100) {
                int valor = random.nextInt(100) + 1;
                boolean inserido = false;

                for (int i = 0; i < 5; i++) {
                    if (locks[i].tryLock()) {
                        try {
                            if (vetor[i] == 0) {
                                vetor[i] = valor;
                                System.out.printf("Produtor inseriu %d na posição %d\n", valor, i);
                                inserido = true;
                                break;
                            }
                        } finally {
                            locks[i].unlock();
                        }
                    }
                }

                if (!inserido) {
                    System.out.printf("Produtor descartou o valor %d (vetor cheio)\n", valor);
                }

                producoes++;

                try {
                    Thread.sleep(20); 
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            }
        });

        Thread consumidor = new Thread(() -> {
            while (true) {
                for (int i = 0; i < 5; i++) {
                    if (locks[i].tryLock()) {
                        try {
                            if (vetor[i] != 0) {
                                System.out.printf("Consumidor removeu %d da posição %d\n", vetor[i], i);
                                vetor[i] = 0;
                            }
                        } finally {
                            locks[i].unlock();
                        }
                    }
                }

                try {
                    Thread.sleep(30); 
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            }
        });

        produtor.start();
        consumidor.start();

        try {
            produtor.join();
            consumidor.interrupt(); // após as 100 produções, encerra o consumidor
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}