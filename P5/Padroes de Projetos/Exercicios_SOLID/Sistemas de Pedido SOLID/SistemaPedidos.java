public class SistemaPedidos {

    private final RepositorioPedido repositorio = new RepositorioPedido();
    private final ProcessadorPagamento processadorPagamento = new ProcessadorPagamento();

    public void processarPedido(Pedido pedido) {
        pedido.calcular();          // 1. Calcula o total
        processadorPagamento.processar(pedido); // 2. Processa o pagamento
        repositorio.salvar(pedido);             // 3. Salva o pedido
    }
}
