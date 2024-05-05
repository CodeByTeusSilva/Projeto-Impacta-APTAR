package com.projetoimpacta.aptar.resources;

import com.projetoimpacta.aptar.dtos.FormsFinalizacaoDTO;
import com.projetoimpacta.aptar.services.FormsFinalizacaoService;
import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.api.errors.GitAPIException;
import org.eclipse.jgit.lib.PersonIdent;
import org.eclipse.jgit.transport.UsernamePasswordCredentialsProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import java.io.File;
import java.io.IOException;

@Component
@RestController
@RequestMapping("/git")
public class GitController {

    @Autowired
    private FormsFinalizacaoService formsFinalizacaoService;

    private static final String REPO_URL = "https://github.com/CodeByTeusSilva/Projeto-Impacta-APTAR.git";
    private static final String LOCAL_DIR = "C:\\Workspace Java\\aptar - (Teste upload)\\Projeto-Impacta-APTAR-main";
    private static final String COMMIT_MESSAGE = "Add image";
    private static final String UPLOAD_DIR = LOCAL_DIR + "\\upload";

    @Value("${git.username}")
    private String USERNAME;  // Adicione seu nome de usuário GitHub
    @Value("${git.token}")
    private String TOKEN;

    @PostMapping("/upload")
    public String uploadImage(@RequestParam("chamadoId") Long chamadoId,
                              @RequestParam("observacoes") String observacoes,
                              @RequestParam("file") MultipartFile file) {
        String result = "";
        File uploadFile = new File(UPLOAD_DIR + "/" + file.getOriginalFilename());

        File uploadDir = new File(UPLOAD_DIR);
        if (!uploadDir.exists()) {
            boolean dirCreated = uploadDir.mkdirs();
            if (!dirCreated) {
                return "Erro ao criar a pasta de upload: " + UPLOAD_DIR;
            }
        }

        try {
            // Salvar o arquivo na pasta de upload
            String originalFilename = file.getOriginalFilename();
            uploadFile = new File(UPLOAD_DIR, originalFilename);
            file.transferTo(uploadFile);

            result = "Imagem enviada com sucesso!";

            FormsFinalizacaoDTO formsFinalizacaoDTO = new FormsFinalizacaoDTO();
            formsFinalizacaoDTO.setObservacoes(observacoes);
            formsFinalizacaoDTO.setFotoUrl(originalFilename);

            formsFinalizacaoService.create(chamadoId, formsFinalizacaoDTO, file);
        } catch (IOException e) {
            e.printStackTrace();
            result = "Erro ao enviar a imagem: " + e.getMessage();
        }

        return result;
    }
}

