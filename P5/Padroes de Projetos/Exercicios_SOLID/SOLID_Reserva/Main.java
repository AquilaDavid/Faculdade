import model.*;
import service.*;

public class Main {
    public static void main(String[] args) {
        Cliente cliente = new Cliente("João", true);
        Quarto quarto = new Quarto("101", 200.0, true);
        Reserva reserva = new Reserva(cliente, quarto, 3);

        CalculoValorService calculoService = new CalculoValorService();
        DescontoService descontoService = new DescontoService();
        ReservaService reservaService = new ReservaService(calculoService, descontoService);

        reservaService.processarReserva(reserva);
    }
}
