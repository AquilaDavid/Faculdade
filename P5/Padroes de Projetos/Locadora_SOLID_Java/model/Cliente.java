package model;

import java.util.ArrayList;
import java.util.List;

public class Cliente {
    private String nome;
    private List<Aluguel> alugueis = new ArrayList<>();

    public Cliente(String nome) {
        this.nome = nome;
    }

    public void adicionarAluguel(Aluguel aluguel) {
        alugueis.add(aluguel);
    }

    public String getNome() {
        return nome;
    }

    public List<Aluguel> getAlugueis() {
        return alugueis;
    }
}
