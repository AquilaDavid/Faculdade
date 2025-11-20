package model;

public class Filme {
    private String titulo;
    private PrecoFilme preco;

    public Filme(String titulo, PrecoFilme preco) {
        this.titulo = titulo;
        this.preco = preco;
    }

    public String getTitulo() {
        return titulo;
    }

    public PrecoFilme getPreco() {
        return preco;
    }

    public double calcularValor(int diasAluguel) {
        return preco.calcularValor(diasAluguel);
    }

    public int calcularPontos(int diasAluguel) {
        return preco.calcularPontos(diasAluguel);
    }

    
}
