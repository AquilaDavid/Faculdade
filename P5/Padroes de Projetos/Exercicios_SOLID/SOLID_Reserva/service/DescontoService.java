package service;

import model.Reserva;

public class DescontoService {
    public double aplicarDesconto(Reserva reserva, double total) {
        if (reserva.getCliente().isPremium()) {
            return total * 0.9; // 10% de desconto
        }
        return total;
    }
}
