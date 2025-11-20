package model;

public class Quarto {
    private String numero;
    private double precoDiaria;
    private boolean disponivel;

    public Quarto(String numero, double precoDiaria, boolean disponivel) {
        this.numero = numero;
        this.precoDiaria = precoDiaria;
        this.disponivel = disponivel;
    }

    public String getNumero() {
        return numero;
    }

    public double getPrecoDiaria() {
        return precoDiaria;
    }

    public boolean isDisponivel() {
        return disponivel;
    }

    public void setDisponivel(boolean disponivel) {
        this.disponivel = disponivel;
    }
}
