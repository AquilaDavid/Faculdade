package service;

import model.Aluguel;
import model.Cliente;

public class RelatorioAlugueis {
    public String gerar(Cliente cliente) {
        double valorTotal = 0;
        int pontos = 0;
        StringBuilder dados = new StringBuilder();

        dados.append("Registro de Aluguéis do cliente: " + cliente.getNome() + "\n");

        for (Aluguel aluguel : cliente.getAlugueis()) {
            double valor = aluguel.calcularValor();
            pontos += aluguel.calcularPontos();

            dados.append("\t" + aluguel.getFilme().getTitulo() + "\t= R$ " + valor + "\n");
            valorTotal += valor;
        }

        dados.append("Total gasto: R$ " + valorTotal + "\n");
        dados.append("Pontos ganhos: " + pontos);

        return dados.toString();
    }
}
