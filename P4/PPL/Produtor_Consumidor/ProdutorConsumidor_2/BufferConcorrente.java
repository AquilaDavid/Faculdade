import java.util.Random;
import java.util.concurrent.locks.ReentrantLock;

public class BufferConcorrente {

    private static final int[] buffer = new int[5];
    private static final ReentrantLock[] locks = new ReentrantLock[5];
    private static final Random random = new Random();
    private static volatile int producoes = 0;
    private static final int MAX_PRODUCOES = 100;

    public static void main(String[] args) throws InterruptedException {
        for (int i = 0; i < 5; i++) locks[i] = new ReentrantLock();

        int numProdutores = 5; 
        int numConsumidores = 2; 

        Thread[] produtores = new Thread[numProdutores];
        Thread[] consumidores = new Thread[numConsumidores];

       
        for (int i = 0; i < numProdutores; i++) {
            produtores[i] = new Thread(new Produtor(), "Produtor-" + i);
            produtores[i].start();
        }

     
        for (int i = 0; i < numConsumidores; i++) {
            consumidores[i] = new Thread(new Consumidor(), "Consumidor-" + i);
            consumidores[i].start();
        }

        
        for (Thread produtor : produtores) produtor.join();

        
        for (Thread consumidor : consumidores) consumidor.interrupt();
    }

    static class Produtor implements Runnable {
        public void run() {
            while (true) {
                int valor;
                synchronized (BufferConcorrente.class) {
                    if (producoes >= MAX_PRODUCOES) break;
                    producoes++;
                    valor = random.nextInt(100) + 1;
                }

                boolean inserido = false;
                for (int i = 0; i < 5; i++) {
                    if (locks[i].tryLock()) {
                        try {
                            if (buffer[i] == 0) {
                                buffer[i] = valor;
                                System.out.printf("[%s] inseriu %d na posição %d\n", Thread.currentThread().getName(), valor, i);
                                inserido = true;
                                break;
                            }
                        } finally {
                            locks[i].unlock();
                        }
                    }
                }

                if (!inserido) {
                    System.out.printf("[%s] descartou valor %d (buffer cheio)\n", Thread.currentThread().getName(), valor);
                }

                try {
                    Thread.sleep(10); // simula tempo de produção
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            }
        }
    }

    static class Consumidor implements Runnable {
        public void run() {
            while (!Thread.currentThread().isInterrupted()) {
                for (int i = 0; i < 5; i++) {
                    if (locks[i].tryLock()) {
                        try {
                            if (buffer[i] != 0) {
                                int valor = buffer[i];
                                buffer[i] = 0;
                                System.out.printf("[%s] removeu %d da posição %d\n", Thread.currentThread().getName(), valor, i);
                            }
                        } finally {
                            locks[i].unlock();
                        }
                    }
                }

                try {
                    Thread.sleep(15); // simula tempo de consumo
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            }
        }
    }
}