package service;

import model.Reserva;

public class CalculoValorService {
    public double calcularTotal(Reserva reserva) {
        return reserva.getNumeroDias() * reserva.getQuarto().getPrecoDiaria();
    }
}
