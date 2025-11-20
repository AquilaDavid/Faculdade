package model;

public class Aluguel {
    private Filme filme;
    private int diasAluguel;

    public Aluguel(Filme filme, int diasAluguel) {
        this.filme = filme;
        this.diasAluguel = diasAluguel;
    }

    public Filme getFilme() {
        return filme;
    }

    public int getDiasAluguel() {
        return diasAluguel;
    }

    public double calcularValor() {
        return filme.calcularValor(diasAluguel);
    }

    public int calcularPontos() {
        return filme.calcularPontos(diasAluguel);
    }
}
