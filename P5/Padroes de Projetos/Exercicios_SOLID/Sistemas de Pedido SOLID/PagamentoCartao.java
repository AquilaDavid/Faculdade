public class PagamentoCartao implements Pagamento {
    @Override
    public void pagar(Pedido pedido) {
        System.out.println("Processando pagamento com cartão...");
    }
}
