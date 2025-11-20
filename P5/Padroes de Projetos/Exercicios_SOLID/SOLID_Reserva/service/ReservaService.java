package service;

import java.util.ArrayList;
import java.util.List;

import model.Reserva;

public class ReservaService {
    private List<Reserva> reservas = new ArrayList<>();
    private CalculoValorService calculoService;
    private DescontoService descontoService;

    public ReservaService(CalculoValorService calculoService, DescontoService descontoService) {
        this.calculoService = calculoService;
        this.descontoService = descontoService;
    }

    public void processarReserva(Reserva reserva) {
        if (!reserva.getQuarto().isDisponivel()) {
            throw new RuntimeException("Quarto indisponível!");
        }

        double total = calculoService.calcularTotal(reserva);
        total = descontoService.aplicarDesconto(reserva, total);
        reserva.setTotal(total);

        reserva.getQuarto().setDisponivel(false);
        reservas.add(reserva);

        System.out.println("Reserva confirmada: " + reserva.getCodigo() + 
                           " | Total: R$ " + reserva.getTotal());
    }
}
