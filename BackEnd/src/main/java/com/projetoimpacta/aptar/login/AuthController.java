package com.projetoimpacta.aptar.login;

import com.projetoimpacta.aptar.domain.Empresa;
import com.projetoimpacta.aptar.domain.Tecnico;
import com.projetoimpacta.aptar.repositories.EmpresaRepository;
import com.projetoimpacta.aptar.repositories.TecnicoRepository;
import com.projetoimpacta.aptar.services.exceptions.DataIntegrityViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
public class AuthController {

    @Autowired
    private TecnicoRepository usuarioRepository;

    @Autowired
    private EmpresaRepository empresaRepository;


    @PostMapping("/login")
    public Optional<?> login(@RequestBody LoginRequest loginRequest) {
        Optional<Tecnico> tecnicoAutenticado = usuarioRepository.findByEmail(loginRequest.getEmail());
        if (tecnicoAutenticado.isPresent()) {
            return tecnicoAutenticado;
        } else {
            Optional<Empresa> empresaAutenticada = empresaRepository.findByEmail(loginRequest.getEmail());
            if (empresaAutenticada.isPresent()) {
                return empresaAutenticada;
            } else {
                throw new DataIntegrityViolationException("Usuário não encontrado.");
            }
        }
    }
    public static class LoginRequest {
        private String email;

        public String getEmail() {
            return email;
        }
    }
}