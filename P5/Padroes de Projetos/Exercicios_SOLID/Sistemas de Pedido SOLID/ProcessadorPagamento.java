import java.util.HashMap;
import java.util.Map;

public class ProcessadorPagamento {

    private Map<String, Pagamento> formasPagamento = new HashMap<>();

    public ProcessadorPagamento() {
        formasPagamento.put("Cartão", new PagamentoCartao());
        formasPagamento.put("Boleto", new PagamentoBoleto());
    }

    public Pagamento escolherFormaDePagamento(String forma) {
        if (formasPagamento.containsKey(forma)) {
            return formasPagamento.get(forma);
        } else {
            throw new IllegalArgumentException("Forma de pagamento inválida!");
        }
    }

    public void processar(Pedido pedido) {
        Pagamento pagamento = escolherFormaDePagamento(pedido.getFormaPagamento());
        pagamento.pagar(pedido);
    }
}
