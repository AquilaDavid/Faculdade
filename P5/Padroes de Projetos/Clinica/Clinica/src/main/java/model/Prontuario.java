package model;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashSet;
import java.util.Set;

// enums imports removed; not used directly in this model
import interfaces.ContaCalculadora;
import service.ContaCalculadoraImpl;
import service.ContaResultado;
import service.ProntuarioFormatter;
import service.ProntuarioIO;

public class Prontuario  {

	private String nomePaciente;
	private Internacao internacao;
	private Set<Procedimento> procedimentos = new HashSet<>();
	private ContaCalculadora contaCalculadora;
	private interfaces.ProntuarioFormatter prontuarioFormatter;
	private interfaces.ProntuarioIO prontuarioIO;

	public Prontuario(String nomePaciente) {
		this(nomePaciente, new ContaCalculadoraImpl(), new service.DefaultProntuarioFormatter(), new service.DefaultProntuarioIO());
	}

	public Prontuario(String nomePaciente, ContaCalculadora contaCalculadora, interfaces.ProntuarioFormatter prontuarioFormatter, interfaces.ProntuarioIO prontuarioIO) {
		this.nomePaciente = nomePaciente;
		this.contaCalculadora = contaCalculadora;
		this.prontuarioFormatter = prontuarioFormatter;
		this.prontuarioIO = prontuarioIO;
	}

	public void setNomePaciente(String nomePaciente) {
		this.nomePaciente = nomePaciente;
	}

	public String getNomePaciente() {
		return this.nomePaciente;
	}

	public void setInternacao(Internacao internacao) {
		this.internacao = internacao;
	}

	public Internacao getInternacao() {
		return this.internacao;
	}

	public void addProcedimento(Procedimento procedimento) {
		this.procedimentos.add(procedimento);
	}

	public Set<Procedimento> getProcedimentos() {
		return this.procedimentos;
	}

	public String imprimaConta() {
		ContaResultado resultado = this.contaCalculadora.calcular(this);
		return this.prontuarioFormatter.format(this, resultado);
	}

	// cálculo de diárias agora está em ContaCalculadoraImpl

	public Prontuario carregueProntuario(String arquivoCsv) throws IOException {
		return this.prontuarioIO.carregueProntuario(arquivoCsv);
	}

	public String salveProntuario() throws IOException {
		return this.prontuarioIO.salveProntuario(this);
	}
}
