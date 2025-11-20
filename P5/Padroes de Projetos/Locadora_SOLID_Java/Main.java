import model.*;
import service.*;

public class Main {
    public static void main(String[] args) {
        Filme f1 = new Filme("Vingadores", new PrecoLancamento());
        Filme f2 = new Filme("Toy Story", new PrecoInfantil());
        Filme f3 = new Filme("Titanic", new PrecoNormal());

        Cliente cliente = new Cliente("Áquila");

        cliente.adicionarAluguel(new Aluguel(f1, 3));
        cliente.adicionarAluguel(new Aluguel(f2, 4));
        cliente.adicionarAluguel(new Aluguel(f3, 2));

        RelatorioAlugueis relatorio = new RelatorioAlugueis();
        System.out.println(relatorio.gerar(cliente));
    }
}
