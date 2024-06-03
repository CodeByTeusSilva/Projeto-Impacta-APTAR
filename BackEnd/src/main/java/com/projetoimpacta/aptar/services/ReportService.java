package com.projetoimpacta.aptar.services;

import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;
import com.projetoimpacta.aptar.dtos.ChamadoDTOout;
import com.projetoimpacta.aptar.dtos.FormsFinalizacaoDTO;
import org.springframework.stereotype.Service;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

@Service
public class ReportService {

    public byte[] generateReport(ChamadoDTOout chamado, FormsFinalizacaoDTO formsFinalizacao) throws DocumentException, IOException {
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        Document document = new Document();
        PdfWriter.getInstance(document, byteArrayOutputStream);

        document.open();
        document.add(new Paragraph("Relatório do Chamado"));

        if (chamado != null) {
            if (chamado.getId() != null) {
                document.add(new Paragraph("ID: " + chamado.getId()));
            }
            if (chamado.getNumeroChamado() != null) {
                document.add(new Paragraph("Número do Chamado: " + chamado.getNumeroChamado()));
            }
            if (chamado.getDataAbertura() != null) {
                document.add(new Paragraph("Data de Abertura: " + chamado.getDataAbertura().toString()));
            }
            if (chamado.getDataFechamento() != null) {
                document.add(new Paragraph("Data de Fechamento: " + chamado.getDataFechamento().toString()));
            }
            if (chamado.getPrioridade() != null) {
                document.add(new Paragraph("Prioridade: " + chamado.getPrioridade()));
            }
            if (chamado.getStatus() != null) {
                document.add(new Paragraph("Status: " + chamado.getStatus()));
            }
            if (chamado.getTitulo() != null) {
                document.add(new Paragraph("Título: " + chamado.getTitulo()));
            }
            if (chamado.getObservacoes() != null) {
                document.add(new Paragraph("Observações: " + chamado.getObservacoes()));
            }
            if (chamado.getEndereco() != null) {
                document.add(new Paragraph("Endereço: " + chamado.getEndereco().toString()));
            }
            if (chamado.getNomeTecnico() != null) {
                document.add(new Paragraph("Técnico: " + chamado.getNomeTecnico()));
            }
            if (chamado.getNomeEmpresa() != null) {
                document.add(new Paragraph("Empresa: " + chamado.getNomeEmpresa()));
            }
        }

        if (formsFinalizacao != null) {
            document.add(new Paragraph(" "));
            document.add(new Paragraph("Formulário de Finalização"));

            if (formsFinalizacao.getId() != null) {
                document.add(new Paragraph("ID: " + formsFinalizacao.getId()));
            }
            if (formsFinalizacao.getChamadoId() != null) {
                document.add(new Paragraph("Chamado ID: " + formsFinalizacao.getChamadoId()));
            }
            if (formsFinalizacao.getObservacoes() != null) {
                document.add(new Paragraph("Observações: " + formsFinalizacao.getObservacoes()));
            }
            if (formsFinalizacao.getFotoUrl() != null) {
                document.add(new Paragraph("Foto URL: " + formsFinalizacao.getFotoUrl()));
            }
        }

        document.close();
        return byteArrayOutputStream.toByteArray();
    }
}