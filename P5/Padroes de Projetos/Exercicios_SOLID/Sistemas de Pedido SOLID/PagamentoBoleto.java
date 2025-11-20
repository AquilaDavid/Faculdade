public class PagamentoBoleto implements Pagamento {
    @Override
    public void pagar(Pedido pedido) {
        System.out.println("Gerando boleto para pagamento...");
    }
}
