package com.projetoimpacta.aptar.resources;

import com.itextpdf.text.DocumentException;
import com.projetoimpacta.aptar.dtos.ChamadoDTOout;
import com.projetoimpacta.aptar.dtos.FormsFinalizacaoDTO;
import com.projetoimpacta.aptar.services.ChamadoService;
import com.projetoimpacta.aptar.services.FormsFinalizacaoService;
import com.projetoimpacta.aptar.services.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/reports")
public class ReportController {

    @Autowired
    private ReportService reportService;

    @Autowired
    private ChamadoService chamadoService;

    @Autowired
    private FormsFinalizacaoService formsFinalizacaoService;

    @GetMapping("/chamado/{id}")
    public ResponseEntity<String> getChamadoReport(@PathVariable Long id) throws DocumentException, IOException {
        // Buscar os dados do banco de dados
        ChamadoDTOout chamado = chamadoService.findChamadoDTOById(id);
        FormsFinalizacaoDTO formsFinalizacao = formsFinalizacaoService.findFormsFinalizacaoByChamadoId(id);

        String reportHtml = reportService.generateReportHtml(chamado, formsFinalizacao);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.TEXT_HTML);

        return new ResponseEntity<>(reportHtml, headers, HttpStatus.OK);
    }

    @GetMapping("/chamado/{id}/pdf")
    public ResponseEntity<byte[]> downloadChamadoReportPdf(@PathVariable Long id) throws DocumentException, IOException {
        // Buscar os dados do banco de dados
        ChamadoDTOout chamado = chamadoService.findChamadoDTOById(id);
        FormsFinalizacaoDTO formsFinalizacao = formsFinalizacaoService.findFormsFinalizacaoByChamadoId(id);

        byte[] pdfBytes = reportService.generateReport(chamado, formsFinalizacao);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("attachment", "relatorio_chamado_" + id + ".pdf");

        return ResponseEntity.ok()
                .headers(headers)
                .body(pdfBytes);
    }
}
