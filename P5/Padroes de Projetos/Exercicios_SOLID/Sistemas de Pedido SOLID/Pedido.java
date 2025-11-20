import java.util.List;

public class Pedido {
    private int id;
    private List<Item> itens;
    private double total;
    private String formaPagamento;

    public Pedido(int id, List<Item> itens, String formaPagamento) {
        this.id = id;
        this.itens = itens;
        this.formaPagamento = formaPagamento;
    }

    public int getId() { return id; }
    public List<Item> getItens() { return itens; }
    public String getFormaPagamento() { return formaPagamento; }
    public void setTotal(double total) { this.total = total; }
    public double getTotal() { return total; }
     public void calcular( ) {
        double total = 0;
        for (Item item : getItens()) {
            total += item.getPreco() * item.getQuantidade();
        }
        setTotal(total);
    }
}
