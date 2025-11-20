package service;

import enums.TipoLeito;
import model.Prontuario;
import service.ContaResultado;
import interfaces.ProntuarioFormatter;

import java.text.NumberFormat;

public class DefaultProntuarioFormatter implements ProntuarioFormatter {

    @Override
    public String format(Prontuario prontuario, ContaResultado resultado) {
        NumberFormat formatter = NumberFormat.getCurrencyInstance();

        StringBuilder conta = new StringBuilder();
        conta.append("----------------------------------------------------------------------------------------------");

        conta.append("\nA conta do(a) paciente ").append(prontuario.getNomePaciente())
                .append(" tem valor total de __ ").append(formatter.format(resultado.getValorTotal())).append(" __");
        conta.append("\n\nConforme os detalhes abaixo:");

        if (prontuario.getInternacao() != null) {
            conta.append("\n\nValor Total Diárias:\t\t\t").append(formatter.format(resultado.getValorDiarias()));
            conta.append("\n\t\t\t\t\t").append(prontuario.getInternacao().getQtdeDias())
                    .append(" diária").append(prontuario.getInternacao().getQtdeDias() > 1 ? "s" : "")
                    .append(" em ")
                    .append(prontuario.getInternacao().getTipoLeito() == TipoLeito.APARTAMENTO ? "apartamento" : "enfermaria");
        }

        if (prontuario.getProcedimentos().size() > 0) {
            conta.append("\n\nValor Total Procedimentos:\t\t").append(formatter.format(resultado.getValorProcedimentos()));

            if (resultado.getQtdeBasicos() > 0) {
                conta.append("\n\t\t\t\t\t").append(resultado.getQtdeBasicos()).append(" procedimento")
                        .append(resultado.getQtdeBasicos() > 1 ? "s" : "")
                        .append(" básico").append(resultado.getQtdeBasicos() > 1 ? "s" : "");
            }

            if (resultado.getQtdeComuns() > 0) {
                conta.append("\n\t\t\t\t\t").append(resultado.getQtdeComuns()).append(" procedimento")
                        .append(resultado.getQtdeComuns() > 1 ? "s" : "")
                        .append(" comu").append(resultado.getQtdeComuns() > 1 ? "ns" : "m");
            }

            if (resultado.getQtdeAvancados() > 0) {
                conta.append("\n\t\t\t\t\t").append(resultado.getQtdeAvancados()).append(" procedimento")
                        .append(resultado.getQtdeAvancados() > 1 ? "s" : "")
                        .append(" avançado").append(resultado.getQtdeAvancados() > 1 ? "s" : "");
            }
        }

        conta.append("\n\nVolte sempre, a casa é sua!");
        conta.append("\n----------------------------------------------------------------------------------------------");

        return conta.toString();
    }
}
