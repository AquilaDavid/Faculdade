package service;

import enums.TipoProcedimento;
import enums.TipoLeito;
import model.Internacao;
import model.Prontuario;
import model.Procedimento;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class ProntuarioIO {

    public Prontuario carregueProntuario(String arquivoCsv) throws IOException {
        Prontuario prontuario = new Prontuario(null);

        Path path = Paths.get(arquivoCsv);

        try (Stream<String> linhas = Files.lines(path)) {
            linhas.skip(1).forEach((str) -> {
                if (str == null || str.trim().isEmpty()) return;

                String[] dados = str.split(",");

                String nomePaciente = dados[0].trim();

                TipoLeito tipoLeito = dados[1] != null && !dados[1].trim().isEmpty() ? TipoLeito.valueOf(dados[1].trim()) : null;

                int qtdeDiasInternacao = dados[2] != null && !dados[2].trim().isEmpty() ? Integer.parseInt(dados[2].trim()) : -1;

                TipoProcedimento tipoProcedimento = dados[3] != null && !dados[3].trim().isEmpty() ? TipoProcedimento.valueOf(dados[3].trim()) : null;

                int qtdeProcedimentos = dados.length == 5 && dados[4] != null && !dados[4].trim().isEmpty() ? Integer.parseInt(dados[4].trim()) : -1;

                prontuario.setNomePaciente(nomePaciente);

                if (tipoLeito != null && qtdeDiasInternacao > 0) {
                    prontuario.setInternacao(new Internacao(tipoLeito, qtdeDiasInternacao));
                }

                if (tipoProcedimento != null && qtdeProcedimentos > 0) {
                    while (qtdeProcedimentos > 0) {
                        prontuario.addProcedimento(new Procedimento(tipoProcedimento));
                        qtdeProcedimentos--;
                    }
                }
            });
        }

        return prontuario;
    }

    public String salveProntuario(Prontuario prontuario) throws IOException {
        List<String> linhas = new ArrayList<>();

        linhas.add("nome_paciente,tipo_leito,qtde_dias_internacao,tipo_procedimento,qtde_procedimentos");

        String cabecalho = prontuario.getNomePaciente() + ",";

        if (prontuario.getInternacao() != null) {
            cabecalho += prontuario.getInternacao().getTipoLeito() + "," + prontuario.getInternacao().getQtdeDias() + ",,";
            linhas.add(cabecalho);
        }

        if (prontuario.getProcedimentos().size() > 0) {
            Map<TipoProcedimento, Long> procedimentosAgrupados = prontuario.getProcedimentos().stream().collect(
                    Collectors.groupingBy(Procedimento::getTipoProcedimento, Collectors.counting()));

            List<TipoProcedimento> procedimentosOrdenados = new ArrayList<>(procedimentosAgrupados.keySet());
            Collections.sort(procedimentosOrdenados);

            for (TipoProcedimento chave : procedimentosOrdenados) {
                String l2 = prontuario.getNomePaciente() + ",,," + chave + "," + procedimentosAgrupados.get(chave);
                linhas.add(l2);
            }
        }

        if (linhas.size() == 1) {
            cabecalho += ",,,";
            linhas.add(cabecalho);
        }

        Path path = Paths.get(prontuario.getNomePaciente().replaceAll(" ", "_").concat(String.valueOf(System.currentTimeMillis())).concat(".csv"));

        Files.write(path, linhas);

        return path.toString();
    }
}
