package service;

import enums.TipoProcedimento;
import model.Internacao;
import model.Procedimento;
import model.Prontuario;
import interfaces.ContaCalculadora;

import java.util.Map;
import java.util.stream.Collectors;

public class ContaCalculadoraImpl implements ContaCalculadora {

    @Override
    public ContaResultado calcular(Prontuario prontuario) {
        float valorDiarias = 0.0f;
        Internacao internacao = prontuario.getInternacao();

        if (internacao != null) {
            int dias = internacao.getQtdeDias();
            switch (internacao.getTipoLeito()) {
                case ENFERMARIA:
                    if (dias <= 3) {
                        valorDiarias = 40.00f * dias;
                    } else if (dias <= 8) {
                        valorDiarias = 35.00f * dias;
                    } else {
                        valorDiarias = 30.00f * dias;
                    }
                    break;
                case APARTAMENTO:
                    if (dias <= 3) {
                        valorDiarias = 100.00f * dias;
                    } else if (dias <= 8) {
                        valorDiarias = 90.00f * dias;
                    } else {
                        valorDiarias = 80.00f * dias;
                    }
                    break;
            }
        }

        Map<TipoProcedimento, Long> procedimentosAgrupados = prontuario.getProcedimentos().stream().collect(
                Collectors.groupingBy(Procedimento::getTipoProcedimento, Collectors.counting()));

        int qtdeBasicos = procedimentosAgrupados.getOrDefault(TipoProcedimento.BASICO, 0L).intValue();
        int qtdeComuns = procedimentosAgrupados.getOrDefault(TipoProcedimento.COMUM, 0L).intValue();
        int qtdeAvancados = procedimentosAgrupados.getOrDefault(TipoProcedimento.AVANCADO, 0L).intValue();

        float valorProcedimentos = qtdeBasicos * 50.0f + qtdeComuns * 150.0f + qtdeAvancados * 500.0f;

        double total = valorDiarias + valorProcedimentos;

        return new ContaResultado(total, valorDiarias, valorProcedimentos, qtdeBasicos, qtdeComuns, qtdeAvancados, "");
    }
}
