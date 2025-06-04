# Faculdade

```Diagrama de Classes
@startuml
class Cliente {
  - nome: String
  - cpf: String
  - cartao: CartaoCredito
  + alugarVeiculo()
  + devolverVeiculo()
}

class Veiculo {
  - placa: String
  - cor: String
  - modelo: String
  - ano: int
  - precoPorDia: double
  - disponivel: boolean
  + alugar()
  + devolver()
  + estaDisponivel()
}

class Aluguel {
  - dataInicio: Date
  - diasAlugados: int
  - precoTotal: double
  - dataDevolucao: Date
  - multa: double
  - status: String
  + calcularPreco()
  + verificarMulta()
  + finalizar()
}

class CartaoCredito {
  - numero: String
  - validade: Date
  - cvv: String
  - aprovado: boolean
  + verificarAprovacao()
}

Cliente "1" -- "1" CartaoCredito
Cliente "1" -- "1" Aluguel
Veiculo "1" -- "1" Aluguel
@enduml
```



```Diagrama de Objetos
@startuml
object ClienteJoao {
  nome = "João Silva"
  cpf = "123.456.789-00"
}

object CartaoJoao {
  numero = "1111-2222-3333-4444"
  validade = "12/2026"
  aprovado = true
}

object VeiculoFordKa {
  placa = "ABC-1234"
  cor = "Prata"
  modelo = "Ford Ka"
  ano = 2020
  precoPorDia = 100.00
  disponivel = false
}

object AluguelAtivo {
  dataInicio = "01/06/2025"
  diasAlugados = 5
  precoTotal = 500.00
  dataDevolucao = "06/06/2025"
  multa = 0.00
  status = "Ativo"
}

ClienteJoao --> CartaoJoao
ClienteJoao --> AluguelAtivo
AluguelAtivo --> VeiculoFordKa
@enduml
```

