package com.projetoimpacta.aptar.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.projetoimpacta.aptar.domain.enums.Prioridade;
import com.projetoimpacta.aptar.domain.enums.Status;
import jakarta.persistence.*;
import jakarta.validation.constraints.FutureOrPresent;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

@Entity
public class Chamado implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(updatable = false)
    private String numeroChamado;

    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate dataAbertura = LocalDate.now();
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate dataFechamento = LocalDate.now();;

    private Prioridade prioridade;
    private Status status;
    private String titulo;
    private String observacoes;
    private Endereco endereco;

    @ManyToOne
    @JoinColumn(name = "tecnico_id")
    private Tecnico tecnico;

    @ManyToOne
    @JoinColumn(name = "empresa_id")
    private Empresa empresa;


    public Chamado() {
    }

    public Chamado(Long id, Prioridade prioridade, Status status, String titulo, String observacoes, Endereco endereco, Tecnico tecnico, Empresa empresa) {
        this.id = id;
        this.numeroChamado = NumeroChamado.proximoNumero();
        this.prioridade = prioridade;
        this.status = status;
        this.titulo = titulo;
        this.observacoes = observacoes;
        this.endereco = endereco;
        this.tecnico = tecnico;
        this.empresa = empresa;
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

    public Prioridade getPrioridade() {
        return prioridade;
    }
    public void setPrioridade(Prioridade prioridade) {
        this.prioridade = prioridade;
    }

    public Status getStatus() {
        return status;
    }
    public void setStatus(Status status) {
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

    public Tecnico getTecnico() {
        return tecnico;
    }
    public void setTecnico(Tecnico tecnico) {
        this.tecnico = tecnico;
    }

    public Empresa getEmpresa() {
        return empresa;
    }
    public void setEmpresa(Empresa empresa) {
        this.empresa = empresa;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Chamado chamado = (Chamado) o;
        return Objects.equals(id, chamado.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
