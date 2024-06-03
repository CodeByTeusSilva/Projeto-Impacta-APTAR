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

    public String generateReportHtml(ChamadoDTOout chamado, FormsFinalizacaoDTO formsFinalizacao) {
        StringBuilder html = new StringBuilder();

        html.append("<html>");
        html.append("<head>");
        html.append("<style>");
        html.append("body { font-family: Arial, sans-serif; margin: 20px; }");
        html.append("h1 { color: #333; }");
        html.append("p { color: #666; }");
        html.append("table { width: 100%; border-collapse: collapse; margin-top: 20px; }");
        html.append("th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }");
        html.append("th { background-color: #f2f2f2; }");
        html.append("</style>");
        html.append("</head>");
        html.append("<body>");

        html.append("<h1>Relatório do Chamado</h1>");

        if (chamado != null) {
            html.append("<table>");
            if (chamado.getId() != null) {
                html.append("<tr><th>ID</th><td>").append(chamado.getId()).append("</td></tr>");
            }
            if (chamado.getNumeroChamado() != null) {
                html.append("<tr><th>Número do Chamado</th><td>").append(chamado.getNumeroChamado()).append("</td></tr>");
            }
            if (chamado.getDataAbertura() != null) {
                html.append("<tr><th>Data de Abertura</th><td>").append(chamado.getDataAbertura().toString()).append("</td></tr>");
            }
            if (chamado.getDataFechamento() != null) {
                html.append("<tr><th>Data de Fechamento</th><td>").append(chamado.getDataFechamento().toString()).append("</td></tr>");
            }
            if (chamado.getPrioridade() != null) {
                html.append("<tr><th>Prioridade</th><td>").append(chamado.getPrioridade()).append("</td></tr>");
            }
            if (chamado.getStatus() != null) {
                html.append("<tr><th>Status</th><td>").append(chamado.getStatus()).append("</td></tr>");
            }
            if (chamado.getTitulo() != null) {
                html.append("<tr><th>Título</th><td>").append(chamado.getTitulo()).append("</td></tr>");
            }
            if (chamado.getObservacoes() != null) {
                html.append("<tr><th>Observações</th><td>").append(chamado.getObservacoes()).append("</td></tr>");
            }
            if (chamado.getEndereco() != null) {
                html.append("<tr><th>Endereço</th><td>").append(chamado.getEndereco().toString()).append("</td></tr>");
            }
            if (chamado.getNomeTecnico() != null) {
                html.append("<tr><th>Técnico</th><td>").append(chamado.getNomeTecnico()).append("</td></tr>");
            }
            if (chamado.getNomeEmpresa() != null) {
                html.append("<tr><th>Empresa</th><td>").append(chamado.getNomeEmpresa()).append("</td></tr>");
            }
            html.append("</table>");
        }

        if (formsFinalizacao != null) {
            html.append("<h2>Formulário de Finalização</h2>");
            html.append("<table>");
            if (formsFinalizacao.getId() != null) {
                html.append("<tr><th>ID</th><td>").append(formsFinalizacao.getId()).append("</td></tr>");
            }
            if (formsFinalizacao.getChamadoId() != null) {
                html.append("<tr><th>Chamado ID</th><td>").append(formsFinalizacao.getChamadoId()).append("</td></tr>");
            }
            if (formsFinalizacao.getObservacoes() != null) {
                html.append("<tr><th>Observações</th><td>").append(formsFinalizacao.getObservacoes()).append("</td></tr>");
            }
            if (formsFinalizacao.getFotoUrl() != null) {
                html.append("<tr><th>Foto URL</th><td>").append(formsFinalizacao.getFotoUrl()).append("</td></tr>");
            }
            html.append("</table>");
        }

        html.append("</body>");
        html.append("</html>");

        return html.toString();
    }

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