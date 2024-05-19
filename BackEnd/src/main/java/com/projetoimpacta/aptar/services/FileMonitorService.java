package com.projetoimpacta.aptar.services;

import org.springframework.stereotype.Service;
import java.io.IOException;
import java.nio.file.*;

@Service
public class FileMonitorService {
    private static final String DIRECTORY_TO_WATCH = "C:\\Users\\User\\Documents\\Projetos\\Impacta\\Projeto-Impacta-APTAR\\upload";
    private static final String COMMIT_MESSAGE = "Arquivo adicionado ou modificado";

    public void startMonitoring() {
        try {
            // Cria o serviço de observação
            WatchService watchService = FileSystems.getDefault().newWatchService();

            // Registra a pasta para monitorar
            Path path = Paths.get(DIRECTORY_TO_WATCH);
            path.register(watchService, StandardWatchEventKinds.ENTRY_CREATE, StandardWatchEventKinds.ENTRY_MODIFY);

            System.out.println("Monitorando a pasta: " + DIRECTORY_TO_WATCH);

            // Loop para monitorar os eventos
            while (true) {
                WatchKey key = watchService.take(); // Aguarda um evento

                for (WatchEvent<?> event : key.pollEvents()) {
                    // Verifica o tipo de evento
                    WatchEvent.Kind<?> kind = event.kind();
                    WatchEvent<Path> ev = (WatchEvent<Path>) event;
                    Path filePath = ev.context();

                    // Executa a lógica de git
                    if (kind == StandardWatchEventKinds.ENTRY_CREATE || StandardWatchEventKinds.ENTRY_MODIFY.equals(kind)) {
                        System.out.println("Arquivo " + filePath + " foi adicionado ou modificado.");
                        // Chama métodos para executar git add, commit e push
                        executeGitCommands(filePath);
                    }
                }

                // Confirma a chave
                boolean valid = key.reset();
                if (!valid) {
                    break;
                }
            }
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
    }

    private void executeGitCommands(Path filePath) throws IOException, InterruptedException {
        // Caminho do script
        String scriptPath = "\"C:\\Users\\User\\Documents\\Projeto-Impacta-APTAR-main\\BackEnd\\scripts\\git_auto.sh";

        // Caminho para o Bash (assumindo que você tem o Git Bash instalado)
        String bashPath = "\"C:\\Program Files\\Git\\git-bash.exe\""; // Verifique se este é o caminho correto para o bash.exe

        // Executa o script com a mensagem de commit e o caminho do arquivo como argumentos
        String[] command = {bashPath, scriptPath, COMMIT_MESSAGE, filePath.toString()};
        executeCommand(command);
    }

    private void executeCommand(String[] command) throws IOException, InterruptedException {
        ProcessBuilder processBuilder = new ProcessBuilder(command);
        Process process = processBuilder.start();
        int exitCode = process.waitFor();

        if (exitCode == 0) {
            System.out.println("Comando \"" + String.join(" ", command) + "\" executado com sucesso.");
        } else {
            System.out.println("Erro ao executar o comando: " + String.join(" ", command));
        }
    }
}
