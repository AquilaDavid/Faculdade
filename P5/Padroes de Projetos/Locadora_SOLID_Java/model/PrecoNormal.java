package model;

public class PrecoNormal implements PrecoFilme {
    @Override
    public double calcularValor(int diasAluguel) {
        double valor = 1.5;
        if (diasAluguel > 3)
            valor += (diasAluguel - 3) * 1.5;
        return valor;
    }

    @Override
    public int calcularPontos(int diasAluguel) {
        return 1;
    }
}
