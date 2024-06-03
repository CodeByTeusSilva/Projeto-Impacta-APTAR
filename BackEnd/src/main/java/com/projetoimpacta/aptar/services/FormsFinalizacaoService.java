package com.projetoimpacta.aptar.services;

import com.projetoimpacta.aptar.domain.Chamado;
import com.projetoimpacta.aptar.domain.FormsFinalizacao;
import com.projetoimpacta.aptar.dtos.FormsFinalizacaoDTO;
import com.projetoimpacta.aptar.repositories.ChamadoRepository;
import com.projetoimpacta.aptar.repositories.FormsFinalizacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Optional;

@Service
public class FormsFinalizacaoService {

    @Autowired
    private FormsFinalizacaoRepository repository;

    @Autowired
    private ChamadoRepository chamadoRepository;
    @Autowired
    private FormsFinalizacaoRepository formsFinalizacaoRepository;

    public FormsFinalizacao create(Long chamadoId, FormsFinalizacaoDTO formsFinalizacaoDTO, MultipartFile file) throws IOException {
        // Recupera uma instância de Chamado com base no chamadoId
        Optional<Chamado> chamadoOpt = chamadoRepository.findById(chamadoId);
        if (!chamadoOpt.isPresent()) {
            throw new IllegalArgumentException("Chamado não encontrado com o ID: " + chamadoId);
        }
        Chamado chamado = chamadoOpt.get();

        // Salvar o arquivo de imagem e obter a URL (caminho)
        String fotoUrl = saveFile(file);

        // Cria uma nova instância de FormsFinalizacao com base nos dados do DTO
        FormsFinalizacao formsFinalizacao = new FormsFinalizacao(
                chamado,
                formsFinalizacaoDTO.getObservacoes(),
                fotoUrl // Usar o nome do arquivo salvo para fotoUrl
        );

        // Salva a nova instância de FormsFinalizacao no banco de dados
        return formsFinalizacaoRepository.save(formsFinalizacao);
    }

    private String saveFile(MultipartFile file) throws IOException {
        // Diretório onde o arquivo será salvo
        String uploadDir = "C:\\Workspace Java\\aptar - (Teste upload)\\Projeto-Impacta-APTAR-main\\upload";
        // Nome do arquivo original enviado
        String originalFilename = file.getOriginalFilename();
        // Crie um novo arquivo no diretório de upload
        File destinationFile = new File(uploadDir, originalFilename);
        // Salve o arquivo no diretório de upload
        file.transferTo(destinationFile);
        // Retorne o nome do arquivo (para salvar em FormsFinalizacao)
        return originalFilename;
    }

    public FormsFinalizacaoDTO findFormsFinalizacaoByChamadoId(Long chamadoId) {
        FormsFinalizacao formsFinalizacao = formsFinalizacaoRepository.findByChamadoId(chamadoId)
                .orElseThrow(() -> new RuntimeException("Formulário de finalização não encontrado"));
        return mapToDTO(formsFinalizacao);
    }

    private FormsFinalizacaoDTO mapToDTO(FormsFinalizacao formsFinalizacao) {
        FormsFinalizacaoDTO dto = new FormsFinalizacaoDTO();
        dto.setId(formsFinalizacao.getId());
        dto.setChamadoId(formsFinalizacao.getChamado().getId());
        dto.setObservacoes(formsFinalizacao.getObservacoes());
        dto.setFotoUrl(formsFinalizacao.getFotoUrl());
        return dto;
    }
}
