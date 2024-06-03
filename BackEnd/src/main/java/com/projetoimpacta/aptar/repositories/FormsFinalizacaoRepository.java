package com.projetoimpacta.aptar.repositories;

import com.projetoimpacta.aptar.domain.FormsFinalizacao;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FormsFinalizacaoRepository extends JpaRepository<FormsFinalizacao, Long> {
    Optional<FormsFinalizacao> findByChamadoId(Long chamadoId);
}
