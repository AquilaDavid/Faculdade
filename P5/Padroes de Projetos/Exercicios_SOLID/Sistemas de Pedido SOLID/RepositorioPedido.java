import java.util.ArrayList;
import java.util.List;

public class RepositorioPedido {
    private List<Pedido> pedidos = new ArrayList<>();

    public void salvar(Pedido pedido) {
        pedidos.add(pedido);
        System.out.println("Pedido salvo com ID: " + pedido.getId());
    }
}
