package model;

public class PrecoLancamento implements PrecoFilme {
    @Override
    public double calcularValor(int diasAluguel) {
        return diasAluguel * 3;
    }

    @Override
    public int calcularPontos(int diasAluguel) {
        return (diasAluguel > 1) ? 2 : 1;
    }
}
