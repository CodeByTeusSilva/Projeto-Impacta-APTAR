package com.projetoimpacta.aptar.dtos;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.projetoimpacta.aptar.domain.Chamado;
import com.projetoimpacta.aptar.domain.Endereco;
import jakarta.validation.constraints.NotNull;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDate;

public class ChamadoDTOout implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    private Long id;
    private String numeroChamado;

    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate dataAbertura = LocalDate.now();
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate dataFechamento = LocalDate.now();
    @NotNull(message = "O campo PRIORIDADE é requerido")
    private String prioridade;
    @NotNull(message = "O campo STATUS é requerido")
    private Integer status;
    @NotNull(message = "O campo TITULO é requerido")
    private String titulo;
    @NotNull(message = "O campo OBSERVAÇÕES é requerido")
    private String observacoes;
    @NotNull(message = "O campo ENDEREÇO é requerido")
    private Endereco endereco;
    @NotNull(message = "O campo TÉCNICO é requerido")
    private Long tecnico;
    @NotNull(message = "O campo EMPRESA é requerido")
    private Long empresa;
    private String nomeTecnico;
    private String nomeEmpresa;


    public ChamadoDTOout() {
    }

    public ChamadoDTOout(Chamado obj) {
        this.id = obj.getId();
        this.numeroChamado = obj.getNumeroChamado();
        this.dataAbertura = obj.getDataAbertura();
        this.dataFechamento = obj.getDataFechamento();
        this.prioridade = obj.getPrioridade().getDescricao();
        this.status = obj.getStatus().getCodigo();
        this.titulo = obj.getTitulo();
        this.observacoes = obj.getObservacoes();
        this.endereco = obj.getEndereco();
        this.tecnico = obj.getTecnico().getId();
        this.empresa = obj.getEmpresa().getId();
        this.nomeTecnico = obj.getTecnico().getNome();
        this.nomeEmpresa = obj.getEmpresa().getNome();
    }


    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public String getNumeroChamado() {
        return numeroChamado;
    }
    public void setNumeroChamado(String numeroChamado) {
        this.numeroChamado = numeroChamado;
    }

    public LocalDate getDataAbertura() {
        return dataAbertura;
    }
    public void setDataAbertura(LocalDate dataAbertura) {
        this.dataAbertura = dataAbertura;
    }

    public LocalDate getDataFechamento() {
        return dataFechamento;
    }
    public void setDataFechamento(LocalDate dataFechamento) {
        this.dataFechamento = dataFechamento;
    }

    public String getPrioridade() {
        return prioridade;
    }
    public void setPrioridade(String prioridade) {
        this.prioridade = prioridade;
    }

    public Integer getStatus() {
        return status;
    }
    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getTitulo() {
        return titulo;
    }
    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getObservacoes() {
        return observacoes;
    }
    public void setObservacoes(String observacoes) {
        this.observacoes = observacoes;
    }

    public Endereco getEndereco() {
        return endereco;
    }
    public void setEndereco(Endereco endereco) {
        this.endereco = endereco;
    }

    public Long getTecnico() {
        return tecnico;
    }
    public void setTecnico(Long tecnico) {
        this.tecnico = tecnico;
    }

    public Long getEmpresa() {
        return empresa;
    }
    public void setEmpresa(Long empresa) {
        this.empresa = empresa;
    }

    public String getNomeTecnico() {
        return nomeTecnico;
    }
    public void setNomeTecnico(String nomeTecnico) {
        this.nomeTecnico = nomeTecnico;
    }

    public String getNomeEmpresa() {
        return nomeEmpresa;
    }
    public void setNomeEmpresa(String nomeEmpresa) {
        this.nomeEmpresa = nomeEmpresa;
    }

}
