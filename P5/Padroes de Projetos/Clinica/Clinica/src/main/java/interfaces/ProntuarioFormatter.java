package interfaces;

import model.Prontuario;
import service.ContaResultado;

public interface ProntuarioFormatter {
    String format(Prontuario prontuario, ContaResultado resultado);
}
