package service;

public class ContaResultado {
    private double valorTotal;
    private float valorDiarias;
    private float valorProcedimentos;
    private int qtdeBasicos;
    private int qtdeComuns;
    private int qtdeAvancados;
    private String detalhes;

    public ContaResultado(double valorTotal, float valorDiarias, float valorProcedimentos,
                          int qtdeBasicos, int qtdeComuns, int qtdeAvancados, String detalhes) {
        this.valorTotal = valorTotal;
        this.valorDiarias = valorDiarias;
        this.valorProcedimentos = valorProcedimentos;
        this.qtdeBasicos = qtdeBasicos;
        this.qtdeComuns = qtdeComuns;
        this.qtdeAvancados = qtdeAvancados;
        this.detalhes = detalhes;
    }

    public double getValorTotal() {
        return valorTotal;
    }

    public float getValorDiarias() {
        return valorDiarias;
    }

    public float getValorProcedimentos() {
        return valorProcedimentos;
    }

    public int getQtdeBasicos() {
        return qtdeBasicos;
    }

    public int getQtdeComuns() {
        return qtdeComuns;
    }

    public int getQtdeAvancados() {
        return qtdeAvancados;
    }

    public String getDetalhes() {
        return detalhes;
    }
}
