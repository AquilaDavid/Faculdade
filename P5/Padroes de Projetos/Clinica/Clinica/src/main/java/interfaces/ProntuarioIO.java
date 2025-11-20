package interfaces;

import model.Prontuario;
import java.io.IOException;

public interface ProntuarioIO {
    Prontuario carregueProntuario(String arquivoCsv) throws IOException;
    String salveProntuario(Prontuario prontuario) throws IOException;
}
