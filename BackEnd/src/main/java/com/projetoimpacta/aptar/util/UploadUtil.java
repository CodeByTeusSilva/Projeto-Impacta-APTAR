package com.projetoimpacta.aptar.util;

import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;

public class UploadUtil {
    public static boolean fazerUploadImagem(MultipartFile imagem) {
        boolean sucessoUpload = false;
        if (!imagem.isEmpty()) {
            String nomeArquivo = imagem.getOriginalFilename();
            try {
                String pastaUploadImagem = "C:\\Workspace Java\\aptar - (Teste upload)\\Projeto-Impacta-APTAR-main\\upload";
                File dir = new File(pastaUploadImagem);
                if (!dir.exists()) {
                    dir.mkdirs();
                }

                File serverFile = new File(dir.getAbsolutePath() + File.separator + nomeArquivo);
                BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(serverFile));
                stream.write(imagem.getBytes());
                stream.close();

                System.out.println("Armazenado em: " + serverFile.getAbsolutePath());
                System.out.println("Você fez o upload do arquivo: " + nomeArquivo + " com sucesso!");

            } catch (Exception e) {
                System.out.println("Você falhou em carregar o arquivo: " + nomeArquivo + " =>" + e.getMessage());
            }
        } else {
            System.out.println("O arquivo está vazio!");
        }

        return sucessoUpload;
    }
}
