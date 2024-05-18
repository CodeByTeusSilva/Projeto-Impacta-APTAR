package com.projetoimpacta.aptar.util;

import org.springframework.web.multipart.MultipartFile;
import java.io.*;

public class UploadUtil {
    public static boolean fazerUploadImagem(MultipartFile imagem) {
        boolean sucessoUpload = false;
        if (imagem == null || imagem.isEmpty()) {
            System.out.println("O arquivo está vazio ou é nulo!");
            return sucessoUpload;
        }

        String nomeArquivo = imagem.getOriginalFilename();
        if (nomeArquivo == null || nomeArquivo.isEmpty()) {
            System.out.println("Nome de arquivo inválido!");
            return sucessoUpload;
        }

        String pastaUploadImagem = "C:\\Users\\User\\Documents\\Projetos\\Impacta\\Projeto-Impacta-APTAR\\upload";
        File dir = new File(pastaUploadImagem);

        // Crie a pasta de upload se não existir
        if (!dir.exists()) {
            dir.mkdirs();
        }

        File serverFile = new File(dir.getAbsolutePath() + File.separator + nomeArquivo);
        try (BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(serverFile))) {
            stream.write(imagem.getBytes());
            sucessoUpload = true;
            System.out.println("Armazenado em: " + serverFile.getAbsolutePath());
            System.out.println("Upload do arquivo: " + nomeArquivo + " concluído com sucesso!");
        } catch (Exception e) {
            System.out.println("Erro ao carregar o arquivo: " + nomeArquivo + " => " + e.getMessage());
        }

        return sucessoUpload;
    }
}
