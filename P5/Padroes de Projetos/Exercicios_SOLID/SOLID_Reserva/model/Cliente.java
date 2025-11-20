package model;

public class Cliente {
    private String nome;
    private boolean premium;

    public Cliente(String nome, boolean premium) {
        this.nome = nome;
        this.premium = premium;
    }

    public String getNome() {
        return nome;
    }

    public boolean isPremium() {
        return premium;
    }

    
}
