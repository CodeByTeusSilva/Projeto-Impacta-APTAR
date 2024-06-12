package com.projetoimpacta.aptar.services;

import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;
import com.projetoimpacta.aptar.dtos.ChamadoDTOout;
import com.projetoimpacta.aptar.dtos.FormsFinalizacaoDTO;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

import static org.springframework.data.jpa.domain.AbstractPersistable_.id;

@Service
public class ReportService {

    private static final String LOGO_URL = "http://localhost:8080/aptarBlue.png";

    public String generateReportHtml(ChamadoDTOout chamado, FormsFinalizacaoDTO formsFinalizacao) {
        StringBuilder html = new StringBuilder();

        html.append("<html>")
                .append("<head>")
                .append("<meta charset=\"UTF-8\">")
                .append("<title>Relatório do Chamado ").append(chamado.getNumeroChamado()).append("</title>")
                .append("<style>")
                .append("body { font-family: 'Arial', sans-serif; margin: 0 auto; max-width: 800px; padding: 20px; }")
                .append("h1, h2 { color: #333; text-align: center; }")
                .append("p { color: #666; }")
                .append("table { width: 100%; border-collapse: collapse; margin-top: 20px; }")
                .append("th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }")
                .append("th { background-color: #f2f2f2; }")
                .append("img.logo { display: block; margin: 0 auto 20px; max-width: 150px; }")
                .append("</style>")
                .append("</head>")
                .append("<body>");

        // Adicionando a imagem do logo
        html.append("<img src=\"").append(LOGO_URL).append("\" alt=\"Logo Aptar\" class=\"logo\" />");

        html.append("<h1>Relatório do Chamado ").append(chamado.getNumeroChamado()).append("</h1>");

        if (chamado != null) {
            html.append("<table>");
            addTableRow(html, "ID", chamado.getId());
            addTableRow(html, "Número do Chamado", chamado.getNumeroChamado());
            addTableRow(html, "Data de Abertura", chamado.getDataAbertura());
            addTableRow(html, "Data de Fechamento", chamado.getDataFechamento());
            addTableRow(html, "Prioridade", chamado.getPrioridade());
            addTableRow(html, "Status", chamado.getStatus());
            addTableRow(html, "Título", chamado.getTitulo());
            addTableRow(html, "Observações", chamado.getObservacoes());
            addTableRow(html, "Endereço", chamado.getEndereco());
            addTableRow(html, "Técnico", chamado.getNomeTecnico());
            addTableRow(html, "Empresa", chamado.getNomeEmpresa());
            html.append("</table>");
        }

        if (formsFinalizacao != null) {
            html.append("<h2>Formulário de Finalização</h2>");
            html.append("<table>");
            addTableRow(html, "ID", formsFinalizacao.getId());
            addTableRow(html, "Chamado ID", formsFinalizacao.getChamadoId());
            addTableRow(html, "Observações", formsFinalizacao.getObservacoes());
            addTableRow(html, "Foto URL", formsFinalizacao.getFotoUrl());
            html.append("</table>");
        }

        Long id = chamado.getId();

        // Adicionar link de download com nome dinâmico
        html.append("<p style=\"text-align: center; margin-top: 20px;\">")
                .append("<a href=\"/reports/chamado/")
                .append(id)
                .append("/pdf\" target=\"_blank\">Download Relatório em PDF</a>")
                .append("</p>");

        html.append("</body>")
                .append("</html>");

        return html.toString();
    }

    private void addTableRow(StringBuilder html, String label, Object value) {
        if (value != null) {
            html.append("<tr><th>").append(label).append("</th><td>").append(value.toString()).append("</td></tr>");
        }
    }

    public byte[] generateReport(ChamadoDTOout chamado, FormsFinalizacaoDTO formsFinalizacao) throws DocumentException, IOException {
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        Document document = new Document();
        PdfWriter.getInstance(document, byteArrayOutputStream);

        document.open();
        document.addTitle("Relatório do Chamado " + chamado.getNumeroChamado());
        document.addAuthor("Aptar");
        document.addSubject("Relatório gerado automaticamente");
        document.addKeywords("Java, PDF, iText, Spring Boot");

        // Configuração do padrão A4 e centralização do conteúdo
        document.setPageSize(com.itextpdf.text.PageSize.A4);
        document.add(new Paragraph(" ", new com.itextpdf.text.Font(com.itextpdf.text.Font.FontFamily.HELVETICA, 12)));
        document.add(new Paragraph(" ", new com.itextpdf.text.Font(com.itextpdf.text.Font.FontFamily.HELVETICA, 12)));
        document.add(new Paragraph("Relatório do Chamado " + chamado.getNumeroChamado(),
                new com.itextpdf.text.Font(com.itextpdf.text.Font.FontFamily.HELVETICA, 20, com.itextpdf.text.Font.BOLD)));

        if (chamado != null) {
            addParagraph(document, "ID", chamado.getId());
            addParagraph(document, "Número do Chamado", chamado.getNumeroChamado());
            addParagraph(document, "Data de Abertura", chamado.getDataAbertura());
            addParagraph(document, "Data de Fechamento", chamado.getDataFechamento());
            addParagraph(document, "Prioridade", chamado.getPrioridade());
            addParagraph(document, "Status", chamado.getStatus());
            addParagraph(document, "Título", chamado.getTitulo());
            addParagraph(document, "Observações", chamado.getObservacoes());
            addParagraph(document, "Endereço", chamado.getEndereco());
            addParagraph(document, "Técnico", chamado.getNomeTecnico());
            addParagraph(document, "Empresa", chamado.getNomeEmpresa());
        }

        if (formsFinalizacao != null) {
            document.add(new Paragraph(" "));
            document.add(new Paragraph("Formulário de Finalização",
                    new com.itextpdf.text.Font(com.itextpdf.text.Font.FontFamily.HELVETICA, 16, com.itextpdf.text.Font.BOLD)));

            addParagraph(document, "ID", formsFinalizacao.getId());
            addParagraph(document, "Chamado ID", formsFinalizacao.getChamadoId());
            addParagraph(document, "Observações", formsFinalizacao.getObservacoes());
            addParagraph(document, "Foto URL", formsFinalizacao.getFotoUrl());
        }

        document.close();
        return byteArrayOutputStream.toByteArray();
    }

    private void addParagraph(Document document, String label, Object value) throws DocumentException {
        if (value != null) {
            Paragraph paragraph = new Paragraph(label + ": " + value.toString(),
                    new com.itextpdf.text.Font(com.itextpdf.text.Font.FontFamily.HELVETICA, 12));
            paragraph.setAlignment(Element.ALIGN_LEFT);
            document.add(paragraph);
        }
    }
}
