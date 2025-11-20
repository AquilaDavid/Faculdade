import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        Item item1 = new Item("Notebook", 3500.0, 1);
        Item item2 = new Item("Mouse", 120.0, 2);

        Pedido pedido = new Pedido(1, Arrays.asList(item1, item2), "Cartão");

        SistemaPedidos sistema = new SistemaPedidos();
        sistema.processarPedido(pedido);

        System.out.println("Total do pedido: R$" + pedido.getTotal());
    }
}
