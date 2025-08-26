
import java.util.Random;
import java.util.concurrent.locks.ReentrantLock;

public class ExemploProdutorConsumidor {

	public static final int SIZE = 5;
	
	private int[] buffer = new int[SIZE];
	private ReentrantLock[] mutexes = new ReentrantLock[SIZE];

	public ExemploProdutorConsumidor() {
		super();
			
		for (int i = 0; i < mutexes.length; i++) {
			mutexes[i] = new ReentrantLock();
		}
	}

	public void producer() {
		int number = new Random().nextInt(100) + 1;
		boolean inserted = false;
		
		for (int i = 0; i < buffer.length; i++) {
			mutexes[i].tryLock();
			try{

				if(buffer[i] == 0) {
					buffer[i] = number;
					inserted = true;
					System.out.println(String.format("Value %d produced in position %d", number, i));
					mutexes[i].unlock();
					break;
				}
			}finally{
				mutexes[i].unlock();
			}
			
		}
		
		if(!inserted) {
			System.out.println(String.format("Descarting value %d", number));
		}
	}

	public boolean consumer() {
		boolean consumed = false;
		
		for (int i = 0; i < buffer.length; i++) {
			mutexes[i].tryLock();
			try{
				if(buffer[i] != 0) {
					int number = buffer[i];
					buffer[i] = 0;
					consumed = true;	
					System.out.println(String.format("Consuming value %d from position %d", number, i));
					mutexes[i].unlock();
					break;
				}
				
			}finally{
				mutexes[i].unlock();
			}
		}
		
		if(!consumed) {
			System.out.println("Empty Buffer");
		}
		
		return consumed;
	}
	
	public static void main(String[] args) throws InterruptedException {
		ExemploProdutorConsumidor obj = new ExemploProdutorConsumidor();
		
		Thread producerThread = new Thread() {
			@Override
			public void run() {
				for (int i = 0; i < 100; i++) {
					
					obj.producer();					
				}
				
				System.out.println("Producer 1 Thread finished");
			}
		};
		
		Thread producerThread2 = new Thread() {
			@Override
			public void run() {
				for (int i = 0; i < 100; i++) {
					
					obj.producer();					
				}
				
				System.out.println("Producer 2 Thread finished");
			}
		};
		
		Thread producerThread3 = new Thread() {
			@Override
			public void run() {
				for (int i = 0; i < 100; i++) {
					
					obj.producer();					
				}
				
				System.out.println("Producer 3 Thread finished");
			}
		};
		
		Thread consumerThread = new Thread() {
			@Override
			public void run() {
				for (int i = 0; i < 100; ) {
					
					boolean consumed = obj.consumer();		
				
					if(consumed) {
						i++;
					}
				}
				
				System.out.println("Consumer 1 Thread finished");
			}
		};
		
		Thread consumerThread2 = new Thread() {
			@Override
			public void run() {
				for (int i = 0; i < 100; ) {
					
					boolean consumed = obj.consumer();		
					
					if(consumed) {
						i++;
					}
				}
				
				System.out.println("Consumer 2 Thread finished");
			}
		};
		
		Thread consumerThread3 = new Thread() {
			@Override
			public void run() {
				
				for (int i = 0; i < 100; ) {
					boolean consumed = obj.consumer();		
					
					if(consumed) {
						i++;
					}
				}
				
				System.out.println("Consumer 3 Thread finished");
			}
		};
		
		producerThread.start();
		producerThread2.start();
		producerThread3.start();
		
		consumerThread.start();
		consumerThread2.start();
		consumerThread3.start();
		
	}
}