package model;

public class Reserva {
    private static int contador = 1;

    private int codigo;
    private Cliente cliente;
    private Quarto quarto;
    private int numeroDias;
    private double total;

    public Reserva(Cliente cliente, Quarto quarto, int numeroDias) {
        this.codigo = contador++;
        this.cliente = cliente;
        this.quarto = quarto;
        this.numeroDias = numeroDias;
    }

    public int getCodigo() {
        return codigo;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public Quarto getQuarto() {
        return quarto;
    }

    public int getNumeroDias() {
        return numeroDias;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }
}
