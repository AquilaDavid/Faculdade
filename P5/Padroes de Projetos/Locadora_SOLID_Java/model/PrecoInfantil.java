package model;

public class PrecoInfantil implements PrecoFilme {
    @Override
    public double calcularValor(int diasAluguel) {
        double valor = 2;
        if (diasAluguel > 2)
            valor += (diasAluguel - 2) * 1.5;
        return valor;
    }

    @Override
    public int calcularPontos(int diasAluguel) {
        return 1;
    }
}
